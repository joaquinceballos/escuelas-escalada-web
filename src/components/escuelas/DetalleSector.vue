<template>
  <div class="container">
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 class="pb-2">{{ sectorDto.nombre }}</h1>
    <hr />
    <p>{{ sectorDto.informacion }}</p>
    <hr />
    <carousel
      :perPage="1"
      :navigationEnabled="true"
      :autoplay="false"
      :loop="true"
      :autoplayTimeout="5000"
    >
      <slide v-for="c in croquis" :key="c.id">
        <Croquis
          :croquis="c"
          @doble-click="modalCroquis"
          :ref="'slide-croquis-' + c.id"
          :detalle="false"
        />
      </slide>
    </carousel>
    <h2>{{ $t("message.sector.listado_vias") }}</h2>
    <b-button
      class="ml-auto mb-1 mt-1 float-right"
      variant="info"
      @click="nuevaVia"
      ><b-icon icon="plus-circle" aria-hidden="true"></b-icon>
      {{ $t("message.sector.detalle.anadir_via") }}</b-button
    >
    <TablaVias
      v-show="sectorDto.vias.length > 0"
      ref="tablaVias"
      :borderless="true"
      :small="true"
    />
    <b-modal
      id="modal-croquis"
      :size="tamanoModal"
      title="sin título, como yo"
      :hideFooter="true"
      :hideHeader="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <Croquis
        :croquis="croquisDetalle"
        :detalle="true"
        @salir="recargarCroquis"
      />
    </b-modal>
    <ModalVia ref="modal_via" @creada="fetchData"/>
  </div>
</template><script>
import Vue from "vue";
import Croquis from "./Croquis";
import { Carousel, Slide } from "vue-carousel";
import TablaVias from "./tablas/TablaVias";
import ModalVia from "./modales/ModalNuevaVia";

export default {
  components: {
    Croquis,
    Carousel,
    Slide,
    TablaVias,
    ModalVia,
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
      tamanoModal: "xl", //TODO echarle un ojo a vue-mq (mola), tamaño xl para un pantalla de 15 pulgadas en demasiado, además se podría manejar tablets y móbiles...
      croquisDetalle: {},
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
    nuevaVia() {
      this.$refs.modal_via.mostrar(this.idEscuela, this.idSector);
    },

    recargarCroquis(croquis) {
      this.$refs["slide-croquis-" + croquis.id][0].setDataCroquis(croquis);
      this.$bvModal.hide("modal-croquis");
    },

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
          this.$refs.tablaVias.setItems(this.sectorDto.vias);
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
          this.croquis = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    modalCroquis(croquis) {
      this.croquisDetalle = croquis;
      this.$bvModal.show("modal-croquis");
    },

    navegaCroquis(croquis) {
      this.$router
        .push({
          name: "croquis",
          params: {
            idEscuela: croquis.sector.escuela.id,
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
<style>
/* max-width: fit-content, max-width: -moz-fit-content */
#modal-croquis > div {
  max-height: fit-content;
}
#modal-croquis___BV_modal_body_ {
  padding: 0px;
}
</style>