<template>
  <div class="perfil">
    <NavBar />
    <perfil />
  </div> 
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import perfil from "../components/escuelas/Perfil";
export default {
  components: {
    NavBar, 
    perfil
  }
};
</script>
