<template>
  <div class="container">
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 class="pb-2">{{ sectorDto.nombre }}</h1>
    <hr />
    <p>{{ sectorDto.informacion }}</p>
    <hr />
    <h2>{{ $t("message.sector.detalle.listado_croquis") }}</h2>
    <carousel
      :key="carouselKey"
      ref="carousel"
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
      <slide key="-1" class="d-flex align-items-center">
        <button
          class="addCroquis bg-transparent mx-auto"
          v-b-tooltip.hover
          :title="$t('message.sector.detalle.tooltip_croquis')"
        >
          <b-iconstack font-scale="5" @click="addCroquis">
            <b-icon stacked icon="image" variant="info"></b-icon>
            <b-icon
              stacked
              icon="plus-circle-fill"
              variant="info"
              scale=".5"
              shift-h="-15"
              shift-v="-4"
              :animation="animacionBotonAnadir"
            ></b-icon>
          </b-iconstack>
        </button>
      </slide>
    </carousel>
    <hr />
    <h2>{{ $t("message.sector.detalle.listado_vias") }}</h2>
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
    <ModalVia ref="modal_via" @creada="fetchData" />
    <ModalNuevoCroquis ref="modal_nuevo_croquis" @creado="fetchData" />
  </div>
</template><script>
import Vue from "vue";
import Croquis from "./Croquis";
import { Carousel, Slide } from "vue-carousel";
import TablaVias from "./tablas/TablaVias";
import ModalVia from "./modales/ModalNuevaVia";
import ModalNuevoCroquis from "./modales/ModaNuevoCroquis";

export default {
  components: {
    Croquis,
    Carousel,
    Slide,
    TablaVias,
    ModalVia,
    ModalNuevoCroquis,
  },
  computed: {
    animacionBotonAnadir() {
      return this.croquis && this.croquis.length > 0 ? "none" : "cylon";
    },
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
      carouselKey: 0,
    };
  },

  methods: {
    addCroquis() {
      this.$refs.modal_nuevo_croquis.mostrar(this.idEscuela, this.idSector);
    },

    nuevaVia() {
      this.$refs.modal_via.mostrar(this.idEscuela, this.idSector);
    },

    recargarCroquis(croquis) {
      this.$refs["slide-croquis-" + croquis.id][0].setDataCroquis(croquis);
      this.$bvModal.hide("modal-croquis");
      // se pueden haber creado nuevas vías
      // no vamos a llamar al api para esto, las cogemos
      // del mismo croquis actualizado que retornó el modal
      this.sectorDto.vias = croquis.sector.vias;
      this.$refs.tablaVias.setItems(this.sectorDto.vias);
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
          if (this.croquis && this.croquis.length > 0) {
            this.$refs.carousel.goToPage(this.croquis[0].id);
          }
          this.carouselKey += 1;
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
.addCroquis :hover {
  cursor: pointer;
}
</style>