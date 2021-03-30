<template>
  <div class="container">
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 class="pb-2">{{ sectorDto.nombre }}</h1>
    <hr />
    <p>{{ sectorDto.informacion }}</p>
    <hr />
    <carousel :perPage="1" :navigationEnabled="true">
      <slide v-for="c in croquis" :key="c.id">
        <Croquis :croquis="c" :idEscuela="idEscuela" @doble-click="navegaCroquis" :detalle="false" />
      </slide>
    </carousel>
  </div>
</template><script>
import Vue from "vue";
import Croquis from "./Croquis";
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Croquis,
    Carousel,
    Slide,
  },
  props: {
    idEscuela: {
      type: [Number, String],
    },
    idSector: {
      type: [Number, String],
    },
  },

  mounted() {
    this.fetchData();
  },

  data() {
    return {
      croquis: [],
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
          // cargamos los croquis
          this.cargaCroquis();
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

    cargaCroquis() {
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.idSector +
            "/croquis/",
          { headers }
        )
        .then((response) => {
          let croquis = response.data.data;
          for (let i = 0; i < croquis.length; i++) {
            croquis[i].idEscuela = this.idEscuela;
          }
          this.croquis = croquis;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    navegaCroquis(croquis) {
      this.$router
        .push({
          name: "croquis",
          params: {
            idEscuela: this.idEscuela,
            idSector: croquis.sector.id,
            idCroquis: croquis.id,
            croquis: croquis,
          },
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style></style>