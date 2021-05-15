<template>
  <div class="busqueda">
    <NavBar @logeado="logeado" :key="componentKey" />
    <h1 class="mt-2">{{ $t("message.no_encontrado.titulo") }}</h1>
    <b-icon class="mb-3 mt-2" icon="emoji-frown" font-scale="7.5"></b-icon>
    <p>{{ $t("message.no_encontrado.texto") }}</p>
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
export default {
  data() {
    return {
      componentKey: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    logeado() {
      this.componentKey += 1;
    },
  },
};
</script>