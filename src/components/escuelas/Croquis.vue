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
          :ref="'ref-canvas-' + croquis.id"
        ></div>
      </perfect-scrollbar>
    </div>
    <b-modal
      id="modal-select-via"
      ref="modal-select-via"
      title="Añade vía al croquis"
      @show="resetModalSelectVia"
      @hidden="resetModalSelectVia"
      @ok="handleSelectViaOk"
    >
      <p>
        Texto diciendo que añada la vía que quiera el croquis y que si no
        aparece la que quiere que la añada al sector
      </p>
      <b-form-select
        v-model="nuevaVia"
        :options="optionsViasSector"
        :select-size="4"
      ></b-form-select>
    </b-modal>
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
              disabled:
                (this.imagen != null && this.imagen.length > 0) || this.loading,
            },
            {
              disabled: !this.hayCambios,
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
              disabled: this.editandoCanvas,
              text: "Leyenda",
              menu: this.editandoCanvas
                ? null
                : [
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
                                this.funcionesCroquis.setTipoLeyenda(
                                  e,
                                  "barra"
                                ),
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
                      disabled:
                        !this.mostrarLeyenda || this.tipoLeyenda == "via",
                      text: "Orientación",
                      menu:
                        !this.mostrarLeyenda || this.tipoLeyenda == "via"
                          ? null
                          : this.orientacion[this.tipoLeyenda],
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
          text: "Vía",
          menu: [
            {
              disabled: !this.hayVias,
              text: "Seleccionar...",
              click: (e) => this.funcionesCroquis.seleccionarVia(e),
            },
            {
              text: "Añadir...",
              click: () => this.$bvModal.show("modal-select-via"),
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
      optionsViasSector: [],
      nuevaVia: null,
      dataCroquis: {},
      alto: 1,
      sketch: {},
      loading: false,
      imagen: "",
      mostrarLeyenda: false,
      editandoCanvas: false,
      hayVias: false,
      hayCambios: false,
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
        deshacerCambios: () => {
          // elimino imagen y canvas actual
          let divCanvas = this.$refs["ref-canvas-" + this.dataCroquis.id];
          divCanvas.innerHTML = "";
          this.mostrarLeyenda = false;
          this.editandoCanvas = false;
          this.hayVias = false;
          this.tipoLeyenda = "barra";
          this.fetchData();
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
        anadirVia: (via) => {
          console.error("implementación no enlazada", via);
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
    idEscuela: {
      type: [String, Number],
    },
    croquis: {
      type: Object,
    },
    detalle: {
      type: Boolean,
    },
  },

  methods: {
    resetModalSelectVia() {
      // relleno las opciones del modal de añadír vía
      let viasSector = this.croquis.sector.vias;
      let trazosCroquis = this.croquis.trazos;
      let options = [];
      for (let i = 0; i < viasSector.length; i++) {
        let option = { value: viasSector[i], text: viasSector[i].nombre };
        if (trazosCroquis.some((t) => t.via.id === viasSector[i].id)) {
          option.disabled = true;
        }
        options.push(option);
      }
      this.optionsViasSector = options;
      this.nuevaVia = null;
    },

    handleSelectViaOk() {
      if (this.nuevaVia) {
        this.funcionesCroquis.anadirVia(this.nuevaVia);
      }
    },

    fetchData() {
      this.loading = true;

      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.dataCroquis.sector.id +
            "/croquis/" +
            this.dataCroquis.id,
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
          this.dataCroquis = response.data.data;
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
    },

    async actualizaViaCroquis(viaCroquis) {
      try {
        let token = Vue.getToken();
        const headers = { Authorization: "Bearer " + token };
        let response = this.$http.put(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.dataCroquis.sector.id +
            "/croquis/" +
            this.dataCroquis.id +
            "/via/" +
            viaCroquis.via.id,
          viaCroquis,
          {
            headers,
          }
        );
        if (!response) {
          console.error("algo ha ido mal...");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async nuevaViaCroquis(viaCroquis) {
      try {
        let token = Vue.getToken();
        const headers = { Authorization: "Bearer " + token };
        let response = this.$http.post(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.dataCroquis.sector.id +
            "/croquis/" +
            this.dataCroquis.id +
            "/via/" +
            viaCroquis.via.id,
          viaCroquis,
          {
            headers,
          }
        );
        if (!response) {
          console.error("algo ha ido mal...");
        }
      } catch (error) {
        console.error(error);
      }
    },

    cargaSketch() {
      this.sketch = (s) => {
        let height = 0; // se calculará en función al alto y proporciones de la imagen
        let width;
        let factorZoom = 1;
        let c;
        let img;

        const RADIO_PUNTO = 5;
        const GROSOR_VIA = 4;
        //const COLOR_VIA = s.color(255, 50, 240);
        const COLOR_VIA = s.color(0, 0, 0);
        const BLANCO = s.color(255);
        const COLOR_SELECCIONABLE = s.color(255, 0, 255);
        const COLOR_SELECCIONADA = s.color(0, 255, 255);
        //const NEGRO = s.color(0);

        // de cada vía se guarda, la vía en sí, su trazo(puntos guardados) y su curva(puntos interpolados), además el estado... si ha sido midificada o es una vía recién añadida
        let viasCroquis = [];

        //leyenda
        let orientacionLeyenda;

        //seleccionando vía para editar
        let seleccionandoVia = false;
        let arrastrando = false;

        let viaSeleccionada;
        let viaSeleccionable;

        let puntoClickado = null;
        let indiceMarcado = -1;

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
          this.funcionesCroquis.seleccionarVia = seleccionarVia;
          this.funcionesCroquis.guardarCambios = guardarCambios;
          this.funcionesCroquis.anadirVia = anadirVia;
        };

        s.windowResized = () => {
          reajusteDimensiones();
        };

        s.mouseReleased = (mouseEvent) => {
          if (mouseEventEnCanvas(mouseEvent)) {
            s.noLoop();
            puntoClickado = null;
          }
        };

        s.mouseDragged = (mouseEvent) => {
          if (mouseEventEnCanvas(mouseEvent)) {
            if (puntoClickado) {
              //arrastrando = true;
              puntoClickado.x = s.mouseX / width;
              puntoClickado.y = s.mouseY / height;
              recalculaCurvaVia(viaSeleccionada);
            }
          }
        };

        s.mousePressed = (mouseEvent) => {
          if (mouseEventEnCanvas(mouseEvent)) {
            s.loop();
            let boton = mouseEvent.button;
            // mouseEvent.button -> 0 IZQUIERDO, 1 CENTRAL, 2 DERECHO
            if (boton == 0) {
              /* IZQUIERDO */
              if (punteroEnPuntoViaSeleccionda()) {
                let i = indiceClickado(
                  s.mouseX,
                  s.mouseY,
                  traduceAAbsolutos(viaSeleccionada.puntos)
                );
                puntoClickado = viaSeleccionada.puntos[i];
              } else if (punteroEnViaSeleccionada()) {
                insertaPuntoEnViaSeleccionada();
              }
            } else if (boton == 1) {
              borraPuntoClickado();
            } else if (boton == 2) {
              console.log("click botón derecho");
            }
          }
        };

        s.mouseClicked = (mouseEvent) => {
          if (mouseEventEnCanvas(mouseEvent)) {
            if (seleccionandoVia) {
              seleccionandoVia = false;
              viaSeleccionable = null;
              // si se clickó en una vía, se selecciona ésta
              let via = viaBajoPuntero(s.mouseX, s.mouseY);
              if (via) {
                seleccionarViaParaEmpezarAEditar(via);
              } else {
                this.editandoCanvas = false;
              }
              pintaTodo();
            } else {
              if (punteroEnPuntoViaSeleccionda()) {
                indiceMarcado = indiceClickado(
                  s.mouseX,
                  s.mouseY,
                  traduceAAbsolutos(viaSeleccionada.puntos)
                );
              } else if (punteroEnViaSeleccionada()) {
                insertaPuntoEnViaSeleccionada();
                console.error("quiero saber si alguna vez pasará por aquí...");
              } else {
                addPunto(s.mouseX, s.mouseY);
              }
            }
          }
        };

        s.doubleClicked = (mouseEvent) => {
          if (mouseEventEnCanvas(mouseEvent)) {
            this.$emit("doble-click", this.dataCroquis);
          }
        };

        s.mouseMoved = (mouseEvent) => {
          if (mouseEventEnCanvas(mouseEvent)) {
            seleccionaCursor();
            if (seleccionandoVia) {
              pintaTodo();
            }
          } else {
            s.cursor("default");
          }
        };
        // mover ->

        let seleccionarViaParaEmpezarAEditar = (via) => {
          viaSeleccionada = via;
          viaSeleccionada.modificada = true; // nos curamos en salud y decimos que se ha modificado por el mero hecho de haberse seleccionado...
          indiceMarcado = viaSeleccionada.puntos.length - 1;
          this.editandoCanvas = true;
          this.hayCambios = true;
        };

        let borraPuntoClickado = () => {
          let indiceBorrar = indiceClickado(
            s.mouseX,
            s.mouseY,
            traduceAAbsolutos(viaSeleccionada.puntos)
          );
          if (indiceBorrar >= 0 && viaSeleccionada.puntos.length > 2) {
            viaSeleccionada.puntos.splice(indiceBorrar, 1);
            if (indiceBorrar <= indiceMarcado) {
              indiceMarcado--;
            }
            recalculaCurvaVia(viaSeleccionada);
          }
        };

        let addPunto = () => {
          if (viaSeleccionada && indiceMarcado > -1) {
            let nuevoPunto = { x: s.mouseX / width, y: s.mouseY / height };
            indiceMarcado++;
            doAddPuntoEnViaSeleccionada(indiceMarcado + 1, nuevoPunto);
          }
        };

        let insertaPuntoEnViaSeleccionada = () => {
          let nuevoPunto = { x: s.mouseX / width, y: s.mouseY / height };
          puntoClickado = nuevoPunto;
          //índice del punto clickado en la curva
          let indice =
            indicePuntoAnterior(s.mouseX, s.mouseY, viaSeleccionada) + 1;
          indiceMarcado = indice;
          doAddPuntoEnViaSeleccionada(indice, nuevoPunto);
        };

        let doAddPuntoEnViaSeleccionada = (indice, punto) => {
          viaSeleccionada.puntos.splice(indice, 0, punto);
          recalculaCurvaVia(viaSeleccionada);
        };

        /** Retorna el índice, de los puntos de la vía seleccionada, más cercano, hacia atrás, al punto de la curva pasado */
        let indicePuntoAnterior = (x, y, via) => {
          let curva = via.curva;
          let puntos = via.puntos;
          let ind = indiceEnCurva(x, y, via);
          for (let i = ind; i >= 0; i--) {
            for (let j = 0; j < puntos.length; j++) {
              let x = puntos[j].x * width;
              let y = puntos[j].y * height;
              if (
                s.abs(x - curva[i].x) < GROSOR_VIA * 2 &&
                s.abs(y - curva[i].y) < GROSOR_VIA * 2
              ) {
                return j;
              }
            }
          }
          return -1;
        };

        let seleccionaCursor = () => {
          if (puntoClickado || arrastrando) {
            s.cursor("grabbing");
          } else if (seleccionandoVia || punteroEnPuntoViaSeleccionda()) {
            let via = viaBajoPuntero(s.mouseX, s.mouseY);
            if (via) {
              viaSeleccionable = via;
            } else {
              viaSeleccionable = null;
            }
            s.cursor("grab");
          } else if (this.editandoCanvas && punteroEnViaSeleccionada()) {
            s.cursor("row-resize");
          } else if (this.editandoCanvas) {
            s.cursor("crosshair");
          } else {
            s.cursor("default");
          }
        };

        let viaBajoPuntero = (x, y) => {
          for (let i = 0; i < viasCroquis.length; i++) {
            if (indiceEnCurva(x, y, viasCroquis[i]) >= 0) {
              return viasCroquis[i];
            }
          }
          return null;
        };

        let pendienteAB = (a, b) => {
          let difx = b.x - a.x == 0 ? 0.00001 : b.x - a.x;
          return (b.y - a.y) / difx;
        };

        let ordenadaOrigen = (m, a) => {
          return a.y - m * a.x;
        };

        /** retorna si el punto p está a una distancia menor a GROSOR_VIA de la recta (x0, y0, x1, y1) */
        let distanciaMenor = (x0, x1, y0, y1, m, b, p) => {
          if (s.abs(x1 - x0) > s.abs(y1 - y0)) {
            //recorremos eje x
            if (x0 > x1) {
              [x0, x1] = [x1, x0];
            }
            for (let xi = x0; xi < x1; xi++) {
              let y = m * xi + b;
              if (s.abs(s.dist(xi, y, p.x, p.y)) < GROSOR_VIA * 2) {
                return true;
              }
            }
          } else {
            // recorremos eje y
            if (y0 > y1) {
              [y0, y1] = [y1, y0];
            }
            for (let yi = y0; yi < y1; yi++) {
              let x = (yi - b) / m;
              if (s.abs(s.dist(x, yi, p.x, p.y)) < GROSOR_VIA * 2) {
                return true;
              }
            }
          }
          return false;
        };

        let indiceEnCurva = (x, y, via) => {
          let curva = via.curva;
          let puntoClick = { x: x, y: y };
          for (let i = 0; i < curva.length - 1; i++) {
            let m = pendienteAB(curva[i], curva[i + 1]);
            let b = ordenadaOrigen(m, curva[i]);
            if (
              distanciaMenor(
                curva[i].x,
                curva[i + 1].x,
                curva[i].y,
                curva[i + 1].y,
                m,
                b,
                puntoClick
              )
            ) {
              return i;
            }
          }
          return -1;
        };

        let punteroEnPuntoViaSeleccionda = () => {
          if (viaSeleccionada) {
            let x = s.mouseX;
            let y = s.mouseY;
            return (
              indiceClickado(x, y, traduceAAbsolutos(viaSeleccionada.puntos)) >
              -1
            );
          } else {
            return false;
          }
        };

        let indiceClickado = (x, y, puntos) => {
          for (let i = 0; i < puntos.length; i++) {
            let punto = puntos[i];
            if (
              s.abs(punto.x - x) <= RADIO_PUNTO &&
              s.abs(punto.y - y) <= RADIO_PUNTO
            ) {
              return i;
            }
          }
          return -1;
        };

        let punteroEnViaSeleccionada = () => {
          return (
            viaSeleccionada &&
            viaSeleccionada == viaBajoPuntero(s.mouseX, s.mouseY)
          );
        };

        // <- mover
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

        let seleccionarVia = () => {
          seleccionandoVia = true;
          viaSeleccionada = null;
          viaSeleccionable = null;
          this.mostrarLeyenda = false;
          pintaTodo();
        };

        let guardarCambios = () => {
          let modificadas = getViasModificadas();
          let nuevas = getViasNuevas();
          // TODO aquí se pedirá confirmación mostrando las vias modificadas / nuevas
          for (let i = 0; i < modificadas.length; i++) {
            let modificada = {
              via: modificadas[i].via,
              puntos: modificadas[i].puntos, //traduceARelativos(modificadas[i].puntos),
            };
            this.actualizaViaCroquis(modificada);
          }
          for (let i = 0; i < nuevas.length; i++) {
            let nueva = {
              via: nuevas[i].via,
              puntos: nuevas[i].puntos, //traduceARelativos(nuevas[i].puntos),
            };
            this.nuevaViaCroquis(nueva);
          }
          // Marcamos todas las vías como no modificadas y no nuevas
          for (let i = 0; i < viasCroquis.length; i++) {
            viasCroquis[i].modificada = false;
            viasCroquis[i].nueva = false;
          }
          // TODO aquí un spinner o algo informando que todo ha ido bien
          this.hayCambios = false;
          viaSeleccionada = null;
          seleccionandoVia = false;
          viaSeleccionable = null;
          pintaTodo();
          // si hay error pues se informa de lo contrario y se recarga el croquis
        };

        let anadirVia = (via) => {
          // trazo inicial en la mitad de la pantalla
          let nuevosPuntos = [
            { x: 0.5, y: 0.75 },
            { x: 0.5, y: 0.25 },
          ];
          let viaCroquis = {
            via: via,
            puntos: nuevosPuntos,
            curva: interpolate_1(nuevosPuntos, 25, 1),
            modificada: false,
            nueva: true,
          };
          // se añade el trazo recién creado al croquis
          this.croquis.trazos.push(viaCroquis);
          addViaCroquis(viaCroquis);
          seleccionarViaParaEmpezarAEditar(viaCroquis);
          pintaTodo();
        };

        //******************************** */

        let getViasNuevas = () => {
          let nuevas = [];
          //  se comprueban las vías que se han añadido al croquis
          for (let i = 0; i < viasCroquis.length; i++) {
            if (viasCroquis[i].nueva) {
              nuevas.push(viasCroquis[i]);
            }
          }
          return nuevas;
        };

        let getViasModificadas = () => {
          let modificadas = [];
          // se comprueban las vías que han sido modificadas
          for (let i = 0; i < viasCroquis.length; i++) {
            if (viasCroquis[i].modificada && !viasCroquis[i].nueva) {
              modificadas.push(viasCroquis[i]);
            }
          }
          return modificadas;
        };

        let reajusteDimensiones = () => {
          ajustaDimensionesCanvas();
          s.resizeCanvas(width, height);
          recalculaCurvasViasGuardadas();
          pintaTodo();
        };

        let ajustaDimensionesCanvas = () => {
          if (!this.$refs.div_toolbar) {
            width = this.$refs.contenedor_croquis
              ? this.$refs.contenedor_croquis.clientWidth
              : 0;
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
          if (c && c.canvas) {
            return mouseEvent.target == c.canvas;
          }
          return false;
        };

        let pintaPuntos = (via, color, diametro) => {
          let puntos = traduceAAbsolutos(via.puntos);
          for (let i = 0; i < puntos.length; i++) {
            s.noStroke();
            s.fill(color);
            s.circle(puntos[i].x, puntos[i].y, diametro);
          }
        };

        let pintaTodo = () => {
          // cursores
          seleccionaCursor();
          // pintamos la imagen
          s.image(img, 0, 0, width, height);
          // por cada vía grabada en el croquis, pintamos su curva
          for (let i = 0; i < viasCroquis.length; i++) {
            pintaCurva(viasCroquis[i].curva, BLANCO, GROSOR_VIA * 2.25);
            let color;
            if (
              viaSeleccionada &&
              viaSeleccionada.via.id &&
              viaSeleccionada.via.id == viasCroquis[i].via.id
            ) {
              // pintamos los puntos de fondo
              pintaPuntos(viaSeleccionada, BLANCO, RADIO_PUNTO * 2);
              // el color de la curva será el de curva seleccionada
              color = COLOR_SELECCIONADA;
            } else if (
              viaSeleccionable &&
              viaSeleccionable.via.id &&
              viaSeleccionable.via.id == viasCroquis[i].via.id
            ) {
              // pintamos la curva en color seleccionable
              color = COLOR_SELECCIONABLE;
            } else {
              color = COLOR_VIA;
            }
            pintaCurva(viasCroquis[i].curva, color, GROSOR_VIA);
            // de nuevo, en caso de ser la curva seleccionada pintamos los puntos de color
            if (
              viaSeleccionada &&
              viaSeleccionada.via.id &&
              viaSeleccionada.via.id == viasCroquis[i].via.id
            ) {
              pintaPuntos(viaSeleccionada, color, GROSOR_VIA * 4);
            }
          }
          // pintamos la leyenda de las vías
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
          for (let i = 0; i < viasCroquis.length; i++) {
            let via = viasCroquis[i].via;
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
          for (let i = 0; i < viasCroquis.length; i++) {
            let separador = i == 0 ? "" : "; ";
            let anchoAcumulado = s.textWidth(
              lineas[lineas.length - 1] + separador
            );
            let via = viasCroquis[i].via;
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
          for (let i = 0; i < viasCroquis.length; i++) {
            let via = viasCroquis[i];
            let puntoInicial = traduceAAbsolutos([via.puntos[0]])[0];

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
          for (let i = 0; i < viasCroquis.length; i++) {
            let via = viasCroquis[i];
            let puntoInicial = traduceAAbsolutos([via.puntos[0]])[0];
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
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            let viaCroquis = {
              via: this.dataCroquis.trazos[i].via,
              puntos: this.dataCroquis.trazos[i].puntos,
              curva: interpolate_1(this.dataCroquis.trazos[i].puntos, 25, 1),
              modificada: false,
            };
            addViaCroquis(viaCroquis);
          }
        };

        let addViaCroquis = (via) => {
          viasCroquis.push(via);
          this.hayVias = true;
        };

        // TODO método para borrar una vía que ponga la propiedad this.hayVias a false cuando la lista de vías esté vacía

        let recalculaCurvaVia = (via) => {
          if (!via) {
            console.error("se llama con via inválida");
          }
          via.curva = interpolate_1(via.puntos, 25, 1);
        };

        let recalculaCurvasViasGuardadas = () => {
          for (let i = 0; i < viasCroquis.length; i++) {
            recalculaCurvaVia(viasCroquis[i]);
          }
        };

        let traduceAAbsolutos = (puntos) => {
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
          let coordinates = traduceAAbsolutos(puntos);
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
      new p5(this.sketch, "canvas-" + this.dataCroquis.id);
      this.loading = false;
    },
  },

  mounted() {
    this.dataCroquis = this.croquis;
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