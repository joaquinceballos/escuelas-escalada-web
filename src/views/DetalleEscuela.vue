<template>
  <div class="detalleEscuela">
    <NavBar @logeado="logeado" :key="componentKey" />
    <detalleEscuela v-bind:id="id" :key="componentKey" />
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
