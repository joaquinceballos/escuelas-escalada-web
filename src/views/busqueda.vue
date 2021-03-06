<template>
  <div class="busqueda">
    <NavBar />
    <busqueda v-if="texto" v-bind:texto="texto" />
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import busqueda from "../components/escuelas/Busqueda";
export default {
  components: {
    NavBar,
    busqueda,
  },

  data() {
    return {
      texto: "",
    };
  },

  mounted() {
    this.texto = this.$route.query.texto;
  },

};
</script>