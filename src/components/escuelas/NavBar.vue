<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand>{{ $t("message.app.nombre") }}</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/">{{ $t("message.navbar.inicio") }}</b-nav-item>
        <b-nav-item to="/zona">{{ $t("message.navbar.zonas") }}</b-nav-item>
        <b-nav-item to="/admin">{{ $t("message.navbar.admin") }}</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form @submit.prevent="buscador">
          <div class="form"></div>
          <b-form-input
            size="md"
            class="mr-sm-2"
            v-bind:placeholder="$t('message.navbar.busqueda.placeholder')"
            id="texto"
            v-model="busqueda.texto"
          />
          <b-button size="md" class="my-2 my-sm-0" type="submit">
            <icons :icon="['fas', 'search']" class="fa-search" />
          </b-button>
        </b-nav-form>
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <icons :icon="['fas', 'language']" class="fa-language" />
          </template>
          <b-dropdown-item @click="cambiaIdioma('en')">en</b-dropdown-item>
          <b-dropdown-item @click="cambiaIdioma('es')">es</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right v-show="invitado">
          <template slot="button-content">
            <icons :icon="['fas', 'user']" class="fa-user" />
          </template>
          <b-dropdown-item v-b-modal.modal_login>{{
            $t("message.navbar.usuario.login")
          }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right v-show="!invitado">
          <template slot="button-content">
            {{ user }} <icons :icon="['fas', 'user']" class="fa-user" />
          </template>
          <b-dropdown-item @click="showPerfil">{{
            $t("message.navbar.usuario.perfil")
          }}</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click="logUserOut">{{
            $t("message.navbar.usuario.logout")
          }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
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
    </b-modal>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Vue from "vue";

export default {
  data() {
    return {
      user: "",
      busqueda: {
        texto: "",
      },
      roles: [],
      loginName: "",
      loginNameState: null,
      loginPassword: "",
      loginPasswordState: null,
    };
  },
  methods: {
    cambiaIdioma(idioma) {
      localStorage.setItem("web-escuelas-idioma", idioma);
      this.$i18n.locale = idioma;
    },
    getUserDetails() {
      let token = Vue.getToken();
      try {
        if (token != null) {
          let decoded = VueJwtDecode.decode(token);
          this.user = decoded.sub;
          this.roles = decoded.roles;
        } else {
          this.user = "";
          this.roles = null;
        }
      } catch (error) {
        console.error(error, "error from decoding token");
      }
    },
    logUserOut() {
      Vue.borraToken();
      this.getUserDetails();
      this.$router.push({ path: "/", query: { t: new Date().getTime() } });
    },
    showPerfil() {
      this.$router.push({ name: "perfil", params: { usuario: this.user } });
    },
    showHome() {
      this.$router.push("/");
    },
    buscador() {
      this.$router
        .push({
          name: "busqueda",
          query: { texto: this.busqueda.texto },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
          this.$router.push({
            query: { texto: this.busqueda.texto },
          });
        });
    },
    rolInvitado() {
      return !this.rolAdmin() && !this.rolUser();
    },
    rolAdmin() {
      return (
        this.roles != null &&
        this.roles.length > 0 &&
        this.roles.includes("ROLE_ADMIN")
      );
    },
    rolUser() {
      return (
        this.roles != null &&
        this.roles.length > 0 &&
        this.roles.includes("ROLE_USER")
      );
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
          }).then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal_login");
            });
          });
          this.$nextTick(() => {
            this.$bvModal.hide("modal_login");
            this.getUserDetails();
          });
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
  created() {},
  mounted() {
    this.getUserDetails();
  },
  computed: {
    invitado() {
      return this.rolInvitado();
    },
  },
};
</script>

<style>
#navbar {
  margin-bottom: 15px;
}
</style>
