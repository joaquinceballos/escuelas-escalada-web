<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand>{{ $t("message.app.nombre") }}</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/">{{ $t("message.navbar.inicio") }}</b-nav-item>
        <b-nav-item to="/zona">{{ $t("message.navbar.zonas") }}</b-nav-item>
        <b-nav-item v-if="admin" to="/admin">{{ $t("message.navbar.admin") }}</b-nav-item>
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
          <b-dropdown-item @click="logUserIn">{{
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
    <ModalLogin
      ref="modal_login"
      @logeado="getUserDetails"
      @registrar="registrar"
    />
    <ModalRegister
      ref="modal_register"
      @registrado="logUserIn"
      @loguear="loguear"
    />
  </div>
</template>

<script>
import Vue from "vue";
import VueJwtDecode from "vue-jwt-decode";
import ModalLogin from "./modales/ModalLogin";
import ModalRegister from "./modales/ModalRegister";

export default {
  components: {
    ModalLogin,
    ModalRegister,
  },
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
    logUserIn() {
      this.$refs.modal_login.mostrar();
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
    registrar() {
      this.$refs.modal_register.mostrar();
    },
    loguear() {
      this.logUserIn();
    },
  },
  mounted() {
    this.getUserDetails();
  },
  computed: {
    invitado() {
      return this.rolInvitado();
    },
    admin(){
      return this.rolAdmin();
    }
  },
};
</script>

<style>
#navbar {
  margin-bottom: 15px;
}
</style>
