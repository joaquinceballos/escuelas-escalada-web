<template>
  <div class="detalleEscuela">
    <NavBar @logeado="logeado" :key="navbarKey" />
    <DetalleSector
      v-if="montado"
      v-bind:idEscuela="idEscuela"
      v-bind:idSector="idSector"
      v-bind:idVia="idVia"
      v-bind:idCroquis="idCroquis"
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
    return {
      idvia: null,
      idCroquis: null,
      montado: false,
      navbarKey: 1,
      detalleSectorKey: 0,
    };
  },
  mounted() {
    this.idVia = this.$route.query.idVia;
    this.idCroquis = this.$route.query.idCroquis;
    this.montado = true;
  },

  methods: {
    logeado() {
      this.navbarKey += 1;
      this.detalleSectorKey += 1;
    },
  },
};
</script>