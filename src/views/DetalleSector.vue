<template>
  <div class="detalleEscuela">
    <NavBar />
    <DetalleSector v-if="montado" v-bind:idEscuela="idEscuela" v-bind:idSector="idSector" />
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
      idvia: null,
      idCroquis: null,
      montado:false
    };
  },
  mounted() {
    this.idVia = this.$route.query.idVia;
    this.idCroquis = this.$route.query.idCroquis;
    this.montado = true;
  },
};
</script>