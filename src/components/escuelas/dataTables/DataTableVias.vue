<template>
  <div id="datatable-vias" class="container">
    <h1 class="pb-2">Vías</h1>
    <div class="border border-black rounded">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Escuela</th>
            <th scope="col">Grado</th>
            <th scope="col">Longitud</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="via in vias" :key="via.id">
            <td>
              {{ via.nombre }}
            </td>
            <td>
              {{ via.sector.escuela.nombre }}
            </td>
            <td>
              {{ via.grado }}
            </td>
            <td>{{ via.longitud }} m</td>
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
      vias: [],
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
          "/buscador/vias?size=" +
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
          this.vias = response.data.data.contenido;
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