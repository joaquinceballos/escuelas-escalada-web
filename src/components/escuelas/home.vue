<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      @page-click="rellenaPagina"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table ref="table" id="my-table" :items="items" small></b-table>
  </div>
</template>

<script>
export default {
  data() {
    this.rellenaPagina();
    return {
      rows: 1,
      perPage: 1,
      currentPage: 1,
      items: [],
    };
  },
  methods: {
    async rellenaPagina(evento) {
      let pag = 0;
      if (evento && evento.target && evento.target.textContent) {
         pag = parseInt(evento.target.textContent) - 1;
      }
      let token = localStorage.getItem("user");
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get("/escuelas?size=2&page=" + pag, {
          headers,
        })
        .then((response) => {
          this.items = response.data.data.contenido;
          this.perPage = response.data.data.size;
          this.rows = response.data.data.totalPaginas * this.perPage;
          this.$root.$emit("bv::refresh::table", "my-table");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>