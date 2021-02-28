<template>
  <div id="home" class="container">
    <h1 class="pb-2">Listado provisional de escuelas</h1>
    <DataTableEscuelas :escuelas="escuelas" />
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <div class="my-4">
      <!-- Pagination -->
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
    <!--./Pagination -->
  </div>
</template>

<script>
import DataTableEscuelas from "./DataTableEscuelas";
import Vue from "vue";

export default {
  components: {
    DataTableEscuelas,
  },

  data() {
    return {
      escuelas: [],
      page: 1,
      loading: false,
      lastPage: 1,
      perPage: 20,
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
        .get("/escuelas?size=2&page=" + (this.page - 1), {
          headers,
        })
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    nextPage() {
      this.loading = true;
      this.page++;
      this.fetchData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style>
a:hover {
  cursor: pointer;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
.fa-spinner {
  animation: spinner 1s linear infinite;
}
</style>