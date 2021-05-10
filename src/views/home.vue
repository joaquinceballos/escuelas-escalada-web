<template>
  <div class="home">
    <NavBar @logeado="logeado" :key="componentKey" />
    <home />
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import home from "../components/escuelas/home";
export default {
  components: {
    NavBar,
    home,
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
