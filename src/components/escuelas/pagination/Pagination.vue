<template>
  <div>
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>

    <div class="my-4">
      <b-row>
        <b-col
          ><ul
            class="pagination pagination-md justify-content-center text-center"
          >
            <li class="page-item" :class="page === 1 ? 'disabled' : ''">
              <a class="page-link" @click="prevPage">
                <b-icon icon="arrow-left-short" aria-hidden="true"></b-icon>
              </a>
            </li>
            <li class="page-link" style="background-color: inherit">
              {{ page }} {{ $t("message.paginacion.de") }} {{ lastPage }}
            </li>
            <li
              class="page-item"
              :class="page === lastPage || lastPage === 0 ? 'disabled' : ''"
            >
              <a class="page-link" @click="nextPage">
                <b-icon icon="arrow-right-short" aria-hidden="true"></b-icon>
              </a>
            </li>
            <li>
              <b-form-row>
                <b-col cols="8"
                  ><label for="select-filas">{{
                    $t("message.paginacion.filas")
                  }}</label></b-col
                >
                <b-col>
                  <b-form-select
                    id="select-filas"
                    v-model="perPage"
                    :options="opciones"
                    @change="cambio"
                /></b-col>
              </b-form-row>
            </li></ul
        ></b-col>
      </b-row>
    </div>
  </div>
</template><script>
export default {
  data() {
    return {
      loading: false,
      page: 1,
      lastPage: 1,
      perPage: 10,
      opciones: [5, 10, 30, 50],
    };
  },

  methods: {
    cambio() {
      this.$emit("cambio");
    },
    prevPage() {
      this.loading = true;
      this.page--;
      this.cambio();
    },

    nextPage() {
      this.loading = true;
      this.page++;
      this.cambio();
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