<template>
  <div id="detalle-escuela" class="container">
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 class="pb-2">{{ escuelaDto.nombre }}</h1>
    <p>{{ escuelaDto.informacion }}</p>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    id: {
      type: Number,
    },
  },
  data() {
    return {
      escuelaDto: {
        id: "",
        nombre: "",
        latitud: "",
        longitud: "",
        paisIso: "",
        informacion: "",
        cierresTemporada: [],
        sectores: [],
      },
      loading: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get("/escuelas/" + this.id, {
          headers,
        })
        .then((response) => {
          this.escuelaDto = response.data.data;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$fire({
              title: "No autorizado",
              type: "error",
              showConfirmButton: false,
              timer: 2500,
            }).then(() => {
              this.$router.push("/");
            });
          }
          console.log(err.response);
        });
    },
  },
};
</script>

<style>
</style>