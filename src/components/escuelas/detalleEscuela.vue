<template>
  <div id="detalle-escuela" class="container">
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 class="pb-2">{{ escuelaDto.nombre }}</h1>
    <p>{{ escuelaDto.informacion }}</p>
    <div style="height: 40vh">
      <gmaps-map
        :options="mapOptions"
        v-if="marcadores && marcadores.length > 0"
      >
        <gmaps-marker
          v-for="(item, i) in marcadores"
          :key="i"
          :options="item.options"
        />
      </gmaps-map>
    </div>
    <TablaSectores ref="tablaSectores"/>
  </div>
</template>

<script>
import Vue from "vue";
import { gmapsMap, gmapsMarker } from "x5-gmaps";
import TablaSectores from "./tablas/TablaSectores";
const centroid = require("polygon-centroid");

export default {
  components: {
    gmapsMap,
    gmapsMarker,
    TablaSectores,
  },
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
      marcadores: [],
      mapOptions: {
        zoom: 15,
      },
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
          this.setMarcadores();
          this.centrarMapa();
          this.$refs.tablaSectores.setItems(this.escuelaDto.sectores);
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

    setMarcadores() {
      for (let i = 0; i < this.escuelaDto.sectores.length; i++) {
        let sector = this.escuelaDto.sectores[i];
        if (
          sector.latitud !== undefined &&
          sector.latitud !== null &&
          sector.longitud !== undefined &&
          sector.longitud !== null
        ) {
          this.marcadores.push({
            options: {
              title: sector.nombre,
              position: {
                lat: sector.latitud,
                lng: sector.longitud,
              },
            },
          });
        }
      }
    },

    centrarMapa() {
      let puntos = [];
      for (let i = 0; i < this.marcadores.length; i++) {
        puntos.push({
          x: this.marcadores[i].options.position.lat,
          y: this.marcadores[i].options.position.lng,
        });
      }
      if (puntos.length > 0) {
        let centroMapa = centroid(puntos);
        this.mapOptions.center = {
          lat: centroMapa.x,
          lng: centroMapa.y,
        };
      }
    },
  },
};
</script>

<style>
</style>