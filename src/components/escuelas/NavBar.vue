<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand @click="showHome"> Escuelas de escalada </b-navbar-brand>
      <b-nav-form class="m-auto">
        <b-form-input size="md" class="mr-sm-2" placeholder="Search" />
        <b-button size="md" class="my-2 my-sm-0" type="submit">
          <icons :icon="['fas', 'search']" class="fa-search" />
        </b-button>
      </b-nav-form>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <icons :icon="['fas', 'user']" class="fa-user" />
          </template>
          <b-dropdown-item  @click="showPerfil" >Perfil</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item  @click="logUserOut" >Logout</b-dropdown-item>
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
    };
  },
  methods: {
    getUserDetails() {
      let token = Vue.getToken();
      try {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      } catch (error) {
        // return error in production env
        console.log(error, "error from decoding token");
      }
    },
    logUserOut() {
      Vue.borraToken();
      this.$router.push("/login");
    },
    showPerfil() {
      console.log(this.user.sub);
      this.$router.push({ name: 'perfil', params: { usuario: this.user.sub } })
    },
    showHome() {
      this.$router.push("/");
    }
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
