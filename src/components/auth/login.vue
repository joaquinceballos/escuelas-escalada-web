<template>
    <div class="container">
      <b-card
        header="Escuelas de Escalada - Identifícate"
        class="text-center"
        align="center"
      >
        <div class="row">
          <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
            <form
              class="text-center p-5"
              style="height: auto"
              @submit.prevent="loginUser"
            >
              <input
                type="text"
                id="email"
                class="form-control mb-5"
                placeholder="Email"
                v-model="login.email"
              />
              <!-- Password -->
              <input
                type="password"
                id="password"
                class="form-control mb-5"
                placeholder="Contraseña"
                v-model="login.password"
              />
              <center>
                <button class="btn btn-primary btn-block my-4" type="submit">
                  Entra
                </button>
              </center>
              <p>
                ¿No tienes cuenta? Click
                <router-link to="/register"> aquí </router-link> para
                registrarte
              </p>
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
      login: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/login", this.login);
        let token = response.data.data.token;
        localStorage.setItem("user", token);
        this.$router.push("/me");
      } catch (err) {
        this.$alert(err.response.data.data.error);
        this.login.email = "";
        this.login.password = "";
      }
    },
  },
};
</script>
