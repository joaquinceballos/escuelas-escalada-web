<template>
  <div id="datatable-sectores" class="container">
    <h1 class="pb-2">{{ $t("message.resultados.sectores.titulo") }}</h1>
    <div class="border border-black rounded">
      <TablaSectores ref="tablaSectores" :columnaEscuela="true"/>
      <Pagination ref="pagination" :perPage="3" @cambio="fetchData" />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import TablaSectores from "../tablas/TablaSectores";
import Pagination from "../pagination/Pagination";
export default {
  name: "DataTableEscuelas",

  components: {
    TablaSectores,
    Pagination,
  },

  data() {
    return {
      texto: "",
    };
  },

  methods: {
    refrescar(texto) {
      this.$refs.pagination.page = 1;
      this.$refs.pagination.lastPage = 1;
      this.texto = texto;
      this.fetchData();
    },

    fetchData() {
      this.$refs.pagination.loading = true;
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get(
          "/buscador/sectores?size=" +
            this.$refs.pagination.perPage +
            "&page=" +
            (this.$refs.pagination.page - 1) +
            "&texto=" +
            this.texto,
          {
            headers,
          }
        )
        .then((response) => {
          this.$refs.pagination.lastPage = response.data.data.totalPaginas;
          this.$refs.tablaSectores.setItems(response.data.data.contenido);
          this.$refs.pagination.loading = false;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            Vue.borraToken();
            this.$router.push("/login");
          }
          console.log(err.response);
        });
    },
  },
};
</script>
<style>
</style>