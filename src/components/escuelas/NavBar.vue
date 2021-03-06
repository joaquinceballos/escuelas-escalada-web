<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand>{{ $t("message.app.nombre") }}</b-navbar-brand>
      <b-nav-form class="m-auto" @submit.prevent="buscador">
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
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <icons :icon="['fas', 'language']" class="fa-language" />
          </template>
          <b-dropdown-item @click="cambiaIdioma('en')">en</b-dropdown-item>
          <b-dropdown-item @click="cambiaIdioma('es')">es</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <icons :icon="['fas', 'user']" class="fa-user" />
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
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Vue from "vue";

export default {
  data() {
    return {
      user: {},
      busqueda: {
        texto: "",
      },
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
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      } catch (error) {
        console.log(error, "error from decoding token");
      }
    },
    logUserOut() {
      Vue.borraToken();
      this.$router.push("/login");
    },
    showPerfil() {
      this.$router.push({ name: "perfil", params: { usuario: this.user.sub } });
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
  },
  created() {
    this.getUserDetails();
  },
};
</script>

<style>
#navbar {
  margin-bottom: 15px;
}
</style>
