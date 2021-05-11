<template>
  <div>
    <b-modal
      :id="'modal_via-' + this.idEscuela + '-' + this.idSector"
      :ref="'modal_via-' + this.idEscuela + '-' + this.idSector"
      v-bind:title="$t('message.modal.via.titulo')"
      @show="resetModalNuevaVia"
      @hidden="resetModalNuevaVia"
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
      idEscuela: 0,
      idSector: 0,
      nombre: "",
      grado: "1",
      longitud: null,
      chapas: null,
      nombreState: null,
      longitudState: null,
      chapasState: null,
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
      if (!this.checkViaFormValidity()) {
        return;
      }
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      console.log('->', headers);
      let nuevaVia = {
        nombre: this.nombre,
        grado: this.grado,
        longitud: this.longitud,
        numeroChapas: this.chapas,
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
      this.longitudState = !this.longitud || this.longitud > 0;
      this.chapasState =
        !this.chapas ||
        (this.chapas == Math.round(this.chapas) && this.chapas >= 0);
      return valid;
    },

    resetModalNuevaVia() {
      this.nombre = "";
      this.nombreState = null;
      this.grado = "1";
      this.longitud = null;
      this.longitudState = null;
      this.chapas = null;
      this.chapasState = null;
    },

    mostrar(idEscuela, idSector) {
      this.idEscuela = idEscuela;
      this.idSector = idSector;
      // pequeño delay para que de tiempo a rehacer la id del modal
      setTimeout(() => {
        this.$bvModal.show("modal_via-" + this.idEscuela + "-" + this.idSector);
      }, 100);
    },
  },

  mounted() {},
};
</script>
<style>
</style>