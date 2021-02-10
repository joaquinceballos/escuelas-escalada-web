<template>
  <div class="container">
    <b-card
      bg-variant="dark"
      header="Bienvenido a Escuelas de escalada"
      text-variant="white"
      class="text-center"
    >
      <b-card-text>Crea tu cuenta</b-card-text>
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
          <form
            class="text-center border border-primary p-5"
            style="
              margin-top: 70px;
              height: auto;
              padding-top: 100px !important;
            "
            @submit.prevent="registerUser"
          >
            <input
              type="text"
              id="nombre"
              class="form-control mb-5"
              placeholder="Nombre"
              v-model="register.nombre"
              required
            />
            <input
              type="email"
              id="email"
              class="form-control mb-5"
              placeholder="Email"
              v-model="register.email"
              required
            />
            <input
              type="password"
              id="password"
              class="form-control mb-5"
              placeholder="Contraseña"
              v-model="register.password"
            />
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Registrar
              </button>
            </center>
            <p>
              ¿Ya tienes cuenta? Click
              <router-link to="/login">aquí</router-link> para entrar
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
      register: {
        nombre: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post("/usuarios", this.register);
        if (response) {
          this.$router.push("/login");
        } else {
          console.log("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        alert(err.response.data.data.error);
        this.register.nombre = "";
        this.register.email = "";
        this.register.password = "";
      }
    },
  },
};
</script>
