<template>
  <div class="busqueda">
    <NavBar :key="componentKey"/>
    <busqueda v-if="texto" v-bind:texto="texto" />
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import busqueda from "../components/escuelas/buscador/Busqueda";
export default {
  components: {
    NavBar,
    busqueda,
  },

  data() {
    return {
      texto: "",
      componentKey: 0,
    };
  },

  mounted() {
    this.texto = this.$route.query.texto;
  },
  
  methods: {
    logeado() {
      this.componentKey += 1;
    },
  },

};
</script>