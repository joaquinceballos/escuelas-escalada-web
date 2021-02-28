<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#">
        Escuelas de escalada
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-text>{{ user.sub }} | </b-nav-text>
        <b-nav-item @click="logUserOut" active>Logout</b-nav-item>
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
      user: {}
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
    }
  },
  created() {
    this.getUserDetails();
  }
};
</script>

<style>
#navbar {
  margin-bottom: 15px;
}
</style>
