<template>
  <div id="home" class="container">
    <DataTableEscuelas ref="resultadosEscuelas" />
    <DataTableSectores class="mt-5" ref="resultadosSectores" />
    <DataTableVias class="mt-5" ref="resultadosVias" />
  </div>
</template>

<script>
import DataTableEscuelas from "./dataTables/DataTableEscuelas";
import DataTableSectores from "./dataTables/DataTableSectores";
import DataTableVias from "./dataTables/DataTableVias";

export default {
  components: {
    DataTableEscuelas,
    DataTableSectores,
    DataTableVias,
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