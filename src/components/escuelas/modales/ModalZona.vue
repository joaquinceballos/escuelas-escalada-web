<template>
  <b-modal
    id="modal_zona"
    ref="modal_zona"
    v-bind:title="tituloModal"
    @show="resetModalZona"
    @hidden="resetModalZona"
    @ok="handleZonaOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-row>
        <b-col>
          <b-form-group
            v-bind:label="$t('message.modal.zona.region')"
            label-for="name-input"
            v-bind:invalid-feedback="$t('message.formulario.campo_obligatorio')"
            :state="regionState"
          >
            <b-form-input
              id="name-input"
              v-model="region"
              :state="regionState"
              required
            ></b-form-input> </b-form-group
        ></b-col>
        <b-col>
          <b-form-group
            v-bind:label="$t('message.modal.zona.pais')"
            label-for="pais-input"
            v-bind:invalid-feedback="$t('message.formulario.campo_obligatorio')"
          >
            <b-form-select
              id="pais-input"
              v-model="pais"
              :state="paisState"
              :options="paises" /></b-form-group
        ></b-col>
      </b-form-row>
      <b-form-row>
        <b-col cols="10"
          ><b-form-group
            v-bind:label="$t('message.modal.zona.url_imagen')"
            label-for="imagen-input"
            v-bind:invalid-feedback="$t('message.formulario.campo_obligatorio')"
            :state="imagenState"
          >
            <b-form-input
              id="imagen-input"
              v-model="enlaceImagen"
              :state="imagenState"
            ></b-form-input> </b-form-group
        ></b-col>
        <b-col>
          <b-form-group
            v-bind:label="$t('message.modal.zona.visible')"
            label-for="visible-input"
            v-bind:invalid-feedback="$t('message.formulario.campo_obligatorio')"
          >
            <b-form-checkbox
              id="visible-input"
              v-model="visible"
              name="visible-input"
              switch
              size="lg"
              :state="visibleState"
            >
            </b-form-checkbox></b-form-group
        ></b-col>
      </b-form-row>
      <b-form-group
        v-bind:label="$t('message.modal.zona.informacion')"
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
  </b-modal>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      zona: null,
      region: "",
      pais: "",
      enlaceImagen: "",
      visible: false,
      informacion: "",
      regionState: null,
      paisState: null,
      imagenState: null,
      visibleState: null,
      informacionState: null,
      paises: [],
    };
  },
  computed: {
    locale() {
      return this.$t("message.idioma.codigo");
    },
    tituloModal() {
      if (this.zona) {
        return this.$t("message.modal.zona.titulo_actualizar");
      }
      return this.$t("message.modal.zona.titulo_nueva");
    },
  },
  methods: {
    mostrar(zona) {
      this.zona = zona;
      this.$bvModal.show("modal_zona");
    },

    resetModalZona() {
      if (this.zona) {
        this.region = this.zona.region;
        this.pais = this.zona.pais;
        this.visible = this.zona.visible;
        this.informacion = this.zona.informacion;
        this.enlaceImagen = this.zona.enlaceImagen;
      } else {
        this.region = "";
        this.pais = "";
        this.visible = false;
        this.informacion = "";
        this.enlaceImagen = "";
      }
      this.regionState = null;
      this.paisState = null;
      this.visibleState = null;
      this.informacionState = null;
      this.imagenState = null;
    },

    handleZonaOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleZonaSubmit();
    },

    handleZonaSubmit() {
      if (!this.checkLoginFormValidity()) {
        return;
      }
      if (this.zona) {
        this.actualizarZona();
      } else {
        this.grabarZona();
      }
    },

    actualizarZona() {
      const headers = Vue.getHeaders(this.$t("message.idioma.codigo"));
      this.$http
        .put(
          "/zonas/" + this.zona.id,
          {
            region: this.region,
            pais: this.pais,
            visible: this.visible,
            informacion: this.informacion,
            enlaceImagen: this.enlaceImagen,
          },
          { headers }
        )
        .then((response) => {
          this.$fire({
            title: "Actualizada",
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$bvModal.hide("modal_zona");
          this.$emit("actualizada", response.data.data);
        })
        .catch((error) => {
          let titulo = this.$i18n.t("message.modal.zona.error.header");
          let texto = this.$i18n.t("message.modal.zona.error.texto", {
            msg: JSON.stringify(error.response.data.data),
          });
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_zona");
            });
          });
        });
    },

    grabarZona() {
      const headers = Vue.getHeaders(this.$t("message.idioma.codigo"));
      this.$http
        .post(
          "/zonas/",
          {
            region: this.region,
            pais: this.pais,
            informacion: this.informacion,
            visible: this.visible,
            enlaceImagen: this.enlaceImagen,
          },
          { headers }
        )
        .then((response) => {
          this.$fire({
            title: "Grabada",
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$bvModal.hide("modal_zona");
          this.$emit("grabada", response.data.data);
        })
        .catch((error) => {
          let titulo = this.$i18n.t("message.modal.zona.error.header");
          let texto = this.$i18n.t("message.modal.zona.error.texto", {
            msg: error.response.data.data,
          });
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_zona");
            });
          });
        });
    },

    checkLoginFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.regionState = this.region && this.region.length > 0;
      this.paisState = this.pais != null && this.pais.length > 0;
      this.visibleState = true;
      this.informacionState =
        this.informacion == null ||
        (this.informacion != null && this.informacion.length < 2000);
      this.imagenState = true;
      return valid && this.regionState && this.informacionState;
    },
  },

  mounted() {
    this.paises = Vue.getComboPaises(this.$i18n.t("message.idioma.codigo"));
  },
};
</script>
   <style></style>
    
    