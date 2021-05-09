<template>
  <div id="datatable-vias" class="container">
    <h1 class="pb-2">{{ $t("message.resultados.vias.titulo") }}</h1>
    <div class="border border-black rounded">
     <TablaVias ref="tablaVias"/>
     <Pagination ref="pagination" :perPage="3" @cambio="fetchData"/> 
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import TablaVias from "../tablas/TablaVias";
import Pagination from "../pagination/Pagination";
export default {
  name: "DataTableEscuelas",

  components:{
    TablaVias,
    Pagination
  },

  data() {
    return {
      texto: "",
    };
  },

  methods: {
    refrescar(texto) {
      this.texto = texto;
      this.fetchData();
    },

    fetchData() {
      this.$refs.pagination.loading = true;
      const headers = Vue.getHeaders(Vue.getToken(), this.$i18n.t("message.idioma.codigo"));
      this.$http
        .get(
          "/buscador/vias?size=" +
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
          this.$refs.tablaVias.setItems(response.data.data.contenido);
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