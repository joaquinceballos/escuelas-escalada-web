<template>
  <b-table
    hover
    :fields="fields"
    :items="items"
    @row-clicked="listadoEscuelas"
  ></b-table>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "region",
          label: this.$i18n.t("message.zona.tabla.region"),
          tdClass: "text-left",
          thClass: "text-left",
        },
        {
          key: "pais",
          label: this.$i18n.t("message.zona.tabla.pais"),
        },
        {
          key: "numeroEscuelas",
          label: this.$i18n.t("message.zona.tabla.nescuelas"),
        },
        {
          key: "numeroVias",
          label: this.$i18n.t("message.zona.tabla.nvias"),
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
    };
  },

  methods: {
    listadoEscuelas(zona) {
      console.log(
        "aquí iremos al listado de escuelas pasando la zona: " + JSON.stringify(zona)
      );
      /*this.$router
        .push({
          name: "escuela",
          params: { id: escuela.id },
        })
        .catch((error) => {
          console.log(error);
        });*/
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