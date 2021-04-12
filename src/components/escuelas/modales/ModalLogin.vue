<template>
  <b-modal
    id="modal_login"
    ref="modal_login"
    v-bind:title="$t('message.login.header')"
    @show="resetModalLogin"
    @hidden="resetModalLogin"
    @ok="handleLoginOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        v-bind:label="$t('message.login.username')"
        label-for="name-input"
        v-bind:invalid-feedback="$t('message.login.obligatorio')"
        :state="loginNameState"
      >
        <b-form-input
          id="name-input"
          v-model="loginName"
          :state="loginNameState"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        v-bind:label="$t('message.login.password')"
        label-for="password-input"
        v-bind:invalid-feedback="$t('message.login.obligatorio')"
        :state="loginPasswordState"
      >
        <b-form-input
          id="password-input"
          v-model="loginPassword"
          :state="loginPasswordState"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
    </form>
    <p>
      {{ $t("message.login.texto_registrar") }}
      <b-link @click="registrar">{{
        $t("message.login.texto_registrar_link")
      }}</b-link>
    </p>
  </b-modal>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      loginName: "",
      loginNameState: null,
      loginPassword: "",
      loginPasswordState: null,
    };
  },
  methods: {
    registrar() {
      this.$bvModal.hide("modal_login");
      this.$emit("registrar");
    },
    mostrar() {
      this.$bvModal.show("modal_login");
    },
    resetModalLogin() {
      this.loginName = "";
      this.loginNameState = null;
      this.loginPassword = "";
      this.loginPasswordState = null;
    },
    handleLoginOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleLoginSubmit();
    },
    handleLoginSubmit() {
      if (!this.checkLoginFormValidity()) {
        return;
      }
      this.$http
        .post("/login", {
          username: this.loginName,
          password: this.loginPassword,
        })
        .then((response) => {
          Vue.guardaToken(response.data.data.token);
          let titulo = this.$i18n.t("message.login.bienvenido");
          this.$fire({
            title: titulo,
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$bvModal.hide("modal_login");
          this.$emit("logeado", response.data.data.token);
        })
        .catch((error) => {
          console.log(error);
          let titulo = this.$i18n.t("message.login.ko.header");
          let texto = this.$i18n.t("message.login.ko.texto");
          this.$fire({
            title: titulo,
            text: texto,
            type: "error",
            showConfirmButton: true,
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_login");
            });
          });
        });
    },
    checkLoginFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.loginNameState = this.loginName != null && this.loginName.length > 0;
      this.loginPasswordState =
        this.loginPassword != null && this.loginPassword.length > 0;
      return valid;
    },
  },
};
</script>
   <style></style>
    
    