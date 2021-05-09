<template>
  <div id="busqueda-escuelas" class="container">
    <h1 class="pb-2">{{ $t("message.resultados.escuelas.titulo") }}</h1>
    <div class="border border-black rounded">
      <TablaEscuela ref="tablaEscuelas" />
      <Pagination ref="pagination" :perPage="3" @cambio="fetchData" />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import TablaEscuela from "../tablas/TablaEscuela";
import Pagination from "../pagination/Pagination";
export default {
  name: "DataTableEscuelas",

  components: {
    TablaEscuela,
    Pagination,
  },

  data() {
    return {
      texto: ""
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
      const headers = Vue.getHeaders(Vue.getToken(), this.$i18n.t("message.idioma.codigo"));
      this.$http
        .get(
          "/buscador/escuelas?size=" +
            this.$refs.pagination.perPage +
            "&page=" +
            ( this.$refs.pagination.page - 1) +
            "&texto=" +
            this.texto,
          {
            headers,
          }
        )
        .then((response) => {
          this.$refs.pagination.lastPage = response.data.data.totalPaginas;
          this.$refs.tablaEscuelas.setItems(response.data.data.contenido);
          this.$refs.pagination.loading = false;
        })
        .catch((err) => {
          if (err.response.status == 403) {
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