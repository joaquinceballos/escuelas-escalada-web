<template>
  <b-table
    hover
    :fields="fields"
    :items="items"
    @row-clicked="clickEnFila"
  ></b-table>
</template>
<script>
export default {
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

  data() {
    return {
      items: [],
      fields: [],
    };
  },

  methods: {

    clickEnFila(via) {
      console.log("click en fila", via);
    },

    setItems(items) {
      this.items = items;
    },
    
  },

  mounted() {
    this.fields = [
      {
        key: "nombre",
        label: this.$i18n.t("message.via.tabla.nombre"),
        tdClass: "text-left",
        thClass: "text-left",
      },
      {
        key: "grado",
        label: this.$i18n.t("message.via.tabla.grado"),
      },
      {
        key: "longitud",
        label: this.$i18n.t("message.via.tabla.longitud")
      },
      {
        key: "numeroChapas",
        label: this.$i18n.t("message.via.tabla.numero_chapas")
      },
    ];
    if (this.columnaEscuela) {
      this.fields.push({
        key: "sector.escuela.nombre",
        visible: false,
        label: this.$i18n.t("message.via.tabla.escuela"),
      });
    }
    // alineo la última columna a la derecha
    this.fields[this.fields.length - 1].tdClass = "text-right";
    this.fields[this.fields.length - 1].thClass = "text-right";
  },
};
</script>
<style>
.b-table > tbody > tr {
  cursor: pointer;
}
</style>