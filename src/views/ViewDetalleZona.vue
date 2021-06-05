<template>
  <div id="escuelas">
    <NavBar @logeado="logeado" :key="navbarKey" />
    <Zona :idZona="id" :key="zonaKey" />
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import Zona from "../components/escuelas/DetalleZona";
export default {
  components: {
    NavBar,
    Zona,
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      navbarKey: 1,
      zonaKey: 0,
    };
  },
  methods: {
    logeado() {
      this.zonaKey += 1;
      this.navbarKey += 1;
    },
  },
};
</script>