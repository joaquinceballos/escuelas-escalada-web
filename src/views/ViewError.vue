<template>
  <div class="busqueda">
    <NavBar @logeado="logeado" :key="componentKey" />
    <h1 class="mt-2">{{ $t("message.error.titulo") }}</h1>
    <b-icon class="mb-3 mt-2" icon="emoji-dizzy" font-scale="7.5"></b-icon>
    <p>{{ $t("message.error.texto") }}</p>
    <p>{{ error }}</p>
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
  props: {
    error: {
      type: [Object, String],
    },
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