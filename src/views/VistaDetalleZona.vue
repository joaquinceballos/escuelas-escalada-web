<template>
  <div id="escuelas">
    <NavBar />
    <Zona :idZona="id" />
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
};
</script>