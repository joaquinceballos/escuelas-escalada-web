<template>
  <div id="zonas" class="container">
    <h1>{{ $t("message.zona.titulo") }}</h1>
    <b-form inline class="mb-1 ml-auto row"
      ><b-form-checkbox
        v-model="filtrarConEscuelas"
        class="mb-2 ml-auto mr-sm-2 mb-sm-0 border rounded"
        @change="recargaTabla"
      >
        filtrar con escuelas
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
      filtrarConEscuelas: true,
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
            (this.filtrarConEscuelas ? "&conEscuelas=true" : "") +
            (this.pais && this.pais.length > 0 ? "&pais=" + this.pais : ""),
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