<template>
  <div class="detalleEscuela">
    <NavBar @logeado="logeado" :key="navbarKey" />
    <DetalleSector
      v-bind:idEscuela="idEscuela"
      v-bind:idSector="idSector"
      :key="detalleSectorKey"
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
    return { navbarKey: 1, detalleSectorKey: 0 };
  },
  methods: {
    logeado() {
      this.navbarKey += 1;
      this.detalleSectorKey += 1;
    },
  },
};
</script>