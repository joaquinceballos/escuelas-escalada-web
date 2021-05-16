<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand>{{ $t("message.app.nombre") }}</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/"
          ><b-icon icon="house" variant="light"></b-icon>
          {{ $t("message.navbar.inicio") }}</b-nav-item
        >
        <b-nav-item to="/zonas"
          ><b-icon icon="globe" variant="light"></b-icon>
          {{ $t("message.navbar.zonas") }}</b-nav-item
        >
        <b-nav-item v-if="admin" to="/admin"
          ><b-icon icon="screwdriver" variant="light"></b-icon>
          {{ $t("message.navbar.admin") }}</b-nav-item
        >
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
    <ModalLogin ref="modal_login" @logeado="logeado" @registrar="registrar" />
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
        } else {
          this.user = "";
        }
      } catch (error) {
        console.error(error, "error from decoding token");
      }
    },
    logUserIn() {
      this.$refs.modal_login.mostrar();
    },
    logUserOut() {
      let user = {
        username: process.env.VUE_APP_API_GENERIC_USER,
        password: process.env.VUE_APP_API_GENERIC_PASSWORD,
      };
      this.$http
        .post("/login", user)
        .then((response) => {
          Vue.guardaToken(response.data.data.token);
          this.$router.push({
            name: "home",
            query: { t: new Date().getTime() },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showPerfil() {
      this.$router.push({ name: "perfil", params: { usuario: this.user } });
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
    registrar() {
      this.$refs.modal_register.mostrar();
    },
    loguear() {
      this.logUserIn();
    },
    logeado() {
      this.getUserDetails();
      this.$emit("logeado");
    },
  },
  mounted() {
    this.getUserDetails();
  },
  computed: {
    invitado() {
      return Vue.rolInvitado();
    },
    admin() {
      return Vue.rolAdmin();
    },
  },
};
</script>

<style>
#navbar {
  margin-bottom: 15px;
}
</style>
