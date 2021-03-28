<template>
  <div
    :class="detalle ? 'container detalle' : 'container carrusel'"
    ref="contenedor_croquis"
  >
    <div v-if="loading && !detalle" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <h1 v-if="detalle">{{ croquis.nombre }}</h1>
    <div class="div_menu" ref="div_toolbar" v-if="detalle">
      <vue-file-toolbar-menu :content="my_menu" />
    </div>
    <div class="div_cargando" v-if="loading && detalle">
      <div class="justify-content-center">
        <icons :icon="['fas', 'spinner']" class="fa-spinner" />
      </div>
    </div>
    <div :style="{ height: heightScrollBar + 'px' }">
      <perfect-scrollbar ref="scroll">
        <div
          v-bind:id="'canvas-' + croquis.id"
          class="div_canvas"
          v-bind:reference="'ref-canvas-' + croquis.id"
        ></div>
      </perfect-scrollbar>
    </div>
  </div>
</template>
<script>
import p5 from "p5";
import Vue from "vue";
import VueFileToolbarMenu from "vue-file-toolbar-menu";
export default {
  components: {
    VueFileToolbarMenu,
  },

  computed: {
    heightScrollBar() {
      return this.alto;
    },
    my_menu() {
      return [
        {
          text: "Croquis",
          menu: [
            {
              text: "Cargar imagen...",
              click: (e) => this.funcionesCroquis.cargarImagen(e),
              disabled: this.imagenCargada,
            },
            {
              text: "Guardar cambios",
              click: (e) => this.funcionesCroquis.guardarCambios(e),
            },
            { is: "separator" },
            {
              text: "Exportar...",
              click: (e) => this.funcionesCroquis.exportar(e),
            },
          ],
        },
        {
          text: "Edición",
          menu: [
            {
              text: "recargar",
              click: (e) => this.funcionesCroquis.deshacerCambios(e),
            },
          ],
        },
        {
          text: "Formato",
          menu: [
            {
              text: "Leyenda",
              menu: [
                {
                  text: "mostrar",
                  icon: this.mostrarLeyenda
                    ? "check_box"
                    : "check_box_outline_blank",
                  click: (e) => this.funcionesCroquis.mostrarLeyenda(e),
                },
                {
                  disabled: !this.mostrarLeyenda,
                  text: "tipo",
                  menu: this.mostrarLeyenda
                    ? [
                        {
                          text: "Caja",
                          click: (e) =>
                            this.funcionesCroquis.setTipoLeyenda(e, "caja"),
                        },
                        {
                          text: "Barra",
                          click: (e) =>
                            this.funcionesCroquis.setTipoLeyenda(e, "barra"),
                        },
                        {
                          text: "Vía",
                          click: (e) =>
                            this.funcionesCroquis.setTipoLeyenda(e, "via"),
                        },
                      ]
                    : null,
                },
                {
                  disabled: !this.mostrarLeyenda || this.tipoLeyenda == "via",
                  text: "Orientación",
                  menu: this.orientacion[this.tipoLeyenda],
                },
              ],
            },
            {
              text: "Color...",
              click: (e) => {
                this.funcionesCroquis.color(e);
              },
            },
          ],
        },
        {
          text: "Ver",
          menu: [
            {
              text: "Zoom",
              menu: [
                {
                  text: "100%",
                  click: (e) => {
                    this.funcionesCroquis.zoom(e, 1);
                  },
                },
                {
                  text: "150%",
                  click: (e) => {
                    this.funcionesCroquis.zoom(e, 1.5);
                  },
                },
                {
                  text: "200%",
                  click: (e) => {
                    this.funcionesCroquis.zoom(e, 2);
                  },
                },
                {
                  text: "300%",
                  click: (e) => {
                    this.funcionesCroquis.zoom(e, 3);
                  },
                },
                {
                  text: "500%",
                  click: (e) => {
                    this.funcionesCroquis.zoom(e, 5);
                  },
                },
              ],
            },
          ],
        },
        {
          text: "Vías",
          menu: [
            {
              text: "Seleccionar...",
              click: (e) => this.funcionesCroquis.seleccionarVia(e),
            },
            {
              text: "Añadir...",
              click: (e) => this.funcionesCroquis.anadirVia(e),
            },
          ],
        },
        {
          text: "Ayuda",
          menu: [
            {
              text: "Manual",
              click: (e) => {
                this.funcionesCroquis.manual(e);
              },
            },
            { is: "separator" },
            {
              text: "Acerca de...",
              click: (e) => {
                this.funcionesCroquis.acercaDe(e);
              },
            },
          ],
        },
      ];
    },
  },

  data() {
    return {
      alto: 10,
      sketch: {},
      imagen: "",
      imagenCargada: false,
      loading: false,
      mostrarLeyenda: false,
      tipoLeyenda: "barra",
      // submenús de "Orientación" dependiendo del tipo de leyenda seleccionado
      orientacion: {
        caja: [
          {
            text: "sup. izquierda",
            click: (e) => {
              this.funcionesCroquis.orientacion(e, "supizq");
            },
          },
          {
            text: "sup. derecha",
            click: (e) => {
              this.funcionesCroquis.orientacion(e, "supder");
            },
          },
          {
            text: "inf. izquierda",
            click: (e) => {
              this.funcionesCroquis.orientacion(e, "infizq");
            },
          },
          {
            text: "inf. derecha",
            click: (e) => {
              this.funcionesCroquis.orientacion(e, "infder");
            },
          },
        ],
        barra: [
          {
            text: "inferior",
            click: (e) => {
              this.funcionesCroquis.orientacion(e, "inf");
            },
          },
          {
            text: "superior",
            click: (e) => {
              this.funcionesCroquis.orientacion(e, "sup");
            },
          },
        ],
      },
      funcionesCroquis: {
        cargarImagen: (e) => {
          console.error("implementación no enlazada", e);
        },
        guardarCambios: (e) => {
          console.error("implementación no enlazada", e);
        },
        deshacerCambios: (e) => {
          console.error("implementación no enlazada", e);
        },
        exportar: (e) => {
          console.error("implementación no enlazada", e);
        },
        mostrarLeyenda: (e) => {
          this.mostrarLeyenda = !this.mostrarLeyenda;
          console.error("implementación no enlazada", e);
        },
        setTipoLeyenda: (e, tipo) => {
          console.error("implementación no enlazada", e, tipo);
        },
        orientacion: (e, orientacion) => {
          console.error("implementación no enlazada", e, orientacion);
        },
        color: (e) => {
          console.error("implementación no enlazada", e);
        },
        zoom: (e, z) => {
          console.error("implementación no enlazada", e, z);
        },
        seleccionarVia: (e) => {
          console.error("implementación no enlazada", e);
        },
        anadirVia: (e) => {
          console.error("implementación no enlazada", e);
        },
        manual: (e) => {
          console.error("implementación no enlazada", e);
        },
        acercaDe: (e) => {
          console.error("implementación no enlazada", e);
        },
      },
    };
  },

  props: {
    croquis: {
      type: Object,
    },
    detalle: {
      type: Boolean,
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
            this.imagenCargada = true;
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
        let height = 0; // se calculará en función al alto y proporciones de la imagen
        let width;
        let factorZoom = 1;
        let c;
        let img;

        const GROSOR_VIA = 4;
        //const COLOR_VIA = s.color(255, 50, 240);
        const COLOR_VIA = s.color(0, 0, 0);
        const BLANCO = s.color(255);
        //const NEGRO = s.color(0);

        // de cada vía se guarda, la vía en sí, su trazo(puntos guardados) y su curva(puntos interpolados)
        let viasGrabadas = [];

        //leyenda
        let orientacionLeyenda;

        const UNIFORM = 0;
        const CENTRIPETAL = 1;

        s.setup = () => {
          if (this.imagen !== undefined && this.imagen !== null) {
            try {
              img = s.createImg(this.imagen, "", "", function () {
                img.hide();
                ajustaDimensionesCanvas();
                c = s.createCanvas(width, height);
                cargaViasGrabadas();
                pintaTodo();
                s.noLoop();
              });
            } catch (e) {
              console.error(e);
            }
          }

          // enlazo las funciones accesibles desde fuera
          this.funcionesCroquis.zoom = zoom;
          this.funcionesCroquis.setTipoLeyenda = setTipoLeyenda;
          this.funcionesCroquis.orientacion = orientacion;
          this.funcionesCroquis.mostrarLeyenda = mostrarLeyenda;
        };

        s.windowResized = () => {
          reajusteDimensiones();
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

        //***** Funciones accesibles desde el DOM *****/
        let zoom = (e, z) => {
          factorZoom = z;
          reajusteDimensiones();
          this.$refs.scroll.$el.scrollTop = 0;
          this.$refs.scroll.$el.scrollLeft = 0;
        };

        let setTipoLeyenda = (e, tipo) => {
          this.tipoLeyenda = tipo;
          // tenemos el tipo de leyenda, aplicaremos la orientación por defecto
          if (this.orientacion[this.tipoLeyenda] != undefined) {
            // tipo de leyenda 'caja' o 'barra' seleccionamos la orientación por defecto y ya se pintará todo desde ahí
            this.orientacion[this.tipoLeyenda][0].click(e);
          } else {
            // tipo de leyenda 'vía' pintamos todo ya directamente
            pintaTodo();
          }
        };

        let orientacion = (e, tipo) => {
          orientacionLeyenda = tipo;
          pintaTodo();
        };

        let mostrarLeyenda = () => {
          this.mostrarLeyenda = !this.mostrarLeyenda;
          pintaTodo();
        };

        let reajusteDimensiones = () => {
          ajustaDimensionesCanvas();
          s.resizeCanvas(width, height);
          recalculaCurvasViasGuardadas();
          pintaTodo();
        };

        let ajustaDimensionesCanvas = () => {
          if (this.$refs.div_toolbar == undefined) {
            width = this.$refs.contenedor_croquis.clientWidth;
          } else {
            width = this.$refs.div_toolbar.getBoundingClientRect().width;
          }
          // dimensión y del scroll
          this.alto = img.height * (width / img.width) * 1.01;
          // ajuste zooom
          width *= factorZoom;
          // factor de ajuste, ajustamos el ancho del canvas
          height = img.height * (width / img.width);
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
            pintaCurva(viasGrabadas[i].curva, BLANCO, GROSOR_VIA * 2.25);
            pintaCurva(viasGrabadas[i].curva, COLOR_VIA, GROSOR_VIA);
          }
          if (this.mostrarLeyenda) {
            pintaLeyenda();
          }
        };

        let pintaLeyenda = () => {
          if (this.tipoLeyenda == "via") {
            pintaLeyendaVia();
          } else if (this.tipoLeyenda == "barra") {
            pintaLeyendaBarra();
          } else if (this.tipoLeyenda == "caja") {
            pintaLeyendaCaja();
          } else {
            console.error("tipo de leyenda no esperado");
          }
        };

        let pintaLeyendaCaja = () => {

          // pintamos los números de vía para referenciar
          pintaNumerosVia();

          // construimos la caja de texto
          let lineas = [];
          let x, y;
          // primera linea para la cabecera
          lineas.push(["vía", "|", "grado", "|", "longitud", "|", "chapas"]);
          lineas.push(["", "", "", "", "", "", ""]);
          for (let i = 0; i < viasGrabadas.length; i++) {
            let via = viasGrabadas[i].via;
            lineas.push([
              "[" + (i + 1) + "] " + via.nombre,
              "|",
              via.grado ? via.grado : "",
              "|",
              via.longitud ? via.longitud : "",
              "|",
              via.numeroChapas ? via.numeroChapas : "",
            ]);
          }

          // pintamos el rectángulo
          s.textSize(12);
          s.textFont("monospace");
          let ancho = s.textWidth("  ");
          for (let i = 0; i < lineas[0].length; i++) {
            ancho += s.textWidth(" " + mayorPalabra(lineas, i));
          }
          let alto = lineas.length * (s.textSize() + s.textDescent());

          // calculamos coordenadas de la caja
          if (orientacionLeyenda == "supizq") {
            x = 0;
            y = 0;
          } else if (orientacionLeyenda == "supder") {
            x = width - ancho;
            y = 0;
          } else if (orientacionLeyenda == "infder") {
            x = width - ancho;
            y = height - alto;
          } else if (orientacionLeyenda == "infizq") {
            x = 0;
            y = height - alto;
          } else {
            // orientación por defecto
            x = 0;
            y = 0;
          }

          s.fill(BLANCO);
          s.stroke(COLOR_VIA);
          s.strokeWeight(2);
          s.rect(x, y, ancho, alto);

          // pintamos las lineas
          s.fill(COLOR_VIA);
          s.noStroke();
          for (let i = 0; i < lineas.length; i++) {
            let textoLinea = "";
            let relleno = i == 1 ? "-" : " ";
            for (let j = 0; j < lineas[i].length; j++) {
              let palabra = lineas[i][j] ? lineas[i][j].toString() : "";
              if (j == 0) {
                textoLinea += palabra.padEnd(
                  (mayorPalabra(lineas, j) + " ").length,
                  relleno
                );
              } else {
                textoLinea += palabra.padStart(
                  (mayorPalabra(lineas, j) + " ").length,
                  relleno
                );
              }
            }
            s.text(
              textoLinea,
              x + 5,
              y + (i + 1) * (s.textAscent() + s.textDescent())
            );
          }

        };

        let mayorPalabra = (lineas, columna) => {
          let mayor = "";
          for (let i = 0; i < lineas.length; i++) {
            if (
              lineas[i][columna] &&
              lineas[i][columna].length > mayor.length
            ) {
              mayor = lineas[i][columna];
            }
          }
          return mayor;
        };

        let pintaLeyendaBarra = () => {
          let lineas = [""];

          // construimos el texto
          s.textFont("monospace");
          s.textSize(15);
          for (let i = 0; i < viasGrabadas.length; i++) {
            let separador = i == 0 ? "" : "; ";
            let anchoAcumulado = s.textWidth(lineas[lineas.length - 1] + separador);
            let via = viasGrabadas[i].via;
            // TODO i18n chapas y metros...
            let textoVia =
              "[" +
              (i + 1) +
              "] " +
              via.nombre +
              (via.grado ? ", " + via.grado : "") +
              (via.longitud ? ", " + via.longitud + " m" : "") +
              (via.numeroChapas ? ", " + via.numeroChapas + " chapas" : "");
            if (
              anchoAcumulado + separador.length + s.textWidth(textoVia) >
              width
            ) {
              lineas.push(textoVia);
            } else {
              lineas[lineas.length - 1] =
                lineas[lineas.length - 1] + separador + textoVia;
            }
          }
          let altoLinea = s.textAscent() + s.textDescent();
          let altoTotalBarra = altoLinea * lineas.length;

          let y;
          if (orientacionLeyenda == "sup") {
            y = 0;
          } else if (orientacionLeyenda == "inf") {
            y = height - altoTotalBarra - s.textDescent() * 2;
          } else {
            // por defecto ...
            y = height - altoTotalBarra - s.textDescent() * 2;
          }

          // pintamos las lineas sobre rectángulo blanco
          s.fill(BLANCO);
          s.stroke(COLOR_VIA);
          s.strokeWeight(2);
          s.rect(0, y, width, altoTotalBarra + s.textDescent() * 2);
          s.noStroke();
          s.fill(COLOR_VIA);
          for (let i = 0; i < lineas.length; i++) {
            s.text(lineas[i], 10, y + (i + 1) * altoLinea);
          }

          // pintamos los números de vía para referenciar
          pintaNumerosVia();
        };

        let pintaNumerosVia = () => {
          for (let i = 0; i < viasGrabadas.length; i++) {
            let via = viasGrabadas[i];
            let puntoInicial = traduce([via.puntos[0]])[0];

            // círculo
            s.fill(COLOR_VIA);
            s.stroke(BLANCO);
            s.strokeWeight(2);
            s.circle(puntoInicial.x, puntoInicial.y, 30);

            // texto
            s.noStroke();
            s.fill(BLANCO);
            s.textSize(20);
            s.text(
              i + 1,
              puntoInicial.x - s.textWidth(i + 1) / 2,
              puntoInicial.y + s.textDescent()
            );
          }
        };

        let pintaLeyendaVia = () => {
          for (let i = 0; i < viasGrabadas.length; i++) {
            let via = viasGrabadas[i];
            let puntoInicial = traduce([via.puntos[0]])[0];
            s.textSize(25);
            s.fill(COLOR_VIA);
            s.strokeWeight(3);
            s.stroke(BLANCO);
            let anchoPalabra = s.textWidth(via.via.nombre);
            s.text(
              via.via.nombre,
              puntoInicial.x - anchoPalabra / 2,
              puntoInicial.y + s.textAscent()
            );
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
            let viaGrabada = {
              via: this.croquis.trazos[i].via,
              puntos: this.croquis.trazos[i].puntos,
              curva: interpolate_1(this.croquis.trazos[i].puntos, 100, 1),
            };
            viasGrabadas.push(viaGrabada);
          }
        };

        let recalculaCurvasViasGuardadas = () => {
          for (let i = 0; i < viasGrabadas.length; i++) {
            viasGrabadas[i].curva = interpolate_1(
              viasGrabadas[i].puntos,
              100,
              1
            );
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

        let interpolate_1 = (puntos, pointsPerSegment, curveType) => {
          let coordinates = traduce(puntos);
          let vertices = [];
          for (let i = 0; i < coordinates.length; i++) {
            vertices.push({ x: coordinates[i].x, y: coordinates[i].y });
          }
          if (pointsPerSegment < 2) {
            console.error("ERROR!! mínimo 2 puntos por segmento");
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
<style>
.detalle {
  max-width: 50% !important;
}
.carrusel {
  max-width: 85% !important;
}
.ps > div > canvas {
  border-style: solid;
  border-width: 0px 1px 1px 1px;
  border-radius: 0px 0px 5px 5px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.div_menu {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px 5px 0px 0px;
}
.div_cargando {
  border-style: solid;
  border-width: 0px 1px 1px 1px;
  border-radius: 0px 0px 5px 5px;
}
.div_canvas {
  display: inline-block;
}
.ps {
  height: 100%;
}
</style>