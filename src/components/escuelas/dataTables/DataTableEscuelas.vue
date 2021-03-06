<template>
  <div id="datatable-escuelas" class="container">
    <h1 class="pb-2">Escuelas</h1>
    <div class="border border-black rounded">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">País</th>
            <th scope="col">#Sectores</th>
            <th scope="col">#Vías</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="escuela in escuelas" :key="escuela.id">
            <td>
              {{ escuela.nombre }}
            </td>
            <td>
              {{ escuela.paisIso }}
            </td>
            <td>
              {{ escuela.sectores.length }}
            </td>
            <td>
              {{ getTotalVias(escuela) }}
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
      escuelas: [],
      loading: false,
      page: 1,
      lastPage: 1,
      perPage: 3,
      texto: "",
    };
  },

  methods: {
    getTotalVias(escuela) {
      let total = 0;
      for (let i = 0; i < escuela.sectores.length; i++) {
        total += escuela.sectores[i].vias.length;
      }
      return total;
    },

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
          "/buscador/escuelas?size=" +
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
          this.escuelas = response.data.data.contenido;
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