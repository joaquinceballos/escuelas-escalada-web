<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">País</th>
        <th scope="col">Sectores</th>
        <th scope="col">Vías</th>
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
</template>
<script>
export default {
  name: "DataTableEscuelas",

  props: {
    escuelas: Array,
  },

  methods: {
    getTotalVias(escuela) {
      let total = 0;
      for (let i = 0; i < escuela.sectores.length; i++) {
        total += escuela.sectores[i].vias.length;
      }
      return total;
    },
  },
};
</script>
<style scoped>
</style>