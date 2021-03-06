<template>
  <div id="datatable-sectores" class="container">
    <h1 class="pb-2">Sectores</h1>
    <div class="border border-black rounded">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Escuela</th>
            <th scope="col">#Vías</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sector in sectores" :key="sector.id">
            <td>
              {{ sector.nombre }}
            </td>
            <td>
              {{ sector.escuela.nombre }}
            </td>
            <td>
              {{ sector.vias.length }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="justify-content-center">
        <icons :icon="['fas', 'spinner']" class="fa-spinner" />
      </div>
      <div class="my-4">
        <ul class="pagination pagination-md justify-content-center text-center">
          <li class="page-item" :class="page === 1 ? 'disabled' : ''">
            <a class="page-link" @click="prevPage"> Previous </a>
          </li>
          <li class="page-link" style="background-color: inherit">
            {{ page }} of {{ lastPage }}
          </li>
          <li class="page-item" :class="page === lastPage ? 'disabled' : ''">
            <a class="page-link" @click="nextPage"> Next </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "DataTableEscuelas",

  data() {
    return {
      sectores: [],
      loading: false,
      page: 1,
      lastPage: 1,
      perPage: 3,
      texto: "",
    };
  },

  methods: {
    refrescar(texto) {
      this.page = 1;
      this.lastPage = 1;
      this.texto = texto;
      this.fetchData();
    },

    fetchData() {
      this.loading = true;
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get(
          "/buscador/sectores?size=" +
            this.perPage +
            "&page=" +
            (this.page - 1) +
            "&texto=" +
            this.texto,
          {
            headers,
          }
        )
        .then((response) => {
          this.lastPage = response.data.data.totalPaginas;
          this.sectores = response.data.data.contenido;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            Vue.borraToken();
            this.$router.push("/login");
          }
          console.log(err.response);
        });
    },

    prevPage() {
      this.loading = true;
      this.page--;
      this.fetchData();
    },

    nextPage() {
      this.loading = true;
      this.page++;
      this.fetchData();
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