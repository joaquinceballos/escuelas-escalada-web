<template>
  <div id="home" class="container">
    <BusquedaEscuelas ref="resultadosEscuelas" />
    <BusquedaSectores class="mt-5" ref="resultadosSectores" />
    <BusquedaVias class="mt-5" ref="resultadosVias" />
  </div>
</template>

<script>
import BusquedaEscuelas from "./BusquedaEscuelas";
import BusquedaSectores from "./BusquedaSectores";
import BusquedaVias from "./BusquedaVias";

export default {
  components: {
    BusquedaEscuelas,
    BusquedaSectores,
    BusquedaVias,
  },

  props: {
    texto: {
      type: String,
    },
  },

  watch: {
    $route(to /*, from*/) {
      this.fetchData(to.query.texto);
    },
  },

  mounted() {
    this.fetchData(this.texto);
  },

  methods: {
    fetchData(texto) {
      this.$refs.resultadosEscuelas.refrescar(texto);
      this.$refs.resultadosSectores.refrescar(texto);
      this.$refs.resultadosVias.refrescar(texto);
    },
  },
};
</script>

<style>
a:hover {
  cursor: pointer;
}
</style>