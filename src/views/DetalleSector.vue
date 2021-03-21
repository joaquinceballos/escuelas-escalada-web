<template>
  <div class="detalleEscuela">
    <NavBar />
    <DetalleSector v-bind:idEscuela="idEscuela" v-bind:idSector="idSector" />
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
      type: Number,
    },
    idSector: {
      type: Number,
    },
  },
};
</script>