<template>
  <div class="perfil">
    <NavBar />
    <perfil :usuario="usuario" />
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import perfil from "../components/escuelas/Perfil";
export default {
  components: {
    NavBar,
    perfil,
  },
  props: {
    usuario: {
      type: String,
    },
  },
};
</script>
