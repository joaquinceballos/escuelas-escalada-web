<template>
  <div class="container">
    <h1 v-if="zona">{{ this.zona.region }}</h1>
    <h2>{{ $t("message.zona.listado_escuelas") }}</h2>
    <TablaEscuela ref="tablaEscuelas" :items="escuelas" />
    <Pagination ref="pagination" :perPage="4" @cambio="fetchDataEscuelas" />
  </div>
</template>
<script>
import Vue from "vue";
import Pagination from "./pagination/Pagination.vue";
import TablaEscuela from "./tablas/TablaEscuela";
export default {
  components: {
    TablaEscuela,
    Pagination,
  },
  data() {
    return {
      escuelas: [],
      loading: false,
      zona: null,
    };
  },
  props: {
    idZona: {
      type: [Number, String],
    },
  },
  methods: {
    fetchData() {
      this.fetchDataZona();
      this.fetchDataEscuelas();
    },
    fetchDataZona() {
      this.loading = true;
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get("/zonas/" + this.idZona, { headers })
        .then((response) => {
          this.zona = response.data.data;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetchDataEscuelas() {
      this.$refs.pagination.loading = true;
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get(
          "/escuelas?size=" +
            this.$refs.pagination.perPage +
            "&page=" +
            (this.$refs.pagination.page - 1) +
            "&idZona=" +
            this.idZona,
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
            console.log(err);
          }
          console.log(err.response);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style>
</style>
