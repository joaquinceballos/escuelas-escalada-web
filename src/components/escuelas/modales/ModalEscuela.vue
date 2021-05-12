<template>
  <div>
    <b-modal
      id="modal_escuela"
      ref="modal_escuela"
      v-bind:title="$t('message.modal.escuela.titulo')"
      @show="resetModalEscuela"
      @hidden="resetModalEscuela"
      @ok="handleFormularioOk"
    >
      <form ref="form">
        <b-form-group
          v-bind:label="$t('message.modal.escuela.nombre')"
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
          v-bind:label="$t('message.modal.escuela.informacion')"
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
        <b-form-group v-bind:label="$t('message.modal.escuela.zona')">
          <b-form-row>
            <b-col>
              <b-form-select
                id="select-pais"
                v-model="pais"
                :options="paises"
                @change="seleccionaPais"
            /></b-col>
            <b-col class="ml-auto">
              <b-form-select
                id="select-region"
                v-model="idZona"
                :state="regionState"
                :options="regiones"
                required
            /></b-col>
          </b-form-row>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      escuela: null,
      nombre: "",
      informacion: "",
      informacionState: null,
      nombreState: null,
      regionState: null,
      pais: null,
      idZona: null,
      paises: [],
      regiones: [],
    };
  },

  methods: {
    handleFormularioOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleEscuelaSubmit();
    },

    grabarNuevaEscuela() {
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      let nuevaEscuela = {
        nombre: this.nombre,
        informacion: this.informacion,
        zona: {
          id: this.idZona,
        },
      };
      this.$http
        .post("/escuelas", nuevaEscuela, { headers })
        .then((response) => {
          this.$emit("creada", response.data.data);
          let titulo = this.$i18n.t("message.modal.escuela.creada");
          this.$fire({
            title: titulo,
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_escuela");
            });
          });
        })
        .catch((error) => {
          let titulo = this.$i18n.t("message.modal.escuela.error.header");
          let texto = this.$i18n.t("message.modal.escuela.error.texto", {
            msg: error.response.data.data,
          });
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_escuela");
            });
          });
        });
    },

    actualizarEscuela() {
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .put(
          "/escuelas/" + this.escuela.id,
          {
            nombre: this.nombre,
            informacion: this.informacion,
            zona: { id: this.idZona },
          },
          { headers }
        )
        .then((response) => {
          this.$emit("actualizada", response.data.data);
          let titulo = this.$i18n.t("message.modal.escuela.actualizada");
          this.$fire({
            title: titulo,
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_escuela");
            });
          });
        })
        .catch((error) => {
          let titulo = this.$i18n.t("message.modal.escuela.error.header");
          let texto = this.$i18n.t("message.modal.escuela.error.texto", {
            msg: error.response.data.data,
          });
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_escuela");
            });
          });
        });
    },

    handleEscuelaSubmit() {
      if (!this.checkEscuelaFormValidity()) {
        return;
      }

      if (this.escuela) {
        this.actualizarEscuela();
      } else {
        this.grabarNuevaEscuela();
      }
    },

    checkEscuelaFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nombreState = this.nombre != null && this.nombre.length > 0;
      this.informacionState =
        this.informacion == null || this.informacion.length <= 1000;
      return valid;
    },

    resetModalEscuela() {
      if (this.escuela) {
        this.nombre = this.escuela.nombre;
        this.informacion = this.escuela.informacion;
      } else {
        this.nombre = "";
        this.informacion = "";
      }
      this.nombreState = null;
      this.informacionState = null;
    },

    seleccionaPais() {
      this.cargaRegiones();
    },

    cargaRegiones() {
      this.regiones = [];
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .get("/zonas?pais=" + this.pais + "&sort=region,asc", { headers })
        .then((response) => {
          let contenido = response.data.data.contenido;
          for (let i = 0; i < contenido.length; i++) {
            this.regiones.push({
              value: contenido[i].id,
              text: contenido[i].region,
            });
          }
          // comprobamos si la región seleccionada está entre las recuperadas
          let filtrada = this.regiones.filter((r) => r.value == this.idZona)[0];
          if (!filtrada) {
            this.idZona = this.regiones[0].value;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            console.log(err);
          }
          console.log(err.response);
        });
    },

    mostrar(pais, idZona, escuela) {
      this.pais = pais;
      this.idZona = idZona;
      this.escuela = escuela;
      this.cargaRegiones();
      this.$bvModal.show("modal_escuela");
    },
  },

  mounted() {
    this.paises = Vue.getComboPaises(this.$i18n.t("message.idioma.codigo"));
  },
};
</script>
<style>
</style>