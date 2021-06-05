<template>
  <div id="busqueda-escuelas" class="container">
    <h1 class="pb-2">{{ $t("message.resultados.escuelas.titulo") }}</h1>
    <div class="border border-black rounded" v-show="resultados">
      <TablaEscuela ref="tablaEscuelas" />
      <Pagination ref="pagination" :perPage="3" @cambio="fetchData" />
    </div>
    <p v-show="!resultados"> {{ $t("message.resultados.sin_resultados") }}</p>
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
          "/buscador/escuelas?size=" +
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
          this.$refs.tablaEscuelas.setItems(response.data.data.contenido);
          this.$refs.pagination.loading = false;
        });
    },
  },
};
</script>
<style>
</style>