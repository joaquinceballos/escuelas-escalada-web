<template>
  <div id="zonas" class="container">
    <h1>{{ $t("message.zona.titulo") }}</h1>
    <b-form-select
      v-model="selected"
      :options="options"
      class="mb-3"
      @change="recargaTabla"
    >
      <template #first>
        <b-form-select-option :value="null" disabled>{{
          $t("message.zona.filtropais.texto")
        }}</b-form-select-option>
      </template>
    </b-form-select>
    <TablaZonas ref="tablaZonas" />
    <Pagination ref="pagination" :perPage="4" @cambio="fetchData" />
  </div>
</template>

<script>
import Vue from "vue";
import TablaZonas from "./tablas/TablaZonas";
import Pagination from "./pagination/Pagination";
import countries from "i18n-iso-countries";
export default {
  components: {
    TablaZonas,
    Pagination,
  },
  data() {
    return {
      pais: "",
      selected: null,
      options: [],
    };
  },
  methods: {
    cargaComboPaises() {
      countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
      countries.registerLocale(require("i18n-iso-countries/langs/es.json"));
      let nombres = countries.getNames(this.$i18n.t("message.idioma.codigo"), {
        select: "official",
      });
      Object.keys(nombres).forEach((n) => {
        this.options.push({ value: n, text: nombres[n] });
      });
    },
    recargaTabla(pais) {
      this.pais = pais;
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