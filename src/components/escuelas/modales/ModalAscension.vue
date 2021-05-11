<template>
  <b-modal
    id="modal_ascension"
    ref="modal_ascension"
    v-bind:title="$t('message.modal.ascension.header')"
    @show="resetModalAscension"
    @hidden="resetModalAscension"
    @ok="handleAscensionOk"
  >
    <form ref="form-ascension" @submit.stop.prevent="handleSubmit">
      <b-form-row>
        <b-col cols="8">
          <b-form-group
            v-bind:label="$t('message.modal.ascension.fecha')"
            label-for="fecha-input"
            v-bind:invalid-feedback="$t('message.login.obligatorio')"
            :state="fechaState"
          >
            <b-form-datepicker
              id="ascension-datepicker"
              v-model="fecha"
              :locale="locale"
              class="mb-2"
              :state="fechaState"
              :max="new Date()"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            v-bind:label="$t('message.modal.ascension.grado')"
            label-for="select-grado"
          >
            <b-form-select
              id="select-grado"
              v-model="grado"
              :options="grados"
              :state="gradoState"
            />
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-group
        v-bind:label="$t('message.modal.ascension.comentario')"
        label-for="comentario-input"
        v-bind:invalid-feedback="$t('message.formulario.campo_obligatorio')"
        :state="comentarioState"
      >
        <b-form-textarea
          id="comentario-input"
          v-model="comentario"
          :state="comentarioState"
          rows="2"
          required
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
      fecha: new Date(),
      fechaState: null,
      grado: "1",
      gradoState: null,
      comentario: "",
      comentarioState: null,
      idUsuario: -1,
      idVia: -1,
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
  computed: {
    locale() {
      return this.$t("message.idioma.codigo");
    },
  },
  methods: {
    registrar() {
      this.$bvModal.hide("modal_ascension");
      this.$emit("registrar");
    },
    mostrar(idVia) {
      this.idVia = idVia;
      this.$bvModal.show("modal_ascension");
    },
    resetModalAscension() {
      this.fecha = new Date();
      this.fechaState = null;
      this.comentario = "";
      this.comentarioState = null;
      this.grado = 1;
      this.gradoState = null;
      // voy solicitando la id del usuario...
      let usuario = Vue.getSub();
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .get("/usuarios/" + usuario, { headers })
        .then((response) => {
          this.idUsuario = response.data.data.id;
        })
        .catch((error) => {
          console.error("error recuperando la id del usuario:", error);
        });
    },
    handleAscensionOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleAscensionSubmit();
    },
    handleAscensionSubmit() {
      if (!this.checkAscensionFormValidity()) {
        return;
      }
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .post(
          "/usuarios/" + this.idUsuario + "/ascensiones/" + this.idVia,
          {
            fecha:
              new Date(this.fecha).getFullYear() +
              "-" +
              ("" + (new Date(this.fecha).getMonth() + 1)).padStart(2, "0") +
              "-" +
              ("" + new Date(this.fecha).getDate()).padStart(2, "0"),
            grado: this.grado,
            comentario: this.comentario,
          },
          { headers }
        )
        .then(() => {
          let titulo = this.$i18n.t("message.modal.ascension.registrada");
          this.$fire({
            title: titulo,
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$bvModal.hide("modal_ascension");
          this.$emit("registrada");
        })
        .catch((error) => {
          console.log(error);
          let titulo = this.$i18n.t("message.modal.ascension.ko.header");
          let texto = this.$i18n.t("message.modal.ascension.ko.texto", {
            msg: error.response.data.data,
          });
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_ascension");
            });
          });
        });
    },
    checkAscensionFormValidity() {
      const valid = this.$refs["form-ascension"].checkValidity();
      this.fechaState = new Date() - new Date(this.fecha) >= 0;
      this.gradoState = true;
      this.comentarioState =
        this.comentario !== null &&
        this.comentario.length > 0 &&
        this.comentario.length <= 2000;
      return valid;
    },
  },
};
</script>
   <style></style>
    
    