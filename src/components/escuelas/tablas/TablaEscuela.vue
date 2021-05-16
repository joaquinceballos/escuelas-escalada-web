<template>
  <div>
    <b-table
      v-show="items && items.length > 0"
      hover
      :fields="fields"
      :items="items"
      @row-clicked="detalleEscuela"
    ></b-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "nombre",
          label: this.$i18n.t("message.escuela.tabla.nombre"),
          tdClass: "text-left",
          thClass: "text-left",
        },
        {
          key: "pais",
          label: this.$i18n.t("message.escuela.tabla.pais"),
        },
        {
          key: "nSectores",
          label: this.$i18n.t("message.escuela.tabla.nsectores"),
        },
        {
          key: "nVias",
          label: this.$i18n.t("message.escuela.tabla.nvias"),
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
    };
  },

  methods: {
    detalleEscuela(escuela) {
      this.$router
        .push({
          name: "escuela",
          params: { id: escuela.id },
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTotalVias(escuela) {
      let total = 0;
      for (let i = 0; i < escuela.sectores.length; i++) {
        total += escuela.sectores[i].vias.length;
      }
      return total;
    },

    setItems(items) {
      this.items = items;
      for (let i = 0; i < items.length; i++) {
        this.items[i].nSectores = this.items[i].sectores.length;
        this.items[i].nVias = this.getTotalVias(this.items[i]);
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