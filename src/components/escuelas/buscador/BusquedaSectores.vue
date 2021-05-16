<template>
  <div id="datatable-sectores" class="container">
    <h1 class="pb-2">{{ $t("message.resultados.sectores.titulo") }}</h1>
    <div class="border border-black rounded" v-show="resultados">
      <TablaSectores ref="tablaSectores" :columnaEscuela="true" />
      <Pagination ref="pagination" :perPage="3" @cambio="fetchData" />
    </div>
     <p v-show="!resultados"> {{ $t("message.resultados.sin_resultados") }}</p>
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
      resultados: false,
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
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
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
          this.resultados = response.data.data.totalPaginas > 0;
          this.$refs.pagination.lastPage = response.data.data.totalPaginas;
          this.$refs.tablaSectores.setItems(response.data.data.contenido);
          this.$refs.pagination.loading = false;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            Vue.borraToken();
            console.err(err);
          }
          console.log(err.response);
        });
    },
  },
};
</script>
<style>
</style>