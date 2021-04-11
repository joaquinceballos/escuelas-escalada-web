<template>
  <div id="zonas">
    <NavBar />
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
  props: {},
};
</script>