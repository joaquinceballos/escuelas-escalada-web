<template>
  <div class="detalleEscuela">
    <NavBar @logeado="logeado" :key="componentKey" />
    <DetalleSector
      v-bind:idEscuela="idEscuela"
      v-bind:idSector="idSector"
      :key="componentKey"
    />
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import DetalleSector from "../components/escuelas/DetalleSector";
export default {
  components: {
    NavBar,
    DetalleSector,
  },
  props: {
    idEscuela: {
      type: [Number, String],
    },
    idSector: {
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