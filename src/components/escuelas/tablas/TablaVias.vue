<template>
  <b-table
    hover
    :fields="fields"
    :items="items"
    @row-clicked="detalleVia"
  ></b-table>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "nombre",
          label: this.$i18n.t("message.via.tabla.nombre"),
        },
        {
          key: "sector.escuela.nombre",
          label: this.$i18n.t("message.via.tabla.escuela"),
        },
        {
          key: "grado",
          label: this.$i18n.t("message.via.tabla.grado"),
        },
        {
          key: "longitud",
          label: this.$i18n.t("message.via.tabla.longitud"),
        }
      ],
    };
  },

  methods: {
    detalleVia(via) {
      console.log('detalle de la vía: ', via);
    },

    setItems(items) {
      this.items = items;
    },
  },
};
</script>
<style></style>