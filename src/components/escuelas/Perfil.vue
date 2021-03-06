<template>
  <div class="perfil-usuario">
    <h1>{{ $t("message.perfil.titulo") }}</h1>
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <div class="container">
      <dl class="row">
        <dt class="col-sm-3 text-right">{{ $t("message.perfil.username") }}</dt>
        <dd class="col-sm-9 text-left">{{ userDto.username }}</dd>
      </dl>
      <dl class="row">
        <dt class="col-sm-3 text-right">{{ $t("message.perfil.email") }}</dt>
        <dd class="col-sm-9 text-left">{{ userDto.email }}</dd>
      </dl>
      <dl class="row">
        <dt class="col-sm-3 text-right">{{ $t("message.perfil.nombre") }}</dt>
        <dd class="col-sm-9 text-left">{{ userDto.nombre }}</dd>
      </dl>
      <dl class="row">
        <dt class="col-sm-3 text-right">
          {{ $t("message.perfil.apellido1") }}
        </dt>
        <dd class="col-sm-9 text-left">{{ userDto.apellido1 }}</dd>
      </dl>
      <dl class="row">
        <dt class="col-sm-3 text-right">
          {{ $t("message.perfil.apellido2") }}
        </dt>
        <dd class="col-sm-9 text-left">{{ userDto.apellido2 }}</dd>
      </dl>
      <dl class="row">
        <dt class="col-sm-3 text-right">{{ $t("message.perfil.pais") }}</dt>
        <dd class="col-sm-9 text-left">{{ userDto.pais }}</dd>
      </dl>
      <dl class="row">
        <dt class="col-sm-3 text-right">
          {{ $t("message.perfil.nacimiento") }}
        </dt>
        <dd class="col-sm-9 text-left">{{ userDto.nacimiento }}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    usuario: {
      type: String,
    },
  },
  data: function () {
    return {
      userDto: {
        username: "",
        email: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        pais: "",
        nacimiento: "",
      },
      loading: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get("/usuarios/" + this.usuario, {
          headers,
        })
        .then((response) => {
          this.userDto = response.data.data;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$fire({
              title: "No autorizado",
              type: "error",
              showConfirmButton: false,
              timer: 2500,
            }).then(() => {
              this.$router.push("/");
            });
          }
          console.log(err.response);
        });
    },
  },
};
</script>
<style>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
.fa-spinner {
  animation: spinner 1s linear infinite;
}
</style>