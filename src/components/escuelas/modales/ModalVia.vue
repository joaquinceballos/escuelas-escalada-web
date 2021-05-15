<template>
  <div>
    <b-modal
      :id="'modal_via-' + this.idEscuela + '-' + this.idSector"
      :ref="'modal_via-' + this.idEscuela + '-' + this.idSector"
      v-bind:title="tituloModal"
      @show="resetModalVia"
      @hidden="resetModalVia"
      @ok="handleFormularioOk"
    >
      <form ref="form">
        <b-form-group
          v-bind:label="$t('message.modal.via.nombre')"
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
          v-bind:label="$t('message.modal.via.informacion')"
          label-for="informacion-input"
          v-bind:invalid-feedback="$t('message.formulario.campo_obligatorio')"
          :state="informacionState"
        >
          <b-form-textarea
            id="informacion-input"
            v-model="informacion"
            :state="informacionState"
            rows="2"
          ></b-form-textarea>
        </b-form-group>
        <b-form-row>
          <b-col>
            <b-form-group
              v-bind:label="$t('message.modal.via.grado')"
              label-for="select-grado"
            >
              <b-form-select
                id="select-grado"
                v-model="grado"
                :options="grados"
                :state="gradoState"
              /> </b-form-group
          ></b-col>
          <b-col>
            <b-form-group
              v-bind:label="$t('message.modal.via.longitud')"
              label-for="longitud-input"
              v-bind:invalid-feedback="
                $t('message.modal.via.validacion.longitud')
              "
              :state="longitudState"
            >
              <b-form-input
                id="longitud-input"
                :state="longitudState"
                v-model="longitud"
                type="number"
                min="0"
                step=".25"
              ></b-form-input> </b-form-group
          ></b-col>
          <b-col class="ml-auto">
            <b-form-group
              v-bind:label="$t('message.modal.via.numero_chapas')"
              label-for="chapas-input"
              v-bind:invalid-feedback="
                $t('message.modal.via.validacion.numero_chapas')
              "
              :state="chapasState"
            >
              <b-form-input
                id="chapas-input"
                v-model="chapas"
                type="number"
                min="0"
                step="1"
                :state="chapasState"
              ></b-form-input> </b-form-group
          ></b-col>
        </b-form-row>
      </form>
    </b-modal>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      /** Si nos abren el modal pasando vía se trata de una actualización */
      via: null,
      idEscuela: 0,
      idSector: 0,
      nombre: "",
      grado: "1",
      gradoState: null,
      longitud: null,
      chapas: null,
      nombreState: null,
      longitudState: null,
      chapasState: null,
      informacion: "",
      informacionState: null,
      grados: [
        "1",
        "2",
        "3",
        "4a",
        "4b",
        "4c",
        "5a",
        "5c",
        "6a",
        "6a+",
        "6b",
        "6b+",
        "6c",
        "6c+",
        "7a",
        "7a+",
        "7b",
        "7b+",
        "7c",
        "7c+",
        "8a",
        "8a+",
        "8b",
        "8b+",
        "8c",
        "8c+",
        "9a",
        "9a+",
        "9b",
        "9b+",
      ],
    };
  },

  methods: {
    handleFormularioOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleViaSubmit();
    },

    handleViaSubmit() {
      console.log("handle via submit");
      if (!this.checkViaFormValidity()) {
        return;
      }

      if (this.via === null) {
        this.grabaNuevaVia();
      } else {
        this.actualizaVia();
      }
    },

    actualizaVia() {
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .put(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.idSector +
            "/vias/" +
            this.via.id,
          {
            nombre: this.nombre,
            grado: this.grado,
            longitud: this.longitud,
            numeroChapas: this.chapas,
            informacion: this.informacion,
          },
          {
            headers,
          }
        )
        .then((response) => {
          this.$emit("actualizada", response.data.data);
          let titulo = this.$i18n.t("message.modal.via.actualizada");
          this.$fire({
            title: titulo,
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide(
                "modal_via-" + this.idEscuela + "-" + this.idSector
              );
            });
          });
        })
        .catch((error) => {
          console.log(error);
          let titulo = this.$i18n.t("message.modal.via.error.header");
          let texto = this.$i18n.t("message.modal.via.error.texto", {
            msg: error.response.data.data,
          });
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          });
        });
    },

    grabaNuevaVia() {
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));

      let nuevaVia = {
        nombre: this.nombre,
        grado: this.grado,
        longitud: this.longitud,
        numeroChapas: this.chapas,
        informacion: this.informacion,
      };

      this.$http
        .post(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.idSector +
            "/vias",
          nuevaVia,
          {
            headers,
          }
        )
        .then((response) => {
          this.$emit("creada", response.data.data);
          let titulo = this.$i18n.t("message.modal.via.creada");
          this.$fire({
            title: titulo,
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide(
                "modal_via-" + this.idEscuela + "-" + this.idSector
              );
            });
          });
        })
        .catch((error) => {
          console.log(error);
          let titulo = this.$i18n.t("message.modal.via.error.header");
          let texto = this.$i18n.t("message.modal.via.error.texto", {
            msg: error.response.data.data,
          });
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          });
        });
    },

    checkViaFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nombreState = this.nombre != null && this.nombre.length > 0;
      this.longitudState =
        !this.longitud || (this.longitud > 0 && this.longitud % 0.25 == 0);
      this.chapasState =
        !this.chapas ||
        (this.chapas == Math.round(this.chapas) && this.chapas >= 0);
      this.gradoState = this.grado !== null;
      this.informacionState = true;
      return valid;
    },

    resetModalVia() {
      if (this.via) {
        this.nombre = this.via.nombre;
        this.grado = this.via.grado;
        this.longitud = this.via.longitud;
        this.chapas = this.via.numeroChapas;
        this.informacion = this.via.informacion;
      } else {
        this.nombre = "";
        this.grado = "1";
        this.longitud = null;
        this.chapas = null;
        this.informacion = "";
      }
      this.nombreState = null;
      this.longitudState = null;
      this.chapasState = null;
      this.gradoState = null;
      this.informacionState = null;
    },

    mostrar(idEscuela, idSector, via) {
      this.via = via ? via : null;
      this.idEscuela = idEscuela;
      this.idSector = idSector;
      // pequeño delay para que de tiempo a rehacer la id del modal
      setTimeout(() => {
        this.$bvModal.show("modal_via-" + this.idEscuela + "-" + this.idSector);
      }, 100);
    },
  },

  computed: {
    tituloModal() {
      if (this.via) {
        return this.$t("message.modal.via.titulo_actualizar");
      }
      return this.$t("message.modal.via.titulo_nueva");
    },
  },

  mounted() {},
};
</script>
<style>
</style>