<template>
  <b-modal
    id="modal_register"
    ref="modal_register"
    v-bind:title="$t('message.register.header')"
    @show="resetModalRegister"
    @hidden="resetModalRegister"
    @ok="handleRegisterOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <!-- nombre -->
      <b-form-group
        v-bind:label="$t('message.register.nombre')"
        label-for="name-input"
        v-bind:invalid-feedback="$t('message.register.obligatorio')"
        :state="nombreState"
      >
        <b-form-input
          id="name-input"
          v-model="nombre"
          :state="nombreState"
          required
        ></b-form-input>
      </b-form-group>

      <!-- apellido -->
      <b-form-group
        v-bind:label="$t('message.register.apellido')"
        label-for="apellido-input"
        v-bind:invalid-feedback="$t('message.register.obligatorio')"
        :state="apellidoState"
      >
        <b-form-input
          id="apellido-input"
          v-model="apellido"
          :state="apellidoState"
          required
        ></b-form-input>
      </b-form-group>

      <!-- username y password -->
      <b-form-row>
        <b-col>
          <b-form-group
            v-bind:label="$t('message.register.username')"
            label-for="username-input"
            v-bind:invalid-feedback="$t('message.register.error.username')"
            :state="usernameState"
          >
            <b-form-input
              id="username-input"
              v-model="username"
              :state="usernameState"
              type="text"
              required
            ></b-form-input> </b-form-group
        ></b-col>
        <b-col>
          <b-form-group
            v-bind:label="$t('message.register.password')"
            label-for="password-input"
            v-bind:invalid-feedback="$t('message.register.obligatorio')"
            :state="passwordState"
          >
            <b-form-input
              id="password-input"
              v-model="password"
              :state="passwordState"
              type="password"
              required
              autocomplete="on"
            ></b-form-input> </b-form-group
        ></b-col>
      </b-form-row>

      <!-- email y país -->
      <b-form-row>
        <b-col>
          <b-form-group
            v-bind:label="$t('message.register.email')"
            label-for="email-input"
            v-bind:invalid-feedback="$t('message.register.obligatorio')"
            :state="emailState"
          >
            <b-form-input
              id="email-input"
              v-model="email"
              :state="emailState"
              type="email"
              required
            ></b-form-input> </b-form-group
        ></b-col>
        <b-col>
          <b-form-group
            v-bind:label="$t('message.register.pais')"
            label-for="password-input"
            v-bind:invalid-feedback="$t('message.register.obligatorio')"
            :state="passwordState"
          >
            <b-form-select
              id="select-pais"
              v-model="pais"
              :state="paisState"
              :options="paises"
              required
            /> </b-form-group
        ></b-col>
      </b-form-row>
    </form>
    <p>
      {{ $t("message.register.texto_login") }}
      <b-link @click="loguear">{{
        $t("message.register.texto_login_link")
      }}</b-link>
    </p>
  </b-modal>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      nombre: "",
      password: "",
      apellido: "",
      username: "",
      email: "",
      pais: "",
      nombreState: null,
      passwordState: null,
      apellidoState: null,
      usernameState: null,
      emailState: null,
      paisState: null,
      paises: [],
    };
  },
  methods: {
    resetModalRegister() {
      this.nombre = "";
      this.password = "";
      this.apellido = "";
      this.username = "";
      this.pais = "ES";
      this.email = "";
      this.nombreState = null;
      this.passwordState = null;
      this.apellidoState = null;
      this.emailState = null;
      this.paisState = null;
      this.usernameState = null;
    },
    handleRegisterOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleLoginSubmit();
    },
    handleLoginSubmit() {
      if (!this.checkRegisterFormValidity()) {
        return;
      }

      this.$http
        .post("/usuarios", {
          nombre: this.nombre,
          apellido1: this.apellido,
          username: this.username,
          password: this.password,
          pais: this.pais,
          email: this.email,
        })
        .then((response) => {
          let titulo = this.$i18n.t("message.register.usuario_creado");
          this.$fire({
            title: titulo,
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$bvModal.hide("modal_register");
          this.$emit("registrado", response.data.data.id);
        })
        .catch((error) => {
          console.log(error);
          let titulo = this.$i18n.t("message.register.error.header");
          let texto = this.$i18n.t("message.register.error.texto", {
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
    checkRegisterFormValidity() {
      this.nombreState = this.nombre != null && this.nombre.length > 0;
      this.apellidoState = this.apellido != null && this.apellido.length > 0;
      this.usernameState =
        this.username != null &&
        this.username.length > 0 &&
        this.username.match(/^[0-9a-zA-Z]+$/) != null &&
        this.username.length >= 4 &&
        this.username.length < 20;
      console.log(this.username != null);
      console.log(this.username.length > 0);
      console.log(this.username.match("/^[0-9a-zA-Z]+$/"));
      console.log(this.username.length >= 4);
      console.log(this.username.length < 20);
      console.log(this.usernameState);
      this.passwordState = this.password != null && this.password.length > 0;
      this.emailState = this.email != null && this.email.length > 0;
      this.paisState = this.pais != null && this.pais.length > 0;
      return (
        this.nombreState &&
        this.apellidoState &&
        this.usernameState &&
        this.passwordState &&
        this.emailState &&
        this.paisState &&
        this.$refs.form.checkValidity()
      );
    },
    mostrar() {
      this.$bvModal.show("modal_register");
    },
    loguear() {
      this.$bvModal.hide("modal_register");
      this.$emit("loguear");
    },
  },
  mounted() {
    this.paises = Vue.getComboPaises(this.$i18n.t("message.idioma.codigo"));
  },
};
</script>
<style>
</style>