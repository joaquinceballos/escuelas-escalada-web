<template>
  <div class="container">
    <b-card
      v-bind:header="$t('message.register.header')"
      class="text-center"
      align="center"
    >
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
          <form class="text-center p-5" @submit.prevent="registerUser">
            <input
              type="text"
              id="username"
              class="form-control mb-5"
              v-bind:placeholder="$t('message.register.username')"
              v-model="register.username"
              required
            />
            <input
              type="text"
              id="nombre"
              class="form-control mb-5"
              v-bind:placeholder="$t('message.register.nombre')"
              v-model="register.nombre"
              required
            />
            <input
              type="text"
              id="apellido1"
              class="form-control mb-5"
              v-bind:placeholder="$t('message.register.apellido1')"
              v-model="register.apellido1"
              required
            />
            <input
              type="text"
              id="apellido2"
              class="form-control mb-5"
              v-bind:placeholder="$t('message.register.apellido2')"
              v-model="register.apellido2"
              required
            />
            <input
              type="email"
              id="email"
              class="form-control mb-5"
              v-bind:placeholder="$t('message.register.email')"
              v-model="register.email"
              required
            />
            <input
              type="password"
              id="password"
              class="form-control mb-5"
              v-bind:placeholder="$t('message.register.password')"
              v-model="register.password"
            />
            <center>
              <button class="btn btn-primary btn-block my-4" type="submit">
                {{ $t("message.register.submit") }}
              </button>
            </center>
            <router-link to="/login">{{
              $t("message.register.login")
            }}</router-link>
          </form>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      register: {
        nombre: "",
        email: "",
        password: "",
        apellido1: "",
        apellido2: "",
        username: "",
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post("/usuarios", this.register);
        if (response) {
          let titulo = this.$i18n.t("message.modal.registrado.titulo");
          let texto = this.$i18n.t("message.modal.registrado.texto");
          this.$router.push("/login");
          this.$fire({
            title: titulo,
            text: texto,
            type: "success",
            showConfirmButton: false,
            timer: 2500,
          }).then((r) => {
            console.log(r.value);
          });
        } else {
          console.log("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        let msgError = this.$i18n.t("message.modal.error");
        this.$fire({
          title: msgError,
          text: err.response.data.data.error,
          type: "error",
          timer: 5000,
        }).then((r) => {
          console.log(r.value);
        });
        this.register.nombre = "";
        this.register.email = "";
        this.register.password = "";
      }
    },
  },
};
</script>
