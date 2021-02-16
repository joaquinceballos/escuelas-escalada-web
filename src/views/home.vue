<template>
  <div class="home">
    <NavBar />
    <home />
  </div> 
</template>
<script>
import NavBar from "../components/auth/NavBar";
import home from "../components/escuelas/home";
export default {
  components: {
    NavBar, home
  }
};
</script>
