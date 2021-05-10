<template>
  <div id="zonas">
    <NavBar @logeado="logeado" :key="componentKey" />
    <Zonas />
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import Zonas from "../components/escuelas/Zonas";
export default {
  components: {
    NavBar,
    Zonas,
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