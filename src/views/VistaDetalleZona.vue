<template>
  <div id="escuelas">
    <NavBar @logeado="logeado" :key="componentKey" />
    <Zona :idZona="id" :key="componentKey" />
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
      componentKey: 0,
    };
  },
  methods: {
    logeado() {
      this.componentKey += 1;
    },
  },
};
</script>