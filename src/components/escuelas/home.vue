<template>
  <div id="home" class="container">
    <h1>{{ $t("message.modificaciones.titulo") }}</h1>
    <div v-if="points.length > 0" class="timeline">
      <b-list-group>
        <b-list-group-item
          class="flex-column align-items-start"
          v-for="point in points"
          :key="point.id"
        >
          <div class="d-flex w-100 justify-content-between">
            <time-ago
              :long="true"
              :locale="locale"
              :datetime="point.fecha"
              tooltip
            ></time-ago>
            <router-link :to="point.path">
              <b-icon icon="box-arrow-up-right" aria-hidden="true"> </b-icon
            ></router-link>
          </div>
          <p class="mb-1">{{ $t(point.texto.clave, point.texto.variables) }}</p>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { TimeAgo } from "vue2-timeago";
import "vue2-timeago/dist/vue2-timeago.css";
export default {
  components: {
    TimeAgo,
  },
  data() {
    return {
      loading: false,
      points: [],
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      const headers = Vue.getHeaders(this.$i18n.t("message.idioma.codigo"));
      this.$http
        .get("/cambios?page=0&size=50&sort=fecha,desc", {
          headers,
        })
        .then((response) => {
          this.points = response.data.data.contenido
            .filter((m) => m.tipoRecurso != "ASCENSION")
            .map((m) => this.modificacion2Point(m));
        });
    },
    modificacion2Point(modificacion) {
      return {
        id: modificacion.id,
        texto: this.getTextoModificacion(modificacion),
        fecha: new Date(modificacion.fecha),
        path: modificacion.path,
        nombre: modificacion.usuario.nombre,
      };
    },
    getTextoModificacion(modificacion) {
      let recurso = JSON.parse(modificacion.valorRecurso);
      let accion = "";
      switch (modificacion.accionLog) {
        case "CREAR":
          accion = "crear";
          break;
        case "ACTUALIZAR":
          accion = "actualizar";
          break;
        case "BORRAR":
          accion = "borrar";
          break;
        default:
          throw "tipo de acción no esperado: " + modificacion.accionLog;
      }
      switch (modificacion.tipoRecurso) {
        case "ESCUELA":
          return {
            clave: "message.modificaciones." + accion + ".escuela",
            variables: {
              nombre: modificacion.usuario.nombre,
              escuela: recurso.nombre,
            },
          };
        case "ZONA":
          return {
            clave: "message.modificaciones." + accion + ".zona",
            variables: {
              nombre: modificacion.usuario.nombre,
              region: recurso.region,
            },
          };
        case "ASCENSION":
          return {
            clave: "message.modificaciones." + accion + ".ascension",
            variables: {
              nombre: modificacion.usuario.nombre,
              region: recurso.region,
            },
          };
        case "COMENTARIO":
          return {
            clave: "message.modificaciones." + accion + ".comentario",
            variables: {
              nombre: modificacion.usuario.nombre,
              region: recurso.region,
            },
          };
        case "CROQUIS":
          return {
            clave: "message.modificaciones." + accion + ".croquis",
            variables: {
              nombre: modificacion.usuario.nombre,
              sector: recurso.sector.nombre,
              escuela: recurso.sector.escuela.nombre,
            },
          };
        case "SECTOR":
          return {
            clave: "message.modificaciones." + accion + ".sector",
            variables: {
              nombre: modificacion.usuario.nombre,
              sector: recurso.nombre,
            },
          };
        case "TRAZO_VIA":
          return {
            clave: "message.modificaciones." + accion + ".trazo_via",
            variables: {
              nombre: modificacion.usuario.nombre,
              via: recurso.via.nombre,
            },
          };
        case "VIA":
          return {
            clave: "message.modificaciones." + accion + ".via",
            variables: {
              nombre: modificacion.usuario.nombre,
              via: recurso.nombre,
            },
          };
        default:
          return "pendiente: " + modificacion.tipoRecurso;
      }
    },
    getTextoActualizar(modificacion) {
      return "pendiente: " + modificacion.usuario.nombre;
    },
  },
  computed: {
    locale() {
      return this.$t("message.idioma.codigo");
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
a:hover {
  cursor: pointer;
}

/* afecta al fab del croquis... */
.container {
  position: relative;
}

</style>