<template>
  <div class="container">
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 class="pb-2">
      {{ sectorDto.nombre }}
      <b-button
        v-b-toggle.sidebar-detalle-sector
        size="sm"
        variant="outline-info"
        ><b-icon icon="info-circle" aria-hidden="true"></b-icon
      ></b-button>
    </h1>
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
      @click="cargaSideBarVia"
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
    <ModalVia ref="modal_via" @creada="fetchData" @actualizada="actualizada" />
    <ModalNuevoCroquis ref="modal_nuevo_croquis" @creado="fetchData" />
    <ModalAscension ref="modal-ascension" @registrada="ascensionRegistrada" />
    <ModalSector ref="modal_sector" @actualizado="sectorActualizado" />
    <b-sidebar
      id="sidebar-detalle-sector"
      ref="sidebar-detalle-sector"
      :title="sectorDto.nombre"
      backdrop
      shadow
      right
    >
      <b-tabs
        ref="tabs-sidebar"
        content-class="mt-3"
        v-on:activate-tab="tabSectorActivada"
      >
        <b-tab :title="$t('message.sector.detalle.sector.ficha')" active>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.sector.detalle.sector.escuela") }}
            </legend>
            <p class="innerPara">
              {{ sectorDto.escuela ? sectorDto.escuela.nombre : "xxx" }}
            </p>
          </fieldset>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.sector.detalle.sector.horas_de_sol.titulo") }}
            </legend>
            <p class="innerPara">
              {{ $t("message.sector.detalle.sector.horas_de_sol.texto") }}
            </p>
            <dl v-show="sectorDto.horasDeSol">
              <dt>
                {{ $t("message.sector.detalle.sector.horas_de_sol.inicio") }}
              </dt>
              <dd>
                {{ sectorDto.horasDeSol ? sectorDto.horasDeSol.inicio : "" }}
              </dd>
              <dt>
                {{ $t("message.sector.detalle.sector.horas_de_sol.fin") }}
              </dt>
              <dd>
                {{ sectorDto.horasDeSol ? sectorDto.horasDeSol.fin : "" }}
              </dd>
            </dl>
            <small
              class="text-muted innerPara"
              v-show="sectorDto.horasDeSol == null"
              >{{
                $t("message.sector.detalle.sector.horas_de_sol.sin_info")
              }}</small
            >
          </fieldset>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.sector.detalle.sector.numero_vias") }}
            </legend>
            <p class="innerPara">{{ sectorDto.vias.length }}</p>
          </fieldset>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.sector.detalle.sector.ubicacion") }}
            </legend>
            <dl>
              <dt>
                {{ $t("message.sector.detalle.sector.latitud") }}
              </dt>
              <dd>{{ sectorDto.latitud }}</dd>
              <dt>
                {{ $t("message.sector.detalle.sector.longitud") }}
              </dt>
              <dd>{{ sectorDto.longitud }}</dd>
            </dl>
          </fieldset>
        </b-tab>
      </b-tabs>
      <template #footer v-if="!invitado">
        <div class="d-flex bg-info text-light align-items-center px-3 py-2">
          <strong class="mr-auto">{{
            $t("message.sector.detalle.sector.editar")
          }}</strong>
          <b-button size="sm" @click="actualizarSector" class="mr-1"
            ><b-icon icon="pencil" aria-hidden="true"></b-icon
          ></b-button>
          <b-button class="bg-danger" size="sm" @click="borrarSector"
            ><b-icon icon="trash" aria-hidden="true"></b-icon
          ></b-button>
        </div>
      </template>
    </b-sidebar>
    <b-sidebar
      id="sidebar-vias"
      ref="sidebar-vias"
      :title="viaClickada ? viaClickada.nombre : 'xx'"
      right
      backdrop
      shadow
    >
      <b-tabs
        ref="tabs-sidebar"
        content-class="mt-3"
        v-on:activate-tab="tabViaActivada"
        v-if="viaClickada"
      >
        <b-tab :title="$t('message.sector.detalle.via.ficha')" active>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.sector.detalle.via.longitud") }}
            </legend>
            <p class="innerPara">
              {{
                viaClickada.longitud
                  ? viaClickada.longitud +
                    " " +
                    $t("message.sector.detalle.via.metros")
                  : ""
              }}
            </p>
          </fieldset>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.sector.detalle.via.grado") }}
            </legend>
            <p class="innerPara">{{ viaClickada.grado }}</p>
          </fieldset>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.sector.detalle.via.numeroChapas") }}
            </legend>
            <p class="innerPara">{{ viaClickada.numeroChapas }}</p>
          </fieldset>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.sector.detalle.via.informacion") }}
            </legend>
            <p class="innerPara">{{ viaClickada.informacion }}</p>
          </fieldset>
        </b-tab>
        <b-tab> </b-tab>
        <b-tab :title="$t('message.sector.detalle.ascensiones.titulo')">
          <b-list-group>
            <b-list-group-item
              class="flex-column align-items-start"
              v-for="ascension in ascensiones"
              :key="ascension.id"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ ascension.usuario.nombre }}</h5>
                <small>{{ ascension.fecha }}</small>
              </div>
              <p class="mb-1">{{ ascension.comentario }}</p>
              <small>{{ ascension.grado }}</small>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
      </b-tabs>
      <template #footer v-if="!invitado">
        <div class="d-flex bg-info text-light align-items-center px-3 py-2">
          <strong class="mr-auto">{{
            tabViaActiva == 0
              ? $t("message.sector.detalle.via.editar")
              : $t("message.sector.detalle.ascensiones.anadir")
          }}</strong>
          <b-button
            size="sm"
            @click="actualizarVia"
            v-show="tabViaActiva == 0"
            class="mr-1"
            ><b-icon icon="pencil" aria-hidden="true"></b-icon
          ></b-button>
          <b-button
            class="bg-danger"
            size="sm"
            @click="borrarVia"
            v-show="tabViaActiva == 0"
            ><b-icon icon="trash" aria-hidden="true"></b-icon
          ></b-button>
          <b-button
            size="sm"
            @click="anadirAscension"
            v-show="tabViaActiva == 1"
            ><b-icon icon="plus-circle" aria-hidden="true"></b-icon
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
import ModalVia from "./modales/ModalVia";
import ModalNuevoCroquis from "./modales/ModaNuevoCroquis";
import ModalAscension from "./modales/ModalAscension";
import ModalSector from "./modales/ModalSector";

export default {
  components: {
    Croquis,
    Carousel,
    Slide,
    TablaVias,
    ModalVia,
    ModalNuevoCroquis,
    ModalAscension,
    ModalSector,
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
        escuela: {
          nombre: "",
        },
      },
      carouselKey: 0,
      ascensionesViaClickada: [],
      viaClickada: {},
      tabViaActiva: 0,
      tabSectorActiva: 0,
    };
  },

  methods: {
    sectorActualizado() {
      this.fetchData();
    },
    actualizarSector() {
      this.$refs.modal_sector.mostrar(this.idEscuela, this.sectorDto);
    },
    borrarSector() {
      let texto = this.$t("message.modal.sector.borrar.texto", {
        nombre: this.sectorDto.nombre,
      });
      let titulo = this.$t("message.modal.sector.borrar.titulo");
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
              .delete(
                "/escuelas/" + this.idEscuela + "/sectores/" + this.idSector,
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
                this.$router.push("/escuelas/" + this.idEscuela);
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
    tabSectorActivada(newTabIndex) {
      this.tabSectorActiva = newTabIndex;
    },
    borrarVia() {
      let texto = this.$t("message.modal.via.borrar.texto", {
        nombre: this.viaClickada.nombre,
      });
      let titulo = this.$t("message.modal.via.borrar.titulo");
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
              .delete(
                "/escuelas/" +
                  this.idEscuela +
                  "/sectores/" +
                  this.idSector +
                  "/vias/" +
                  this.viaClickada.id,
                {
                  headers,
                }
              )
              .then(() => {
                this.$fire({
                  title: "Borrada!!",
                  type: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.viaClickada = null;
                this.fetchData();
                this.$refs["sidebar-vias"].hide();
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
    actualizada(via) {
      this.viaClikada = via;
      this.cargaSideBarVia(via);
      this.fetchData();
    },
    ascensionRegistrada() {
      this.cargaSideBarVia(this.viaClickada);
    },
    tabViaActivada(newTabIndex) {
      this.tabViaActiva = newTabIndex;
    },
    actualizarVia() {
      this.$refs.modal_via.mostrar(
        this.idEscuela,
        this.idSector,
        this.viaClickada
      );
    },
    anadirAscension() {
      this.$refs["modal-ascension"].mostrar(this.viaClickada.id);
    },
    cargaSideBarVia(via) {
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      // si el sidebar se está mostrando lo ocultamos
      this.viaClickada = via;
      this.ascensionesViaClickada = [];
      this.$refs["sidebar-vias"].hide();
      this.$root.$emit("bv::toggle::collapse", "sidebar-vias");
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
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
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
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
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
fieldset {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.innerPara {
  padding: 20px;
}
legend {
  width: 200px !important;
  padding: 10px 20px !important;
}
</style>