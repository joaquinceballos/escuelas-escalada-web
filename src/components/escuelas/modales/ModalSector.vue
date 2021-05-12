<template>
  <div>
    <b-modal
      id="modal_sector"
      size="xl"
      ref="modal_sector"
      v-bind:title="$t('message.modal.sector.titulo')"
      @show="resetModalSector"
      @hidden="resetModalSector"
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
        <b-form-group
          v-bind:label="$t('message.modal.sector.posicion')"
          label-for="mapa"
        >
          <div class="my-4" style="height: 25vh">
            <gmaps-map
              id="mapa"
              :options="mapOptions"
              @click="clickEnMapa"
              :key="keyMapa"
            >
              <gmaps-marker :position="posicionMarcador" />
            </gmaps-map>
          </div>
        </b-form-group>
        <label for="horas-de-sol">{{
          $t("message.modal.sector.horas_de_sol")
        }}</label>
        <b-form-row id="horas-de-sol">
          <b-col>
            <b-form-group
              v-bind:label="$t('message.modal.sector.inicio')"
              label-for="hora-inicio"
              v-bind:invalid-feedback="
                $t('message.formulario.campo_obligatorio')
              "
              :state="nombreState"
            >
              <b-form-timepicker
                id="hora-inicio"
                v-model="inicio"
                :locale="locale"
                minutes-step="15"
              ></b-form-timepicker></b-form-group
          ></b-col>
          <b-col>
            <b-form-group
              v-bind:label="$t('message.modal.sector.fin')"
              label-for="hora-fin"
              v-bind:invalid-feedback="
                $t('message.formulario.campo_obligatorio')
              "
              :state="nombreState"
            >
              <b-form-timepicker
                id="hora-fin"
                v-model="fin"
                :locale="locale"
                minutes-step="15"
              ></b-form-timepicker
            ></b-form-group>
          </b-col>
        </b-form-row>
      </form>
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
  computed: {
    locale() {
      console.log(this.$t("message.idioma.codigo"));
      return this.$t("message.idioma.codigo");
    },
  },
  data() {
    return {
      sector: null,
      idEscuela: 0,
      nombre: "",
      informacion: "",
      nombreState: null,
      informacionState: null,
      mapOptions: {
        zoom: 14,
        streetViewControl: false,
      },
      posicionMarcador: { lat: 0, lng: 0 },
      keyMapa: 0,
      inicio: "",
      fin: "",
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
      if (this.sector) {
        this.actualizarSector();
      } else {
        this.grabarNuevoSector();
      }
    },

    actualizarSector() {
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .put(
          "/escuelas/" + this.idEscuela + "/sectores/" + this.sector.id,
          {
            nombre: this.nombre,
            informacion: this.informacion,
            latitud: this.posicionMarcador.lat,
            longitud: this.posicionMarcador.lng,
            horasDeSol:
              this.inicio && this.fin
                ? {
                    inicio: this.inicio,
                    fin: this.fin,
                  }
                : null,
          },
          {
            headers,
          }
        )
        .then((response) => {
          this.$emit("actualizado", response.data.data);
          let titulo = this.$i18n.t("message.modal.sector.actualizado");
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

    grabarNuevoSector() {
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      let nuevoSector = {
        nombre: this.nombre,
        informacion: this.informacion,
        latitud: this.posicionMarcador.lat,
        longitud: this.posicionMarcador.lng,
      };

      if (this.inicio && this.fin) {
        nuevoSector.horasDeSol = {
          inicio: this.inicio,
          fin: this.fin,
        };
      } else {
        nuevoSector.horasDeSol = null;
      }

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

    resetModalSector() {
      if (this.sector) {
        this.nombre = this.sector.nombre;
        this.informacion = this.sector.informacion;
        this.posicionMarcador.lat = this.sector.latitud;
        this.posicionMarcador.lng = this.sector.longitud;
        if (this.sector.horasDeSol) {
          this.inicio = this.sector.horasDeSol.inicio;
          this.fin = this.sector.horasDeSol.fin;
        } else {
          this.inicio = "";
          this.fin = "";
        }
      } else {
        this.nombre = "";
        this.informacion = "";
        this.posicionMarcador.lat = 43.35512954642319;
        this.posicionMarcador.lng = -5.851258521118082;
        this.inicio = "";
        this.fin = "";
      }
      this.centrarMapaAMarcador();
      this.keyMapa += 1;
      this.nombreState = null;
      this.informacionState = null;
    },

    centrarMapaAMarcador() {
      this.mapOptions.center = {
        lat: this.posicionMarcador.lat,
        lng: this.posicionMarcador.lng,
      };
    },

    mostrar(idEscuela, sector) {
      this.sector = sector;
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