<template>
  <div class="detalleEscuela">
    <NavBar />
    <detalleEscuela v-bind:id="id" />
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import detalleEscuela from "../components/escuelas/detalleEscuela";
export default {
  components: {
    NavBar,
    detalleEscuela,
  },
  props: {
    id: {
      type: Number,
    },
  },
};
</script>
