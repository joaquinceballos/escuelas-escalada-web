<template>
  <div class="container">
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 class="pb-2">{{ sectorDto.nombre }}</h1>
    <hr />
    <p>{{ sectorDto.informacion }}</p>
    <hr />
  </div>
</template><script>
import Vue from "vue";
export default {
  props: {
    idEscuela: {
      type: Number,
    },
    idSector: {
      type: Number,
    },
  },

  mounted() {
    this.fetchData();
  },

  data() {
    return {
      loading: false,
      sectorDto: {
        id: 0,
        nombre: "",
        latitud: 0,
        longitud: 0,
        vias: [],
      },
    };
  },

  methods: {
    fetchData() {
      this.loading = true;
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get("/escuelas/" + this.idEscuela + "/sectores/" + this.idSector, {
          headers,
        })
        .then((response) => {
          this.sectorDto = response.data.data;
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
<style></style>