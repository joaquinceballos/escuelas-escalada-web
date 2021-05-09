<template>
  <div class="container">
    <h1 v-if="zona">{{ this.zona.region }}</h1>
    <h2>{{ $t("message.zona.listado_escuelas") }}</h2>
    <b-button class="ml-auto mb-1 mt-1 float-right" variant="info" @click="nuevaEscuela"
      ><b-icon icon="plus-circle" aria-hidden="true"></b-icon
      > {{ $t("message.zona.anadir_escuela") }}</b-button
    >
    <TablaEscuela ref="tablaEscuelas" :items="escuelas" />
    <Pagination ref="pagination" :perPage="4" @cambio="fetchDataEscuelas" />
    <ModalEscuela ref="modal_escuela" @creada="fetchDataEscuelas" />
  </div>
</template>
<script>
import Vue from "vue";
import Pagination from "./pagination/Pagination.vue";
import TablaEscuela from "./tablas/TablaEscuela";
import ModalEscuela from "./modales/ModalNuevaEscuela";
export default {
  components: {
    TablaEscuela,
    Pagination,
    ModalEscuela,
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
      const headers = Vue.getHeaders(Vue.getToken(), this.$i18n.t("message.idioma.codigo"));
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
      const headers = Vue.getHeaders(Vue.getToken(), this.$i18n.t("message.idioma.codigo"));
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

    nuevaEscuela() {
      this.$refs.modal_escuela.pais = this.zona.pais;
      this.$refs.modal_escuela.idZona = this.zona.id;
      this.$refs.modal_escuela.mostrar();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style>
</style>
