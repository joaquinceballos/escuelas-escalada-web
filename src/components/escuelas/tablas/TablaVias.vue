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
          tdClass: "text-left",
          thClass: "text-left",
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
          tdClass: "text-right",
          thClass: "text-right",
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
<style>
.b-table > tbody > tr {
  cursor: pointer;
}
</style>