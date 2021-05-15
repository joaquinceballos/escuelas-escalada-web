<template>
  <div id="home" class="container">
    <div v-if="points.length > 0" class="timeline">
      <div v-for="point in points" :key="point.id" class="container right">
        <b-container class="content">
          <b-row>
            <b-col>
              <p>{{ $t(point.texto.clave, point.texto.variables) }}</p></b-col
            >
          </b-row>
          <b-row>
            <b-col>
              <time-ago
                :long="true"
                :locale="locale"
                :datetime="point.fecha"
                tooltip
              ></time-ago
            ></b-col>
            <b-col></b-col>
            <b-col> <router-link :to="point.path"> ver </router-link></b-col>
          </b-row>
        </b-container>
      </div>
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
          this.points = response.data.data.contenido.map((m) =>
            this.modificacion2Point(m)
          );
          console.log(this.points);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    modificacion2Point(modificacion) {
      return {
        id: modificacion.id,
        texto: this.getTextoModificacion(modificacion),
        fecha: new Date(modificacion.fecha),
        path: modificacion.path,
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
              escuela: recurso.sector.escuela.nombre
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
              region: recurso.region,
            },
          };
        case "VIA":
          return {
            clave: "message.modificaciones." + accion + ".via",
            variables: {
              nombre: modificacion.usuario.nombre,
              region: recurso.region,
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

/* Set a background color */
body {
  background-color: #474e5d;
  font-family: Helvetica, sans-serif;
}

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: "";
  position: absolute;
  width: 6px;
  background-color: black;
  top: 0;
  bottom: 0;
  left: 0%;
  margin-left: 0px;
}

/* Container around content */
.container {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 0%;
}

/* The actual content */
.content {
  padding: 20px 30px;
  background-color: whitesmoke;
  position: relative;
  border-radius: 6px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  /* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }

  /* Full-width containers */
  .container {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .container::before {
    left: 60px;
    border: medium solid greenyellow;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  /* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
}
</style>