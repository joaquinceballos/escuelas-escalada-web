<template>
  <div id="zonas" class="container">
    <h1>{{ $t("message.zona.titulo") }}</h1>
    <b-form inline class="mb-1 ml-auto row">
      <b-form-checkbox
        @change="recargaTabla"
        class="mb-2 ml-auto mr-sm-2 mb-sm-0 border rounded"
        v-model="filtroConEscuelas"
        name="check-button"
        button
        button-variant="info"
      >
        {{
          filtroConEscuelas
            ? $t("message.zona.filtro.escuelas_si")
            : $t("message.zona.filtro.escuelas_no")
        }}
      </b-form-checkbox>
      <label class="mr-sm-2" for="select-filtro-pais">País</label>
      <b-form-select
        id="select-filtro-pais"
        v-model="pais"
        :options="options"
        class="mb-2 mb-sm-0 col-2"
        @change="recargaTabla"
      >
      </b-form-select>
    </b-form>
    <TablaZonas ref="tablaZonas" />
    <Pagination ref="pagination" :perPage="4" @cambio="fetchData" />
  </div>
</template>

<script>
import Vue from "vue";
import TablaZonas from "./tablas/TablaZonas";
import Pagination from "./pagination/Pagination";
export default {
  components: {
    TablaZonas,
    Pagination,
  },
  data() {
    return {
      pais: null,
      options: [],
      filtroConEscuelas: false,
    };
  },
  methods: {
    cargaComboPaises() {
      this.options = Vue.getComboPaises(this.$i18n.t("message.idioma.codigo"));
    },
    recargaTabla() {
      this.$refs.pagination.page = 1;
      this.fetchData();
    },
    fetchData() {
      this.$refs.pagination.loading = true;
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get(
          "/zonas?size=" +
            this.$refs.pagination.perPage +
            "&page=" +
            (this.$refs.pagination.page - 1) +
            (this.filtroConEscuelas ? "&conEscuelas=true" : "") +
            (this.pais && this.pais.length > 0 ? "&pais=" + this.pais : "") +
            "&sort=numeroEscuelas,desc&sort=region,asc",
          {
            headers,
          }
        )
        .then((response) => {
          this.$refs.pagination.lastPage = response.data.data.totalPaginas;
          this.$refs.tablaZonas.setItems(response.data.data.contenido);
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
    this.cargaComboPaises();
    this.fetchData();
  },
};
</script>

<style>
</style>