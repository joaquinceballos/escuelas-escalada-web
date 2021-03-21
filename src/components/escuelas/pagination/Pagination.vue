<template>
  <div>
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
</template><script>
export default {
  data() {
    return {
      loading: false,
      page: 1,
      lastPage: 1,
    };
  },

  methods: {
    prevPage() {
      this.loading = true;
      this.page--;
      this.$emit("cambio");
    },

    nextPage() {
      this.loading = true;
      this.page++;
      this.$emit("cambio");
    },
  },

  props: {
    perPage: {
      type: Number,
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