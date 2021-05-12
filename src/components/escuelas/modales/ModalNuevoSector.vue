<template>
  <div>
    <b-modal
      id="modal_sector"
      size="xl"
      ref="modal_sector"
      v-bind:title="$t('message.modal.sector.titulo')"
      @show="resetModalNuevoSector"
      @hidden="resetModalNuevoSector"
      @ok="handleFormularioOk"
    >
      <form ref="form">
        <b-form-group
          v-bind:label="$t('message.modal.sector.nombre')"
          label-for="name-input"
          v-bind:invalid-feedback="$t('message.formulario.campo_obligatorio')"
          :state="nombreState"
        >
          <b-form-input
            id="name-input"
            v-model="nombre"
            :state="nombreState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          v-bind:label="$t('message.modal.sector.informacion')"
          label-for="info-input"
          v-bind:invalid-feedback="$t('message.formulario.campo_obligatorio')"
          :state="informacionState"
        >
          <b-form-textarea
            id="info-input"
            v-model="informacion"
            :state="informacionState"
            rows="2"
          ></b-form-textarea>
        </b-form-group>
      </form>
      <div class="my-4" style="height: 25vh">
        <gmaps-map :options="mapOptions" @click="clickEnMapa">
          <gmaps-marker :position="posicionMarcador" />
        </gmaps-map>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Vue from "vue";
import { gmapsMap, gmapsMarker } from "x5-gmaps";
export default {
  components: {
    gmapsMap,
    gmapsMarker,
  },
  data() {
    return {
      idEscuela: 0,
      nombre: "",
      informacion: "",
      nombreState: null,
      informacionState: null,
      mapOptions: {
        zoom: 14,
        streetViewControl: false,
      },
      posicionMarcador: { lat: 43.35512954642319, lng: -5.851258521118082 },
    };
  },

  methods: {
    clickEnMapa(evento) {
      this.posicionMarcador = evento.latLng.toJSON();
    },
    handleFormularioOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSectorSubmit();
    },

    handleSectorSubmit() {
      if (!this.checkSectorFormValidity()) {
        return;
      }
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      let nuevoSector = {
        nombre: this.nombre,
        informacion: this.informacion,
        latitud: this.posicionMarcador.lat,
        longitud: this.posicionMarcador.lng,
      };

      this.$http
        .post("/escuelas/" + this.idEscuela + "/sectores/", nuevoSector, {
          headers,
        })
        .then((response) => {
          this.$emit("creado", response.data.data);
          let titulo = this.$i18n.t("message.modal.sector.creado");
          this.$fire({
            title: titulo,
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_sector");
            });
          });
        })
        .catch((error) => {
          console.log(error);
          let titulo = this.$i18n.t("message.modal.sector.error.header");
          let texto = this.$i18n.t("message.modal.sector.error.texto", {
            msg: error.response.data.data,
          });
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_sector");
            });
          });
        });
    },

    checkSectorFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nombreState = this.nombre != null && this.nombre.length > 0;
      this.informacionState =
        this.informacion == null || this.informacion.length <= 1000;
      return valid;
    },

    resetModalNuevoSector() {
      this.nombre = "";
      this.nombreState = null;
      this.informacion = "";
      this.informacionState = null;
    },

    centrarMapaAMarcador() {
      this.mapOptions.center = {
        lat: this.posicionMarcador.lat,
        lng: this.posicionMarcador.lng,
      };
    },

    mostrar(idEscuela) {
      this.idEscuela = idEscuela;
      this.$bvModal.show("modal_sector");
    },
  },

  mounted() {
    this.centrarMapaAMarcador();
  },
};
</script>
<style>
</style>