<template>
  <div class="detalleEscuela">
    <NavBar @logeado="logeado" :key="navbarKey" />
    <detalleEscuela v-bind:id="id" :key="detalleEscuelaKey" />
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import detalleEscuela from "../components/escuelas/DetalleEscuela";
export default {
  components: {
    NavBar,
    detalleEscuela,
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      detalleEscuelaKey: 0,
      navbarKey: 1,
    };
  },
  methods: {
    logeado() {
      this.navbarKey += 1;
      this.detalleEscuelaKey += 1;
    },
  },
};
</script>
