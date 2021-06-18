<template>
  <div>
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>

    <div class="my-4">
      <b-row>
        <b-col
          ><ul
            class="pagination pagination-md justify-content-center text-center mb-0"
          >
            <li class="page-item" :class="page === 1 ? 'disabled' : ''">
              <a class="page-link" @click="prevPage">
                <b-icon icon="arrow-left-short" aria-hidden="true"></b-icon>
                {{ $t("message.paginacion.previo") }}
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
                {{ $t("message.paginacion.siguiente") }}
                <b-icon icon="arrow-right-short" aria-hidden="true"></b-icon>
              </a>
            </li>
          </ul></b-col
        >
      </b-row>
      <b-row class="mt-2">
        <b-form inline class="m-auto">
          <b-form-group
            v-bind:label="$t('message.paginacion.filas')"
            v-slot="{ ariaDescribedby }"
            label-for="select-filas"
            label-align="right"
          >
            <b-form-select
              id="select-filas"
              class="ml-1"
              v-model="perPage"
              :options="opciones"
              :aria-describedby="ariaDescribedby"
              @change="cambio" /></b-form-group></b-form
      ></b-row>
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