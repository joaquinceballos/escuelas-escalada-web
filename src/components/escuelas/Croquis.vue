<template>
  <div>
    <div v-if="loading" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <div
      v-bind:id="'canvas-' + croquis.id"
      v-bind:reference="'ref-canvas-' + croquis.id"
    ></div>
  </div>
</template>
<script>
import p5 from "p5";
import Vue from "vue";
export default {
  data() {
    return {
      sketch: {},
      imagen: "",
      loading: false,
    };
  },

  props: {
    alto: {
      type: Number,
    },
    croquis: {
      type: Object,
    },
  },

  methods: {
    fetchData() {
      this.loading = true;
      if (
        this.croquis.imagen === undefined ||
        this.croquis.imagen === null ||
        this.croquis.imagen.length == 0
      ) {
        let token = Vue.getToken();
        const headers = { Authorization: "Bearer " + token };
        this.$http
          .get(
            "/escuelas/" +
              this.croquis.idEscuela +
              "/sectores/" +
              this.croquis.sector.id +
              "/croquis/" +
              this.croquis.id,
            {
              headers,
            }
          )
          .then((response) => {
            this.imagen =
              "data:" +
              response.data.data.formatoImagen +
              ";base64," +
              response.data.data.imagen;
            this.cargaSketch();
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
      } else {
        this.imagen =
          "data:" +
          this.croquis.formatoImagen +
          ";base64," +
          this.croquis.imagen;
        this.cargaSketch();
      }
    },

    cargaSketch() {
      this.sketch = (s) => {
        const height = this.alto;
        let width = 0; // se calculará en función al alto y proporciones de la imagen
        let c;
        let img;

        const GROSOR_VIA = 3;
        const COLOR_VIA = s.color(255, 50, 240);
        const BLANCO = s.color(255, 255, 255);

        let viasGrabadas = [];

        const UNIFORM = 0;
        const CENTRIPETAL = 1;

        s.setup = () => {
          if (this.imagen !== undefined && this.imagen !== null) {
            try {
              img = s.createImg(this.imagen, "", "", function () {
                img.hide();
                // factor de ajuste, ajustamos el ancho del canvas
                width = img.width * (height / img.height);
                c = s.createCanvas(width, height);
                cargaViasGrabadas();
                pintaTodo();
                s.noLoop();
              });
            } catch (e) {
              console.error(e);
            }
          }
        };
        /*
        s.mouseClicked = (mouseEvent) => {
          if (mouseEventEnCanvas(mouseEvent)) {
          }
        };
*/
        s.doubleClicked = (mouseEvent) => {
          if (mouseEventEnCanvas(mouseEvent)) {
            this.$emit("doble-click", this.croquis);
          }
        };

        s.draw = () => {
          if (img) {
            pintaTodo();
          }
        };

        /** Comprueba y retorna si el evento de raton se ha producido contra el canvas */
        let mouseEventEnCanvas = (mouseEvent) => {
          return mouseEvent.target == c.canvas;
        };

        let pintaTodo = () => {
          // pintamos la imagen
          s.image(img, 0, 0, width, height);
          // por cada vía grabada en el croquis, pintamos su curva
          for (let i = 0; i < viasGrabadas.length; i++) {
            pintaCurva(viasGrabadas[i], BLANCO, GROSOR_VIA * 1.75);
            pintaCurva(viasGrabadas[i], COLOR_VIA, GROSOR_VIA);
          }
        };

        let pintaCurva = (curva, color, grosor) => {
          s.stroke(color);
          s.strokeWeight(grosor);
          for (let i = 0; i < curva.length - 1; i++) {
            s.line(curva[i].x, curva[i].y, curva[i + 1].x, curva[i + 1].y);
          }
        };

        let cargaViasGrabadas = () => {
          for (let i = 0; i < this.croquis.trazos.length; i++) {
            let puntos = traduce(this.croquis.trazos[i].puntos);
            viasGrabadas.push(interpolate_1(puntos, 100, 1));
          }
        };

        let traduce = (puntos) => {
          let puntosAbsolutos = [];
          for (let i = 0; i < puntos.length; i++) {
            puntosAbsolutos.push({
              x: puntos[i].x * width,
              y: puntos[i].y * height,
            });
          }
          return puntosAbsolutos;
        };

        let interpolate_1 = (coordinates, pointsPerSegment, curveType) => {
          let vertices = [];
          for (let i = 0; i < coordinates.length; i++) {
            vertices.push({ x: coordinates[i].x, y: coordinates[i].y });
          }
          if (pointsPerSegment < 2) {
            print("ERROR!! mínimo 2 puntos por segmento");
            return;
          }

          // Cannot interpolate curves given only two points.  Two points
          // is best represented as a simple line segment.
          if (vertices.length < 3) {
            return vertices;
          }

          // Get the change in x and y between the first and second coordinates.
          let dx = vertices[1].x - vertices[0].x;
          let dy = vertices[1].y - vertices[0].y;

          // Then using the change, extrapolate backwards to find a control point.
          let x1 = vertices[0].x - dx;
          let y1 = vertices[0].y - dy;

          // Actaully create the start point from the extrapolated values.
          let start = { x: x1, y: y1 };

          // Repeat for the end control point.
          let n = vertices.length - 1;
          dx = vertices[n].x - vertices[n - 1].x;
          dy = vertices[n].y - vertices[n - 1].y;
          let xn = vertices[n].x + dx;
          let yn = vertices[n].y + dy;
          let end = { x: xn, y: yn };

          // insert the start control point at the start of the vertices list.
          vertices.unshift(start);

          // append the end control ponit to the end of the vertices list.
          vertices.push(end);

          // Dimension a result list of coordinates.
          let result = [];
          // When looping, remember that each cycle requires 4 points, starting
          // with i and ending with i+3.  So we don't loop through all the points.
          for (let i = 0; i < vertices.length - 3; i++) {
            // Actually calculate the Catmull-Rom curve for one segment.
            let points = interpolate_2(
              vertices,
              i,
              pointsPerSegment,
              curveType
            );
            // Since the middle points are added twice, once for each bordering
            // segment, we only add the 0 index result point for the first
            // segment.  Otherwise we will have duplicate points.
            if (result.length > 0) {
              points.splice(0, 1);
            }

            // Add the coordinates for the segment to the result list.
            result = result.concat(points);
          }
          return result;
        };

        let interpolate_2 = (points, index, pointsPerSegment, curveType) => {
          if (points.length < 2) {
            return [];
          }
          let result = [];
          let x = [];
          let y = [];
          let time = [];
          for (let i = 0; i < 4; i++) {
            x[i] = points[index + i].x;
            y[i] = points[index + i].y;
            time[i] = i;
          }

          let tstart = 1;
          let tend = 2;
          if (!curveType == UNIFORM) {
            let total = 0;
            for (let j = 1; j < 4; j++) {
              let dx = x[j] - x[j - 1];
              let dy = y[j] - y[j - 1];
              if (curveType == CENTRIPETAL) {
                total += Math.pow(dx * dx + dy * dy, 0.25);
              } else {
                total += Math.pow(dx * dx + dy * dy, 0.5);
              }
              time[j] = total;
            }
            tstart = time[1];
            tend = time[2];
          }
          let segments = pointsPerSegment - 1;
          result.push(points[index + 1]);
          for (let i = 1; i < segments; i++) {
            let xi = interpolate_3(
              x,
              time,
              tstart + (i * (tend - tstart)) / segments
            );
            let yi = interpolate_3(
              y,
              time,
              tstart + (i * (tend - tstart)) / segments
            );
            result.push({ x: xi, y: yi });
          }
          result.push(points[index + 2]);
          return result;
        };

        let interpolate_3 = (p, time, t) => {
          let L01 =
            (p[0] * (time[1] - t)) / (time[1] - time[0]) +
            (p[1] * (t - time[0])) / (time[1] - time[0]);
          let L12 =
            (p[1] * (time[2] - t)) / (time[2] - time[1]) +
            (p[2] * (t - time[1])) / (time[2] - time[1]);
          let L23 =
            (p[2] * (time[3] - t)) / (time[3] - time[2]) +
            (p[3] * (t - time[2])) / (time[3] - time[2]);
          let L012 =
            (L01 * (time[2] - t)) / (time[2] - time[0]) +
            (L12 * (t - time[0])) / (time[2] - time[0]);
          let L123 =
            (L12 * (time[3] - t)) / (time[3] - time[1]) +
            (L23 * (t - time[1])) / (time[3] - time[1]);
          let C12 =
            (L012 * (time[2] - t)) / (time[2] - time[1]) +
            (L123 * (t - time[1])) / (time[2] - time[1]);
          return C12;
        };
      };
      new p5(this.sketch, "canvas-" + this.croquis.id);
      this.loading = false;
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
<style></style>