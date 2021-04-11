<template>
  <div>
    <b-modal
      id="modal_nuevo_croquis"
      ref="modal_nuevo_croquis"
      v-bind:title="$t('message.modal.croquis.titulo')"
      @show="resetModalNuevoCroquis"
      @hidden="resetModalNuevoCroquis"
      @ok="handleFormularioOk"
    >
      <form ref="form">
        <b-form-group
          v-bind:label="$t('message.modal.croquis.nombre')"
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
          v-bind:label="$t('message.modal.croquis.imagen')"
          label-for="imagen-input"
          v-bind:invalid-feedback="$t('message.modal.croquis.error.imagen')"
          :state="fileState"
        >
          <b-form-file
            id="imagen-input"
            v-model="file"
            accept="image/jpeg, image/png"
            :state="fileState"
            :browse-text="$t('message.modal.croquis.browse_text')"
            :placeholder="$t('message.modal.croquis.placeholder')"
            :drop-placeholder="$t('message.modal.croquis.drop_placeholder')"
            @input="cargaImagen"
          ></b-form-file
        ></b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      idEscuela: 0,
      idSector: 0,
      nombre: "",
      nombreState: null,
      file: null,
      fileState: null,
      base64Imagen: null,
    };
  },

  methods: {
    cargaImagen(img) {
      var reader = new FileReader();

      reader.addEventListener(
        "load",
        () => {
          this.base64Imagen = reader.result.split(",")[1];
        },
        false
      );

      reader.readAsDataURL(img);
    },

    handleFormularioOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleCroquisSubmit();
    },

    handleCroquisSubmit() {
      if (!this.checkViaFormValidity()) {
        return;
      }
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      let nuevoCroquis = {
        nombre: this.nombre,
        imagen: this.base64Imagen,
      };

      this.$http
        .post(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.idSector +
            "/croquis",
          nuevoCroquis,
          {
            headers,
          }
        )
        .then((response) => {
          this.$emit("creado", response.data.data);
          let titulo = this.$i18n.t("message.modal.croquis.creado");
          this.$fire({
            title: titulo,
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_nuevo_croquis");
            });
          });
        })
        .catch((error) => {
          console.log(error);
          let titulo = this.$i18n.t("message.modal.croquis.error.header");
          let texto = this.$i18n.t("message.modal.croquis.error.texto");
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          });
        });
    },

    checkViaFormValidity() {
      this.nombreState = this.nombre != null && this.nombre.length > 0;
      this.fileState =
        this.file != null &&
        this.base64Imagen != null &&
        this.base64Imagen.length > 0;
      const valid = this.$refs.form.checkValidity();
      return valid && this.file != null;
    },

    resetModalNuevoCroquis() {
      this.nombre = "";
      this.nombreState = null;
      this.base64Imagen = null;
      this.file = null;
      this.fileState = null;
    },

    mostrar(idEscuela, idSector) {
      this.idEscuela = idEscuela;
      this.idSector = idSector;
      this.$bvModal.show("modal_nuevo_croquis");
    },
  },

  mounted() {},
};
</script>
<style>
</style>