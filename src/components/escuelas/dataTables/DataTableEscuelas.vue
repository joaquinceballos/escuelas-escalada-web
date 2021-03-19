<template>
  <div id="datatable-escuelas" class="container">
    <h1 class="pb-2">{{ $t("message.resultados.escuelas.titulo") }}</h1>
    <div class="border border-black rounded">
      <b-table
        hover
        :fields="fields"
        :items="items"
        @row-clicked="detalleEscuela"
      ></b-table>
      <div v-if="loading" class="justify-content-center">
        <icons :icon="['fas', 'spinner']" class="fa-spinner" />
      </div>
      <div class="my-4">
        <ul class="pagination pagination-md justify-content-center text-center">
          <li class="page-item" :class="page === 1 ? 'disabled' : ''">
            <a class="page-link" @click="prevPage">
              {{ $t("message.paginacion.previo") }}
            </a>
          </li>
          <li class="page-link" style="background-color: inherit">
            {{ page }} {{ $t("message.paginacion.de") }} {{ lastPage }}
          </li>
          <li class="page-item" :class="page === lastPage ? 'disabled' : ''">
            <a class="page-link" @click="nextPage">
              {{ $t("message.paginacion.siguiente") }}
            </a>
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
      fields: [
        {
          key: "nombre",
          label: this.$i18n.t('message.escuela.tabla.nombre'),
        },
        {
          key: "pais",
          label: this.$i18n.t("message.escuela.tabla.pais"),
        },
        {
          key: "nSectores",
          label: this.$i18n.t("message.escuela.tabla.nsectores"),
        },
        {
          key: "nVias",
          label: this.$i18n.t("message.escuela.tabla.nvias"),
        },
      ],
      items: [],
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
          let escuelas = response.data.data.contenido;
          this.items = response.data.data.contenido;
          for (let i = 0; i < escuelas.length; i++) {
            this.items[i].nSectores = this.items[i].sectores.length;
            this.items[i].nVias = this.getTotalVias(escuelas[i]);
          }
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

    detalleEscuela(escuela) {
      this.$router
        .push({
          name: "escuela",
          params: { id: escuela.id },
        })
        .catch((error) => {
          console.log(error);
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