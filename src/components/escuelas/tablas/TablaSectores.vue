<template>
  <b-table
    hover
    :fields="fields"
    :items="items"
    :borderless="borderless"
    :small="small"
    @row-clicked="detalleSector"
  ></b-table>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      fields: [],
    };
  },

  props: {
    columnaEscuela: {
      type: Boolean,
    },
    borderless: {
      type: Boolean,
    },
    small: {
      type: Boolean,
    },
  },

  mounted() {
    this.fields = [
      {
        key: "nombre",
        label: this.$i18n.t("message.sector.tabla.nombre"),
        tdClass: "text-left",
        thClass: "text-left",
      },
      {
        key: "nVias",
        label: this.$i18n.t("message.sector.tabla.nvias"),
      },
    ];
    if (this.columnaEscuela) {
      this.fields.push({
        key: "escuela.nombre",
        visible: false,
        label: this.$i18n.t("message.sector.tabla.escuela"),
      });
    }
    // alineo la última columna a la derecha
    this.fields[this.fields.length - 1].tdClass = "text-right";
    this.fields[this.fields.length - 1].thClass = "text-right";
  },

  methods: {
    detalleSector(sector) {
      this.$router
        .push({
          name: "sector",
          params: { idEscuela: sector.escuela.id, idSector: sector.id },
        })
        .catch((error) => {
          console.log(error);
        });
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
<style>
.b-table > tbody > tr {
  cursor: pointer;
}
</style>