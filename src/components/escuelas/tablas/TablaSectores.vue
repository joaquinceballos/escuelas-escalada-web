<template>
  <b-table
    hover
    :fields="fields"
    :items="items"
    @row-clicked="detalleSector"
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
          label: this.$i18n.t("message.sector.tabla.nombre"),
        },
        {
          key: "escuela.nombre",
          label: this.$i18n.t("message.sector.tabla.escuela"),
        },
        {
          key: "nVias",
          label: this.$i18n.t("message.sector.tabla.nvias"),
        }
      ],
    };
  },

  methods: {
    detalleSector(sector) {
      console.log('detalle del sector: ', sector);
    },

    setItems(items) {
      this.items = items;
      for (let i = 0; i < items.length; i++) {
        this.items[i].nVias = this.items[i].vias.length;
      }
    },
  },
};
</script>
<style></style>