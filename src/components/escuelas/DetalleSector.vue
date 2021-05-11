<template>
  <div class="container">
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 class="pb-2">{{ sectorDto.nombre }}</h1>
    <hr />
    <p>{{ sectorDto.informacion }}</p>
    <hr />
    <h2>{{ $t("message.sector.detalle.listado_croquis") }}</h2>
    <carousel
      :key="carouselKey"
      ref="carousel"
      :perPage="1"
      :navigationEnabled="true"
      :autoplay="false"
      :loop="true"
      :autoplayTimeout="5000"
    >
      <slide v-for="c in croquis" :key="c.id">
        <Croquis
          :croquis="c"
          :ref="'slide-croquis-' + c.id"
          :detalle="false"
          @abrir="modalCroquis"
          @borrar="borrarCroquis"
        />
      </slide>
      <slide key="-1" class="d-flex align-items-center" v-if="!invitado">
        <button
          class="addCroquis bg-transparent mx-auto"
          v-b-tooltip.hover
          :title="$t('message.sector.detalle.tooltip_croquis')"
        >
          <b-iconstack font-scale="5" @click="addCroquis">
            <b-icon stacked icon="image" variant="info"></b-icon>
            <b-icon
              stacked
              icon="plus-circle-fill"
              variant="info"
              scale=".5"
              shift-h="-15"
              shift-v="-4"
              :animation="animacionBotonAnadir"
            ></b-icon>
          </b-iconstack>
        </button>
      </slide>
    </carousel>
    <hr />
    <h2>{{ $t("message.sector.detalle.listado_vias") }}</h2>
    <b-button
      class="ml-auto mb-1 mt-1 float-right"
      variant="info"
      @click="nuevaVia"
      v-show="!invitado"
      ><b-icon icon="plus-circle" aria-hidden="true"></b-icon>
      {{ $t("message.sector.detalle.anadir_via") }}</b-button
    >
    <TablaVias
      v-show="sectorDto.vias.length > 0"
      ref="tablaVias"
      :borderless="true"
      :small="true"
      @click="clickEnTablaVias"
    />
    <b-modal
      id="modal-croquis"
      :size="tamanoModal"
      title="sin título, como yo"
      :hideFooter="true"
      :hideHeader="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <Croquis
        :croquis="croquisDetalle"
        :detalle="true"
        @salir="recargarCroquis"
      />
    </b-modal>
    <ModalVia ref="modal_via" @creada="fetchData" />
    <ModalNuevoCroquis ref="modal_nuevo_croquis" @creado="fetchData" />
    <b-sidebar
      id="sidebar-ascensiones"
      ref="sidebar-ascensiones"
      :title="viaClickada.nombre"
      right
      backdrop
      shadow
    >
      <b-tabs
        ref="tabs-sidebar"
        content-class="mt-3"
        v-on:activate-tab="tabActivada"
      >
        <b-tab title="Editar" active>
          <h5>{{ $t("message.sector.detalle.via.longitud") }}</h5>
          <p>{{ viaClickada.longitud }}</p>
          <h5>{{ $t("message.sector.detalle.via.grado") }}</h5>
          <p>{{ viaClickada.grado }}</p>
          <h5>{{ $t("message.sector.detalle.via.numeroChapas") }}</h5>
          <p>{{ viaClickada.numeroChapas }}</p>
          <h5>{{ $t("message.sector.detalle.via.informacion") }}</h5>
          <p>{{ viaClickada.informacion }}</p>
        </b-tab>
        <b-tab :title="$t('message.sector.detalle.ascensiones.titulo')">
          <b-list-group>
            <b-list-group-item
              class="flex-column align-items-start"
              v-for="ascension in ascensiones"
              :key="ascension.id"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ ascension.usuario.nombre }}</h5>
                <small>
                  <time-ago
                    long=true
                    :locale="locale"
                    :datetime="ascension.fecha"
                    tooltip
                  ></time-ago
                ></small>
              </div>
              <p class="mb-1">{{ ascension.comentario }}</p>
              <small>{{ ascension.grado }}</small>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
      </b-tabs>
      <template #footer v-if="!invitado">
        <div class="d-flex bg-info text-light align-items-center px-3 py-2">
          <strong class="mr-auto">{{ textoFooterSidebar }}</strong>
          <b-button size="sm" @click="clickFooterSidebar"
            ><b-icon :icon="iconoFooter" aria-hidden="true"></b-icon
          ></b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template><script>
import Vue from "vue";
import Croquis from "./Croquis";
import { Carousel, Slide } from "vue-carousel";
import TablaVias from "./tablas/TablaVias";
import ModalVia from "./modales/ModalNuevaVia";
import ModalNuevoCroquis from "./modales/ModaNuevoCroquis";
import { TimeAgo } from "vue2-timeago";
import "vue2-timeago/dist/vue2-timeago.css";

export default {
  components: {
    Croquis,
    Carousel,
    Slide,
    TablaVias,
    ModalVia,
    ModalNuevoCroquis,
    TimeAgo,
  },

  computed: {
    locale() {
      return this.$t("message.idioma.codigo");
    },
    ascensiones() {
      return this.ascensionesViaClickada;
    },
    animacionBotonAnadir() {
      // sólo se anima cuando no hay ningún croquis
      return this.croquis && this.croquis.length > 0 ? "none" : "cylon";
    },
    invitado() {
      return Vue.rolInvitado();
    },
  },

  props: {
    idEscuela: {
      type: [Number, String],
    },
    idSector: {
      type: [Number, String],
    },
  },

  mounted() {
    this.fetchData();
  },

  data() {
    return {
      tamanoModal: "xl", //TODO echarle un ojo a vue-mq (mola), tamaño xl para un pantalla de 15 pulgadas en demasiado, además se podría manejar tablets y móbiles...
      croquisDetalle: {},
      croquis: [],
      loading: false,
      sectorDto: {
        id: 0,
        nombre: "",
        latitud: 0,
        longitud: 0,
        vias: [],
      },
      carouselKey: 0,
      ascensionesViaClickada: [],
      viaClickada: {},
      textoFooterSidebar: this.$t("message.sector.detalle.ascensiones.anadir"),
      iconoFooter: "pencil",
    };
  },

  methods: {
    clickFooterSidebar() {
      let tabActiva = this.$refs["tabs-sidebar"].currentTab;
      if (tabActiva == 0) {
        this.actualizarVia();
      } else if (tabActiva == 1) {
        this.anadirAscension();
      } else {
        console.err("Tab activa no esperada: ", tabActiva);
      }
    },
    tabActivada(newTabIndex) {
      if (newTabIndex == 0) {
        this.textoFooterSidebar = this.$t("message.sector.detalle.via.editar");
        this.iconoFooter = "pencil";
      } else if (newTabIndex == 1) {
        this.textoFooterSidebar = this.$t(
          "message.sector.detalle.ascensiones.anadir"
        );
        this.iconoFooter = "plus-circle";
      }
    },
    actualizarVia() {
      console.log("actualizremos la vía...");
    },
    anadirAscension() {
      console.log("añadimos la ascensión...");
    },
    clickEnTablaVias(via) {
      const headers = Vue.getHeaders(
        Vue.getToken(),
        this.$i18n.t("message.idioma.codigo")
      );
      // si el sidebar se está mostrando lo ocultamos
      this.viaClickada = via;
      this.ascensionesViaClickada = [];
      this.$refs["sidebar-ascensiones"].hide();
      this.$root.$emit("bv::toggle::collapse", "sidebar-ascensiones");
      this.$http
        .get(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.idSector +
            "/vias/" +
            via.id +
            "/ascenciones" /* paginación por defecto... */,
          { headers }
        )
        .then((response) => {
          let ascensiones = response.data.data.contenido;
          for (let i = 0; i < ascensiones.length; i++) {
            this.ascensionesViaClickada.push(ascensiones[i]);
          }
        });
    },

    borrarCroquis(croquis) {
      let texto = this.$t("message.modal.croquis.borrar.texto");
      let titulo = this.$t("message.modal.croquis.borrar.titulo");
      this.$bvModal
        .msgBoxConfirm(texto, {
          title: titulo,
          //size: "sm",
          //buttonSize: "sm",
          okVariant: "danger",
          //okTitle: "YES",
          //cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            const headers = Vue.getHeaders(
              Vue.getToken(),
              this.$i18n.t("message.idioma.codigo")
            );
            this.$http
              .delete(
                "/escuelas/" +
                  this.idEscuela +
                  "/sectores/" +
                  this.idSector +
                  "/croquis/" +
                  croquis.id,
                {
                  headers,
                }
              )
              .then(() => {
                this.$fire({
                  title: "Borrado!!",
                  type: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.croquis = this.croquis.filter((c) => c.id != croquis.id);
              })
              .catch((err) => {
                console.log(err.response);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    addCroquis() {
      this.$refs.modal_nuevo_croquis.mostrar(this.idEscuela, this.idSector);
    },

    nuevaVia() {
      this.$refs.modal_via.mostrar(this.idEscuela, this.idSector);
    },

    recargarCroquis(croquis) {
      this.$refs["slide-croquis-" + croquis.id][0].setDataCroquis(croquis);
      this.$bvModal.hide("modal-croquis");
      // se pueden haber creado nuevas vías
      // no vamos a llamar al api para esto, las cogemos
      // del mismo croquis actualizado que retornó el modal
      this.sectorDto.vias = croquis.sector.vias;
      this.$refs.tablaVias.setItems(this.sectorDto.vias);
    },

    fetchData() {
      this.loading = true;
      const headers = Vue.getHeaders(
        Vue.getToken(),
        this.$i18n.t("message.idioma.codigo")
      );
      this.$http
        .get("/escuelas/" + this.idEscuela + "/sectores/" + this.idSector, {
          headers,
        })
        .then((response) => {
          this.sectorDto = response.data.data;
          // cargamos los croquis
          this.cargaCroquis();
          this.loading = false;
          this.$refs.tablaVias.setItems(this.sectorDto.vias);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$fire({
              title: "No autorizado",
              type: "error",
              showConfirmButton: false,
              timer: 2500,
            }).then(() => {
              this.$router.push("/");
            });
          }
          console.log(err.response);
        });
    },

    cargaCroquis() {
      const headers = Vue.getHeaders(
        Vue.getToken(),
        this.$i18n.t("message.idioma.codigo")
      );
      this.$http
        .get(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.idSector +
            "/croquis/",
          { headers }
        )
        .then((response) => {
          let ordenados = response.data.data;
          ordenados.sort((a, b) => -(a.id - b.id));
          this.croquis = ordenados;
          if (this.croquis && this.croquis.length > 0) {
            this.$refs.carousel.goToPage(this.croquis[0].id);
          }
          this.carouselKey += 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    modalCroquis(croquis) {
      this.croquisDetalle = croquis;
      this.$bvModal.show("modal-croquis");
    },

    navegaCroquis(croquis) {
      this.$router
        .push({
          name: "croquis",
          params: {
            idEscuela: croquis.sector.escuela.id,
            idSector: croquis.sector.id,
            idCroquis: croquis.id,
            croquis: croquis,
          },
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style>
/* max-width: fit-content, max-width: -moz-fit-content */
#modal-croquis > div {
  max-height: fit-content;
}
#modal-croquis___BV_modal_body_ {
  padding: 0px;
}
.addCroquis :hover {
  cursor: pointer;
}
</style>