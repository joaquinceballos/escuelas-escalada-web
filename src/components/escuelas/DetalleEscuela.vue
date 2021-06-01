<template>
  <div id="detalle-escuela" class="container">
    <b-breadcrumb :items="items" class="bg-white"></b-breadcrumb>
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 class="pb-2">
      {{ escuelaDto.nombre }}
      <b-button
        v-b-toggle.sidebar-detalle-escuela
        size="sm"
        variant="outline-info"
        ><b-icon icon="info-circle" aria-hidden="true"></b-icon
      ></b-button>
    </h1>
    <hr />
    <p>{{ escuelaDto.informacion }}</p>
    <hr />
    <div v-if="escuelaDto.cierresTemporada.length > 0">
      <b-card
        :title="$t('message.escuela.detalle.cierresTemporada.titulo')"
        tag="article"
        bg-variant="info"
        class="mb-2 text-light"
      >
        <b-card-text class="text-light"
          ><icons
            :icon="['fas', 'exclamation-circle']"
            class="fa-exclamation-circle"
          />
          {{ $t("message.escuela.detalle.cierresTemporada.texto") }}
        </b-card-text>
        <b-button v-b-toggle.collapse-1 variant="info">
          <icons :icon="['fas', 'chevron-down']" class="fa-chevron-down" />
        </b-button>
      </b-card>
      <b-collapse id="collapse-1" class="mt-2">
        <Calendar
          :language="$t('message.idioma.codigo')"
          :data-source="cierres"
          render-style="background"
          @mouse-on-day="muestraCierre"
        />
      </b-collapse>
      <hr />
    </div>
    <div
      class="my-4"
      style="height: 40vh"
      v-if="marcadores && marcadores.length > 0"
    >
      <gmaps-map ref="mapaSectores" :options="mapOptions">
        <gmaps-marker
          v-for="(item, i) in marcadores"
          :key="i"
          :options="item.options"
        />
      </gmaps-map>
    </div>
    <h2>{{ $t("message.escuela.detalle.sectores") }}</h2>
    <p v-show="escuelaDto.sectores.length == 0">
      {{ $t("message.escuela.detalle.sin_sectores") }}
    </p>
    <b-button
      class="ml-auto mb-1 mt-1 float-right"
      variant="info"
      @click="nuevoSector"
      v-show="!invitado"
      ><b-icon
        icon="plus-circle"
        aria-hidden="true"
        :animation="escuelaDto.sectores.length == 0 ? 'throb' : 'none'"
      ></b-icon>
      {{ $t("message.escuela.detalle.anadir_sector") }}</b-button
    >
    <TablaSectores
      v-show="escuelaDto.sectores.length > 0"
      ref="tablaSectores"
      :borderless="true"
      :small="true"
    />
    <ModalSector ref="modal_sector" @creado="fetchData" />
    <ModalEscuela ref="modal_escuela" @actualizada="escuelaAtualizada" />
    <ModalCierre ref="modal_cierre" @grabado="cierreGrabado" />
    <b-sidebar
      id="sidebar-detalle-escuela"
      ref="sidebar-detalle-escuela"
      :title="escuelaDto.nombre"
      backdrop
      shadow
      right
    >
      <b-tabs
        ref="tabs-sidebar"
        content-class="mt-3"
        v-on:activate-tab="tabActivada"
      >
        <b-tab :title="$t('message.escuela.detalle.escuela.ficha')" active>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.escuela.detalle.escuela.zona") }}
            </legend>
            <p class="innerPara">
              {{ escuelaDto.zona ? escuelaDto.zona.region : "xxx" }}
            </p>
          </fieldset>
          <fieldset class="border">
            <legend class="text-center">
              {{ $t("message.escuela.detalle.escuela.numero_sectores") }}
            </legend>
            <p class="innerPara">
              {{ escuelaDto.sectores.length }}
            </p>
          </fieldset>
        </b-tab>
        <b-tab :title="$t('message.escuela.detalle.cierresTemporada.titulo')">
          <b-list-group
            v-show="
              escuelaDto.cierresTemporada &&
              escuelaDto.cierresTemporada.length > 0
            "
          >
            <b-list-group-item
              class="flex-column align-items-start"
              v-for="cierre in escuelaDto.cierresTemporada"
              :key="cierre.id"
            >
              <h5 class="mb-1">
                {{
                  $t(
                    "message.escuela.detalle.cierresTemporada.motivo." +
                      cierre.motivoCierre
                  )
                }}
              </h5>
              <dl>
                <dt>
                  {{ $t("message.escuela.detalle.cierresTemporada.inicio") }}
                </dt>
                <dd>{{ cierre.inicio }}</dd>
                <dt>
                  {{ $t("message.escuela.detalle.cierresTemporada.fin") }}
                </dt>
                <dd>{{ cierre.fin }}</dd>
              </dl>
              <b-button
                class="bg-danger"
                size="sm"
                @click="borrarCierre(cierre)"
                v-show="!invitado"
                ><b-icon icon="trash" aria-hidden="true"></b-icon
              ></b-button>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
      </b-tabs>
      <template #footer v-if="!invitado">
        <div class="d-flex bg-info text-light align-items-center px-3 py-2">
          <strong class="mr-auto">{{
            tabActiva == 0
              ? $t("message.escuela.detalle.escuela.editar")
              : $t("message.escuela.detalle.cierresTemporada.anadir")
          }}</strong>
          <b-button
            size="sm"
            @click="actualizarEscuela"
            class="mr-1"
            v-show="tabActiva == 0"
            ><b-icon icon="pencil" aria-hidden="true"></b-icon
          ></b-button>
          <b-button
            class="bg-danger"
            size="sm"
            @click="borrarEscuela"
            v-show="tabActiva == 0"
            ><b-icon icon="trash" aria-hidden="true"></b-icon
          ></b-button>
          <b-button size="sm" @click="anadirCierre" v-show="tabActiva == 1"
            ><b-icon icon="plus-circle" aria-hidden="true"></b-icon
          ></b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import Vue from "vue";
import { gmapsMap, gmapsMarker } from "x5-gmaps";
import TablaSectores from "./tablas/TablaSectores";
import Calendar from "v-year-calendar";
import "v-year-calendar/locales/v-year-calendar.es";
import ModalSector from "./modales/ModalSector";
import ModalEscuela from "./modales/ModalEscuela";
import ModalCierre from "./modales/ModalCierre";
const centroid = require("polygon-centroid");

export default {
  components: {
    gmapsMap,
    gmapsMarker,
    TablaSectores,
    Calendar,
    ModalSector,
    ModalEscuela,
    ModalCierre,
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      escuelaDto: {
        id: "",
        nombre: "",
        latitud: "",
        longitud: "",
        paisIso: "",
        informacion: "",
        cierresTemporada: [],
        sectores: [],
        zona: {
          id: 0,
          region: "",
        },
      },
      loading: false,
      marcadores: [],
      mapOptions: {
        zoom: 14,
      },
      cierres: [],
      tabActiva: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    borrarCierre(cierre) {
      let titulo = this.$t("message.modal.cierres.borrar.titulo");
      let texto = this.$t("message.modal.cierres.borrar.texto", {
        motivo: this.$t(
          "message.escuela.detalle.cierresTemporada.motivo." +
            cierre.motivoCierre
        ),
        inicio: cierre.inicio,
        fin: cierre.fin,
      });
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
                "/escuelas/" + this.escuelaDto.id + "/cierres/" + cierre.id,
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
                this.fetchData();
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    cierreGrabado() {
      this.fetchData();
    },
    anadirCierre() {
      this.$refs.modal_cierre.mostrar(this.escuelaDto.id);
    },
    escuelaAtualizada() {
      this.fetchData();
    },
    actualizarEscuela() {
      this.$refs.modal_escuela.mostrar(
        this.escuelaDto.zona.pais,
        this.escuelaDto.zona.id,
        this.escuelaDto
      );
    },
    borrarEscuela() {
      let texto = this.$t("message.modal.escuela.borrar.texto", {
        nombre: this.escuelaDto.nombre,
      });
      let titulo = this.$t("message.modal.escuela.borrar.titulo");
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
              .delete("/escuelas/" + this.escuelaDto.id, {
                headers,
              })
              .then(() => {
                this.$fire({
                  title: "Borrada!!",
                  type: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.$router.push("/zonas/" + this.escuelaDto.zona.id);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    tabActivada(nuevaTab) {
      this.tabActiva = nuevaTab;
    },
    fetchData() {
      this.loading = true;
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .get("/escuelas/" + this.id, {
          headers,
        })
        .then((response) => {
          this.escuelaDto = response.data.data;
          this.setMarcadores();
          this.centrarMapa();

          // paso la id de la escuela a los sectores ya que lo necesitarán para acceder al detalle de sector desde la tabla
          for (let i = 0; i < this.escuelaDto.sectores.length; i++) {
            this.escuelaDto.sectores[i].escuela = {
              id: this.escuelaDto.id,
            };
          }

          // ordenos los cierres por fecha de fin
          if (
            this.escuelaDto.cierresTemporada &&
            this.escuelaDto.cierresTemporada.length > 0
          ) {
            this.escuelaDto.cierresTemporada.sort(
              (a, b) => new Date(b.fin) - new Date(a.fin)
            );
          }

          // si tiene cierres de temporada los pinto en el calendario
          if (this.escuelaDto.cierresTemporada.length > 0) {
            for (let i = 0; i < this.escuelaDto.cierresTemporada.length; i++) {
              let cierre = this.escuelaDto.cierresTemporada[i];
              this.cierres.push({
                id: cierre.id,
                color:
                  cierre.motivoCierre == "CRIA_AVES" ? "magenta" : "yellow",
                name: this.$t(
                  "message.escuela.detalle.cierresTemporada.tipo." +
                    cierre.motivoCierre +
                    ".texto"
                ), //buscar texto para la clave del motivo
                location: this.escuelaDto.nombre,
                startDate: new Date(cierre.inicio),
                endDate: new Date(cierre.fin),
              });
            }
          }

          this.$refs.tablaSectores.setItems(this.escuelaDto.sectores);
          this.loading = false;
        });
    },

    setMarcadores() {
      for (let i = 0; i < this.escuelaDto.sectores.length; i++) {
        let sector = this.escuelaDto.sectores[i];
        if (
          sector.latitud !== undefined &&
          sector.latitud !== null &&
          sector.longitud !== undefined &&
          sector.longitud !== null
        ) {
          this.marcadores.push({
            options: {
              title: sector.nombre,
              label: {
                text: sector.nombre,
                color: "white",
                className: "bg-primary rounded",
              },
              position: {
                lat: sector.latitud,
                lng: sector.longitud,
              },
            },
          });
        }
      }
    },

    centrarMapa() {
      let puntos = [];
      for (let i = 0; i < this.marcadores.length; i++) {
        puntos.push({
          x: this.marcadores[i].options.position.lat,
          y: this.marcadores[i].options.position.lng,
        });
      }
      if (puntos.length > 0) {
        let centroMapa = centroid(puntos);
        this.mapOptions.center = {
          lat: centroMapa.x,
          lng: centroMapa.y,
        };
      }
    },

    muestraCierre(dia) {
      // provisional, no hace nada de momento, se podría usar para mostar información del cierre, el evento ya tiene fechas y moitivo
      if (dia == null) {
        console.log(dia);
      }
    },

    nuevoSector() {
      this.$refs.modal_sector.mostrar(this.escuelaDto.id);
    },
  },

  computed: {
    invitado() {
      return Vue.rolInvitado();
    },
    items() {
      return [
        {
          text: this.escuelaDto.zona.region,
          to: { name: "detalleZona", params: { id: this.escuelaDto.zona.id } },
        },
        {
          text: this.escuelaDto.nombre,
          active: true,
        },
      ];
    },
  },
};
</script>

<style>
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