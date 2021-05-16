<template>
  <div class="container">
    <b-card
      :img-src="zona ? zona.enlaceImagen : ''"
      img-alt="Card Image"
      title-tag="h1"
      :title="zona ? zona.region : ''"
      :sub-title="zona ? getPais(zona.pais) : ''"
    >
      <b-card-text> {{ zona ? zona.informacion : "" }} </b-card-text
      ><b-button
        v-show="admin"
        v-b-toggle.sidebar-detalle-zona
        size="sm"
        variant="outline-info"
        ><b-icon icon="info-circle" aria-hidden="true"></b-icon
      ></b-button>
    </b-card>
    <h4 class="mt-5">{{ $t("message.zona.listado_escuelas") }}</h4>
    <p v-show="!hayEscuelas">{{ $t("message.zona.sin_escuelas") }}</p>
    <b-button
      class="ml-auto mb-1 mt-1 float-right"
      variant="info"
      @click="nuevaEscuela"
      v-show="!invitado"
      ><b-icon
        icon="plus-circle"
        aria-hidden="true"
        :animation="!hayEscuelas ? 'throb' : 'none'"
      ></b-icon>
      {{ $t("message.zona.anadir_escuela") }}</b-button
    >
    <div v-show="hayEscuelas">
      <TablaEscuela ref="tablaEscuelas" :items="escuelas" />
      <Pagination ref="pagination" :perPage="4" @cambio="fetchDataEscuelas" />
    </div>
    <ModalEscuela ref="modal_escuela" @creada="fetchDataEscuelas" />
    <ModalZona ref="modal_zona" @actualizada="zonaActualizada" />
    <b-sidebar
      v-show="zona != null"
      id="sidebar-detalle-zona"
      ref="sidebar-detalle-zona"
      :title="tituloSidebar"
      backdrop
      shadow
      right
    >
      <b-tabs ref="tabs-sidebar" content-class="mt-3">
        <b-tab :title="$t('message.zona.detalle.zona.ficha')" active>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.zona.detalle.zona.pais") }}
            </legend>
            <p class="innerPara">
              {{ getPais("ES", "es") }}
            </p>
          </fieldset>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.zona.detalle.zona.visible.texto") }}
            </legend>
            <p class="innerPara">
              {{
                $t(
                  "message.zona.detalle.zona.visible." +
                    (zona && zona.visible ? "si" : "no")
                )
              }}
            </p>
          </fieldset>
        </b-tab>
      </b-tabs>
      <template #footer v-if="!invitado">
        <div class="d-flex bg-info text-light align-items-center px-3 py-2">
          <strong class="mr-auto">{{
            $t("message.zona.detalle.zona.editar")
          }}</strong>
          <b-button size="sm" @click="editar" class="mr-1"
            ><b-icon icon="pencil" aria-hidden="true"></b-icon
          ></b-button>
          <b-button class="bg-danger" size="sm" @click="borrar"
            ><b-icon icon="trash" aria-hidden="true"></b-icon
          ></b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>
<script>
import Vue from "vue";
import Pagination from "./pagination/Pagination.vue";
import TablaEscuela from "./tablas/TablaEscuela";
import ModalEscuela from "./modales/ModalEscuela";
import ModalZona from "./modales/ModalZona";
export default {
  components: {
    TablaEscuela,
    Pagination,
    ModalEscuela,
    ModalZona,
  },
  data() {
    return {
      escuelas: [],
      loading: false,
      zona: null,
      hayEscuelas: false,
    };
  },
  props: {
    idZona: {
      type: [Number, String],
    },
  },
  methods: {
    zonaActualizada() {
      this.fetchData();
    },
    editar() {
      this.$refs.modal_zona.mostrar(this.zona);
    },
    borrar() {
      let texto = this.$t("message.modal.zona.borrar.texto", {
        nombre: this.zona.region,
      });
      let titulo = this.$t("message.modal.zona.borrar.titulo");
      this.$bvModal
        .msgBoxConfirm(texto, {
          title: titulo,
          okVariant: "danger",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            const headers = Vue.getHeaders(
              this.$i18n.t("message.idioma.codigo")
            );
            this.$http
              .delete("/zonas/" + this.zona.id, {
                headers,
              })
              .then(() => {
                this.$fire({
                  title: "Borrada!!",
                  type: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.$router.push("/zonas/");
              })
              .catch((error) => {
                console.log(error);
                let titulo = this.$i18n.t(
                  "message.modal.zona.error.borrando.header"
                );
                let texto = this.$i18n.t(
                  "message.modal.zona.error.borrando.texto",
                  {
                    msg: error.response.data.data,
                  }
                );
                this.$fire({
                  title: titulo,
                  text: texto,
                  type: "error",
                  showConfirmButton: true,
                });
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getPais(codigo) {
      return Vue.getPais(codigo, this.$t("message.idioma.codigo"));
    },
    fetchData() {
      this.fetchDataZona();
      this.fetchDataEscuelas();
    },
    fetchDataZona() {
      this.loading = true;
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http.get("/zonas/" + this.idZona, { headers }).then((response) => {
        this.zona = response.data.data;
        this.loading = false;
      });
    },
    fetchDataEscuelas() {
      this.$refs.pagination.loading = true;
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .get(
          "/escuelas?size=" +
            this.$refs.pagination.perPage +
            "&page=" +
            (this.$refs.pagination.page - 1) +
            "&idZona=" +
            this.idZona,
          {
            headers,
          }
        )
        .then((response) => {
          this.hayEscuelas = response.data.data.totalPaginas > 0;
          this.$refs.pagination.lastPage = response.data.data.totalPaginas;
          this.$refs.tablaEscuelas.setItems(response.data.data.contenido);
          this.$refs.pagination.loading = false;
        });
    },

    nuevaEscuela() {
      this.$refs.modal_escuela.mostrar(this.zona.pais, this.zona.id);
    },
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    invitado() {
      return Vue.rolInvitado();
    },
    admin() {
      return Vue.rolAdmin();
    },
    tituloSidebar() {
      return this.zona ? this.zona.region : "";
    },
  },
};
</script>
<style>
</style>
