<template>
  <b-modal
    id="modal_cierre"
    ref="modal_cierre"
    v-bind:title="$t('message.modal.cierres.titulo')"
    @show="resetModalCierre"
    @hidden="resetModalCierre"
    @ok="handleCierreOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-row>
        <b-col
          ><b-form-group
            v-bind:label="$t('message.modal.cierres.inicio')"
            label-for="inicio-datepicker"
            v-bind:invalid-feedback="$t('message.modal.cierres.rango')"
            :state="inicioState"
          >
            <b-form-datepicker
              id="inicio-datepicker"
              v-model="inicio"
              :locale="locale"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              :state="inicioState"
              class="mb-2"
            ></b-form-datepicker> </b-form-group
        ></b-col>
        <b-col
          ><b-form-group
            v-bind:label="$t('message.modal.cierres.fin')"
            label-for="fin-datepicker"
            v-bind:invalid-feedback="$t('message.modal.cierres.rango')"
            :state="finState"
          >
            <b-form-datepicker
              id="fin-datepicker"
              v-model="fin"
              :locale="locale"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              :state="finState"
              class="mb-2"
            ></b-form-datepicker> </b-form-group
        ></b-col>
      </b-form-row>
      <b-form-group
        v-bind:label="$t('message.modal.cierres.motivo')"
        label-for="select-motivo"
      >
        <b-form-select
          id="select-motivo"
          v-model="motivoCierre"
          :options="motivos"
          :state="motivoCierreState"
        />
      </b-form-group>
    </form>
  </b-modal>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      idEscuela: 0,
      inicio: new Date(),
      fin: new Date(),
      motivoCierre: "",
      motivos: [],
      inicioState: null,
      finState: null,
      motivoCierreState: null,
    };
  },
  computed: {
    locale() {
      return this.$t("message.idioma.codigo");
    },
  },
  methods: {
    mostrar(idEscuela) {
      this.idEscuela = idEscuela;
      this.$bvModal.show("modal_cierre");
    },
    resetModalCierre() {
      this.inicio = new Date();
      this.fin = new Date();
      this.motivoCierre = "CRIA_AVES";
      this.motivos = [
        {
          value: "CRIA_AVES",
          text: this.$t("message.modal.cierres.combo.CRIA_AVES"),
        },
        {
          value: "OTROS",
          text: this.$t("message.modal.cierres.combo.OTROS"),
        },
      ];
      this.inicioState = null;
      this.finState = null;
      this.motivoCierreState = null;
    },
    handleCierreOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleCierrSubmit();
    },
    handleCierrSubmit() {
      if (!this.checkLoginFormValidity()) {
        return;
      }
      const headers = Vue.getHeaders(this.$t("message.idioma.codigo"));
      this.$http
        .post(
          "/escuelas/" + this.idEscuela + "/cierres",
          {
            inicio: this.inicio,
            fin: this.fin,
            motivoCierre: this.motivoCierre,
          },
          { headers }
        )
        .then((response) => {
          this.$fire({
            title: "Grabado",
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$bvModal.hide("modal_cierre");
          this.$emit("grabado", response.data.data);
        })
        .catch((error) => {
          let titulo = this.$i18n.t("message.modal.cierres.error.header");
          let texto = this.$i18n.t("message.modal.cierres.error.texto", {
            msg: error.response.data.data,
          });
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_cierre");
            });
          });
        });
    },
    checkLoginFormValidity() {
      const valid = this.$refs.form.checkValidity();
      let rangoCorrecto = new Date(this.fin) - new Date(this.inicio) > 0
      this.inicioState = rangoCorrecto;
      this.finState = rangoCorrecto;
      this.motivoCierreState = true;
      return valid && this.inicioState && this.finState;
    },
  },
};
</script>
   <style></style>
    
    