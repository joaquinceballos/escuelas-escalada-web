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
      <b-button
        class="mb-2 ml-2 mr-sm-2 mb-sm-0 border rounded"
        variant="info"
        @click="nuevaZona"
        v-show="admin"
        ><b-icon icon="plus-circle" aria-hidden="true"></b-icon>
        {{ $t("message.zonas.anadir_zona") }}</b-button
      >
    </b-form>
    <TablaZonas ref="tablaZonas" />
    <Pagination ref="pagination" :perPage="4" @cambio="fetchData" />
    <ModalZona ref="modal_zona" @grabada="zonaGrabada" />
  </div>
</template>

<script>
import Vue from "vue";
import TablaZonas from "./tablas/TablaZonas";
import Pagination from "./pagination/Pagination";
import ModalZona from "./modales/ModalZona";
export default {
  components: {
    TablaZonas,
    Pagination,
    ModalZona,
  },
  data() {
    return {
      pais: null,
      options: [],
      filtroConEscuelas: false,
    };
  },
  methods: {
    zonaGrabada() {
      console.log("la zona se ha grabado");
    },
    nuevaZona() {
      this.$refs.modal_zona.mostrar();
    },
    cargaComboPaises() {
      this.options = Vue.getComboPaises(this.$i18n.t("message.idioma.codigo"));
      this.pais = "ES";
    },
    recargaTabla() {
      this.$refs.pagination.page = 1;
      this.fetchData();
    },
    fetchData() {
      this.$refs.pagination.loading = true;
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .get(
          "/zonas?size=" +
            this.$refs.pagination.perPage +
            "&page=" +
            (this.$refs.pagination.page - 1) +
            (this.filtroConEscuelas ? "&conEscuelas=true" : "") +
            (this.pais && this.pais.length > 0 ? "&pais=" + this.pais : "") +
            (this.admin ? "&todas=true" : "") +
            "&sort=numeroEscuelas,desc&sort=region,asc",
          {
            headers,
          }
        )
        .then((response) => {
          this.$refs.pagination.lastPage = response.data.data.totalPaginas;
          this.$refs.tablaZonas.setItems(response.data.data.contenido);
          this.$refs.pagination.loading = false;
        });
    },
  },

  mounted() {
    this.cargaComboPaises();
    this.fetchData();
  },

  computed: {
    admin() {
      return Vue.rolAdmin();
    },
  },
};
</script>

<style>
</style>