<template>
  <div
    :class="detalle ? 'detalle' : 'carrusel container'"
    ref="contenedor_croquis"
  >
    <div v-if="loading && !detalle" class="justify-content-center">
      <icons :icon="['fas', 'spinner']" class="fa-spinner" />
    </div>
    <div class="div_menu" ref="div_toolbar" v-if="detalle">
      <vue-file-toolbar-menu :content="toolbar_fila_1" />
      <vue-file-toolbar-menu :content="toolbar_fila_2" />
    </div>
    <div class="div_cargando" v-if="loading && detalle">
      <div class="justify-content-center">
        <icons :icon="['fas', 'spinner']" class="fa-spinner" />
      </div>
    </div>
    <div :style="{ height: heightScrollBar + 'px' }">
      <perfect-scrollbar ref="scroll">
        <div
          v-bind:id="'canvas-' + croquis.id + detalle"
          class="div_canvas"
          :ref="'ref-canvas-' + croquis.id + detalle"
        ></div>
      </perfect-scrollbar>
    </div>
    <b-modal
      v-if="detalle"
      v-bind:id="'modal-select-via' + croquis.id"
      :ref="'modal-select-via' + croquis.id"
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
    toolbar_fila_1() {
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
            { is: "separator" },
            {
              text: "Salir",
              click: () => this.funcionesCroquis.salir(),
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
                  text: "x1",
                  click: () => {
                    this.funcionesCroquis.zoom(1);
                  },
                  active: this.factorZoom == 1,
                },
                {
                  text: "x1.5",
                  click: () => {
                    this.funcionesCroquis.zoom(1.5);
                  },
                  active: this.factorZoom == 1.5,
                },
                {
                  text: "x2",
                  click: () => {
                    this.funcionesCroquis.zoom(2);
                  },
                  active: this.factorZoom == 2,
                },
                {
                  text: "x3",
                  click: () => {
                    this.funcionesCroquis.zoom(3);
                  },
                  active: this.factorZoom == 3,
                },
                {
                  text: "x5",
                  click: () => {
                    this.funcionesCroquis.zoom(5);
                  },
                  active: this.factorZoom == 5,
                },
                {
                  text: "x10",
                  click: () => {
                    this.funcionesCroquis.zoom(10);
                  },
                  active: this.factorZoom == 10,
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
              text: "Seleccionar",
              click: (e) => this.funcionesCroquis.seleccionarVia(e),
            },
            {
              text: "Añadir...",
              click: () =>
                this.$bvModal.show("modal-select-via" + this.dataCroquis.id),
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
        { is: "spacer" },
        {
          icon: "close",
          title: "Salir",
          click: () => {
            this.funcionesCroquis.salir();
          },
        },
      ];
    },
    toolbar_fila_2() {
      return [
        {
          icon: "zoom_in",
          title: "Zoom in",
          click: () => {
            this.funcionesCroquis.zoomIn();
          },
        },
        {
          icon: "zoom_out",
          title: "Zoom out",
          click: () => {
            this.funcionesCroquis.zoomOut();
          },
        },
        { is: "separator" },
        {
          icon: "restart_alt",
          title: "Refrescar",
          disabled: !this.hayCambios,
          click: (e) => this.funcionesCroquis.deshacerCambios(e),
        },
        {
          icon: "save",
          title: "Guardar",
          disabled: !this.hayCambios,
          click: () => this.funcionesCroquis.guardarCambios(),
        },
        { is: "separator" },
        {
          icon: "add_road",
          title: "Añadir vía al croquis",
          click: () =>
            this.$bvModal.show("modal-select-via" + this.dataCroquis.id),
        },
        {
          icon: "edit_road",
          title: "Editar trazo de vía",
          click: (e) => this.funcionesCroquis.seleccionarVia(e),
          active: this.seleccionandoVia || this.viaSeleccionada != null,
          disabled: !this.hayVias,
        },
        {
          icon: "delete",
          title: "Quitar trazo de vía",
          disabled: this.viaSeleccionada == null,
          click: () => this.funcionesCroquis.borrarViaSeleccionada(),
        },
      ];
    },
  },

  data() {
    return {
      factorZoom: 1,
      factoresZoom: [1, 1.5, 2, 3, 5, 10],
      optionsViasSector: [],
      nuevaVia: null,
      dataCroquis: {},
      dataCroquisCopia: {},
      alto: 1,
      sketch: {},
      loading: false,
      imagen: "",
      mostrarLeyenda: false,
      editandoCanvas: false,
      seleccionandoVia: false,
      viaSeleccionada: null,
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
          if (this.hayCambios) {
            this.$confirm(
              "Los cambios no guardados serán borrados",
              "Descartar cambios",
              "warning",
              { cancelButtonText: "Cancelar", confirmButtonText: "Ok" }
            ).then(() => {
              this.inicializar();
            });
          }
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
        zoom: (z) => {
          console.error("implementación no enlazada", z);
        },
        zoomIn: (e) => {
          console.error("implementación no enlazada", e);
        },
        zoomOut: (e) => {
          console.error("implementación no enlazada", e);
        },
        seleccionarVia: (e) => {
          console.error("implementación no enlazada", e);
        },
        anadirVia: (via) => {
          console.error("implementación no enlazada", via);
        },
        borrarViaSeleccionada: () => {
          console.error("implementación no enlazada");
        },
        manual: (e) => {
          console.error("implementación no enlazada", e);
        },
        acercaDe: (e) => {
          console.error("implementación no enlazada", e);
        },
        salir: () => {
          if (this.hayCambios) {
            this.$confirm(
              "Si cierra esta ventana no se guardarán sus últimos cambios. ¿Salir de todos modos?",
              "Cambios no guardados",
              "question",
              { cancelButtonText: "Cancelar", confirmButtonText: "Ok" }
            ).then(() => {
              this.$emit("salir", this.dataCroquisCopia);
            });
          } else {
            this.$emit("salir", this.dataCroquis);
          }
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
    setDataCroquis(dataCroquis) {
      this.dataCroquisCopia = JSON.parse(JSON.stringify(dataCroquis));
      this.dataCroquis = dataCroquis;
      this.inicializar();
    },

    inicializar() {
      // elimino imagen y canvas actual
      let div_canvas = this.$refs[
        "ref-canvas-" + this.dataCroquis.id + this.detalle
      ];
      if (div_canvas) {
        div_canvas.innerHTML = "";
      }

      // inicializo campos
      this.mostrarLeyenda = false;
      this.editandoCanvas = false;
      this.viaSeleccionada = null;
      this.seleccionandoVia = false;
      this.tipoLeyenda = "barra";
      this.hayVias = false;
      this.hayCambios = false;
      this.loading = true;
      //this.fetchData();
      this.imagen =
        "data:" + this.croquis.formatoImagen + ";base64," + this.croquis.imagen;

      // clono el croquis para poder volver atrás cuando quiera deshacer los cambios
      this.dataCroquis = JSON.parse(JSON.stringify(this.dataCroquisCopia));

      // cargo el sketch
      this.cargaSketch();
    },

    resetModalSelectVia() {
      // relleno las opciones del modal de añadír vía
      let viasSector = this.dataCroquis.sector.vias;
      let trazosCroquis = this.dataCroquis.trazos;
      let options = [];
      for (let i = 0; i < viasSector.length; i++) {
        let option = { value: viasSector[i], text: viasSector[i].nombre };
        if (
          trazosCroquis.some((t) => !t.borrada && t.via.id === viasSector[i].id)
        ) {
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

    async actualizaViaCroquis(viaCroquis) {
      try {
        let token = Vue.getToken();
        const headers = { Authorization: "Bearer " + token };
        let response = this.$http.put(
          "/escuelas/" +
            this.dataCroquis.sector.escuela.id +
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
            this.dataCroquis.sector.escuela.id +
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

    async deleteViaCroquis(viaCroquis) {
      // si es una vía nueva no persistida no hacemos nada
      if (viaCroquis.nueva) {
        return;
      }
      try {
        let token = Vue.getToken();
        const headers = { Authorization: "Bearer " + token };
        let response = this.$http.delete(
          "/escuelas/" +
            this.dataCroquis.sector.escuela.id +
            "/sectores/" +
            this.dataCroquis.sector.id +
            "/croquis/" +
            this.dataCroquis.id +
            "/via/" +
            viaCroquis.via.id,
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
        let c;
        let img;

        const RADIO_PUNTO = 5;
        const GROSOR_VIA = 4;
        //const COLOR_VIA = s.color(255, 50, 240);
        const COLOR_VIA = s.color(0, 0, 0);
        const BLANCO = s.color(255);
        const ROJO = s.color(255, 0, 0);
        const COLOR_SELECCIONABLE = s.color(255, 0, 255);
        const COLOR_SELECCIONADA = s.color(0, 255, 255);
        //const NEGRO = s.color(0);

        // de cada vía se guarda, la vía en sí, su trazo(puntos guardados) y su curva(puntos interpolados), además el estado... si ha sido midificada o es una vía recién añadida
        //let viasCroquis = [];

        //leyenda
        let orientacionLeyenda;

        //seleccionando vía para editar
        let arrastrando = false;

        let viaSeleccionable;

        let puntoClickado = null;
        let indiceMarcado = -1;

        const UNIFORM = 0;
        const CENTRIPETAL = 1;

        // TODO provisional
        let scrollWheelActivado = true;

        /** FUNCIONES p5js */

        s.setup = () => {
          if (this.imagen !== undefined && this.imagen !== null) {
            try {
              img = s.createImg(this.imagen, "", "", function () {
                img.hide();
                ajustaDimensionesCanvas();
                c = s.createCanvas(width, height);
                inicializaVias();
                pintaTodo();
                s.noLoop();
              });
            } catch (e) {
              console.error(e);
            }
          }

          // enlazo las funciones accesibles desde fuera
          this.funcionesCroquis.zoom = zoom;
          this.funcionesCroquis.zoomIn = zoomIn;
          this.funcionesCroquis.zoomOut = zoomOut;
          this.funcionesCroquis.setTipoLeyenda = setTipoLeyenda;
          this.funcionesCroquis.orientacion = orientacion;
          this.funcionesCroquis.mostrarLeyenda = mostrarLeyenda;
          this.funcionesCroquis.seleccionarVia = seleccionarVia;
          this.funcionesCroquis.guardarCambios = guardarCambios;
          this.funcionesCroquis.anadirVia = anadirVia;
          this.funcionesCroquis.borrarViaSeleccionada = borrarViaSeleccionada;
        };

        s.draw = () => {
          if (img) {
            pintaTodo();
          }
        };

        s.windowResized = () => {
          reajusteDimensiones();
        };

        /////////// eventos de ratón ///////////

        s.mouseWheel = (mouseEvent) => {
          if (mouseEventEnCanvas(mouseEvent)) {
            if (mouseEvent.ctrlKey && scrollWheelActivado) {
              if (mouseEvent.wheelDeltaY > 0) {
                zoomIn(mouseEvent);
              } else {
                zoomOut(mouseEvent);
              }
              return false;
            }
          }
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
              recalculaCurvaVia(this.viaSeleccionada);
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
                  traduceAAbsolutos(this.viaSeleccionada.puntos)
                );
                puntoClickado = this.viaSeleccionada.puntos[i];
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
            if (this.seleccionandoVia) {
              this.seleccionandoVia = false;
              viaSeleccionable = null;
              // si se clickó en una vía, se selecciona ésta
              let via = viaBajoPuntero();
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
                  traduceAAbsolutos(this.viaSeleccionada.puntos)
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
            if (this.seleccionandoVia) {
              let via = viaBajoPuntero();
              if (via) {
                viaSeleccionable = via;
              } else {
                viaSeleccionable = null;
              }
              pintaTodo();
            }
          } else {
            s.cursor("default");
          }
        };

        let seleccionarViaParaEmpezarAEditar = (via) => {
          this.viaSeleccionada = via;
          indiceMarcado = this.viaSeleccionada.puntos.length - 1;
          this.editandoCanvas = true;
          //this.hayCambios = true;
        };

        let borraPuntoClickado = () => {
          if (!this.viaSeleccionada) {
            return;
          }
          let indiceBorrar = indiceClickado(
            s.mouseX,
            s.mouseY,
            traduceAAbsolutos(this.viaSeleccionada.puntos)
          );
          if (indiceBorrar >= 0 && this.viaSeleccionada.puntos.length > 2) {
            this.viaSeleccionada.puntos.splice(indiceBorrar, 1);
            if (indiceBorrar <= indiceMarcado) {
              indiceMarcado--;
            }
            recalculaCurvaVia(this.viaSeleccionada);
          }
        };

        let addPunto = () => {
          if (this.viaSeleccionada && indiceMarcado > -1) {
            let nuevoPunto = { x: s.mouseX / width, y: s.mouseY / height };
            indiceMarcado++;
            doAddPuntoEnViaSeleccionada(indiceMarcado /*+ 1*/, nuevoPunto);
          }
        };

        let insertaPuntoEnViaSeleccionada = () => {
          let nuevoPunto = { x: s.mouseX / width, y: s.mouseY / height };
          puntoClickado = nuevoPunto;
          //índice del punto clickado en la curva
          let indice =
            indicePuntoAnterior(s.mouseX, s.mouseY, this.viaSeleccionada) + 1;
          indiceMarcado = indice;
          doAddPuntoEnViaSeleccionada(indice, nuevoPunto);
        };

        let doAddPuntoEnViaSeleccionada = (indice, punto) => {
          this.viaSeleccionada.puntos.splice(indice, 0, punto);
          recalculaCurvaVia(this.viaSeleccionada);
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
          } else if (this.seleccionandoVia) {
            s.cursor("pointer");
          } else if (punteroEnPuntoViaSeleccionda()) {
            s.cursor("grab");
          } else if (this.editandoCanvas && punteroEnViaSeleccionada()) {
            s.cursor("row-resize");
          } else if (this.editandoCanvas) {
            s.cursor("crosshair");
          } else {
            s.cursor("default");
          }
        };

        /**
         * Retorna la vía situada bajo el puntero
         * @return Object La vía bajo el puntero, null si no hay ninguna
         */
        let viaBajoPuntero = () => {
          let x = s.mouseX;
          let y = s.mouseY;
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            if (indiceEnCurva(x, y, this.dataCroquis.trazos[i]) >= 0) {
              return this.dataCroquis.trazos[i];
            }
          }
          return null;
        };

        /**
         * Calcula y retorna la pendiente entre dos puntos.
         * Nunca devolverá pendiente infinita si ambos puntos están en el mismo valor de x
         * @param a El punto a
         * @param b El punto b
         * @return number La pendiente
         */
        let pendiente = (a, b) => {
          let difx = b.x - a.x == 0 ? 0.00001 : b.x - a.x;
          return (b.y - a.y) / difx;
        };

        /**
         * @param m La pendiente
         * @param a El punto
         * @return ordenada en el origen de la recta que pasa con el punto a con pendiente m
         * */
        let ordenadaOrigen = (m, a) => {
          return a.y - m * a.x;
        };

        /**
         * Recorre el segmento ab calculando la distancia con el punto p, buscando si
         * algún punto está a una distancia menor a GROSOR_VIA
         * @param Object a El punto a
         * @param Object b El punto b
         * @param number p  El punto p
         * @return boolean
         */
        let distanciaMenor = (a, b, p) => {
          let m = pendiente(a, b);
          let o = ordenadaOrigen(m, a);

          let ax = a.x;
          let ay = a.y;
          let bx = b.x;
          let by = b.y;

          // quiero recorrer el eje que nos de más puntos
          if (s.abs(bx - ax) > s.abs(by - ay)) {
            //recorremos eje x
            if (ax > bx) {
              [ax, bx] = [bx, ax];
            }
            for (let xi = ax; xi < bx; xi++) {
              let y = m * xi + o;
              if (s.abs(s.dist(xi, y, p.x, p.y)) < GROSOR_VIA * 2) {
                return true;
              }
            }
          } else {
            // recorremos eje y
            if (ay > by) {
              [ay, by] = [by, ay];
            }
            for (let yi = ay; yi < by; yi++) {
              let x = (yi - o) / m;
              if (s.abs(s.dist(x, yi, p.x, p.y)) < GROSOR_VIA * 2) {
                return true;
              }
            }
          }
          return false;
        };

        /**
         * Obtiene y retorna el índice sobre el que está situado el punto (x, y) de la CURVA de la vía pasasda
         * @param number x coordenda X
         * @param number y coordenada Y
         * @param Object via La via
         * @return el índice más próximo a (x, y) o -1 si (x, y) no está en la curva
         */
        let indiceEnCurva = (x, y, via) => {
          let curva = via.curva;
          let puntoClick = { x: x, y: y };
          for (let i = 0; i < curva.length - 1; i++) {
            if (distanciaMenor(curva[i], curva[i + 1], puntoClick)) {
              return i;
            }
          }
          return -1;
        };

        /**
         * @return boolean Si el puntero está sobre un punto de la vía seleccionada
         */
        let punteroEnPuntoViaSeleccionda = () => {
          if (this.viaSeleccionada) {
            let x = s.mouseX;
            let y = s.mouseY;
            let puntosAbsolutos = traduceAAbsolutos(
              this.viaSeleccionada.puntos
            );
            return indiceClickado(x, y, puntosAbsolutos) > -1;
          } else {
            return false;
          }
        };

        /**
         * Calcula si el punto (x, y) está a una distancia menor a una tolerancia
         * dada de alguno de los puntos pasados. El caso afirmatico retorna el índice
         * del array de puntos más próximo.
         * @param number x La coordenada x
         * @param number y La coordenada y
         * @param Array<Object> puntos Array de puntos (ABSOLUTOS)
         * @return el índice en (x, y) o -1 si no hay ninguno
         */
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

        /**
         * @return boolean Si el puntero está sobre la via seleccionada
         */
        let punteroEnViaSeleccionada = () => {
          return (
            this.viaSeleccionada && this.viaSeleccionada == viaBajoPuntero()
          );
        };

        //***** Funciones accesibles desde el DOM *****/

        let zoomIn = (e) => {
          let i = this.factoresZoom.indexOf(this.factorZoom);
          let j = Math.min(i + 1, this.factoresZoom.length - 1);
          zoom(this.factoresZoom[j], e);
        };

        let zoomOut = (e) => {
          let i = this.factoresZoom.indexOf(this.factorZoom);
          let j = Math.max(i - 1, 0);
          zoom(this.factoresZoom[j], e);
        };

        let zoom = (z, e) => {
          if (z === this.factorZoom) {
            return;
          }

          let mouseX0, mouseY0;

          // si vento de un WheelEvent me quedo con las coodenadas de éste sobre la pantalla y
          // calculo pa posición del ratón sobre el canvas de este modo ya que me da problemas
          // con dos WheelEvent seguidos sin mover el ratón s.mouseX y s.mouseY no se actualizaron
          // correctamente en estos casos
          if (e) {
            let rect = e.target.getBoundingClientRect();
            mouseX0 = e.clientX - (rect.left + window.scrollX);
            mouseY0 = e.clientY - (rect.top + window.scrollY);
          } else {
            mouseX0 = s.mouseX;
            mouseY0 = s.mouseY;
          }

          // medidas del canvas actual
          let ancho0 = width;
          let alto0 = height;

          let offsetX = mouseX0 - this.$refs.scroll.$el.scrollLeft;
          let offsetY = mouseY0 - this.$refs.scroll.$el.scrollTop;

          // redimensionamos y pintamos todo
          this.factorZoom = z;
          reajusteDimensiones();

          // posicionamos el scroll de modo que la posición del ratón sobre el canvas0 sea el centro del canvas1
          let mouseX1 = s.map(mouseX0, 0, ancho0, 0, width);
          let mouseY1 = s.map(mouseY0, 0, alto0, 0, height);

          // posicionamos el scroll de modo que el ratón siga apuntando al mismo sitio en el nuevo canvas
          this.$refs.scroll.$el.scrollLeft = mouseX1 - offsetX;
          this.$refs.scroll.$el.scrollTop = mouseY1 - offsetY;
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
          // si había ya una vía seleccionada de desmarca
          if (this.viaSeleccionada) {
            this.viaSeleccionada = null;
            this.seleccionandoVia = false;
          } else {
            this.seleccionandoVia = true;
          }

          viaSeleccionable = null;

          pintaTodo();
        };

        let guardarCambios = () => {
          let modificadas = getViasModificadas();
          let nuevas = getViasNuevas();
          let borradas = getViasBorradas();
          // TODO aquí se pedirá confirmación mostrando las vias modificadas / nuevas
          let stringCambios = [
            modificadas.length > 0
              ? "vías modificadas: [" +
                modificadas.map((t) => t.via.nombre).join(", ") +
                "]"
              : null,
            nuevas.length > 0
              ? "vías nuevas: [" +
                nuevas.map((t) => t.via.nombre).join(", ") +
                "]"
              : null,
            borradas.length > 0
              ? " vías borradas: [" +
                borradas.map((t) => t.via.nombre).join(", ") +
                "]"
              : null,
          ]
            .filter((c) => c != null)
            .join(", ");
          this.$confirm(
            "Los cambios serán guardados. " + stringCambios,
            "Guardar cambios",
            "info",
            { cancelButtonText: "Cancelar", confirmButtonText: "Ok" }
          ).then(() => {
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
            for (let i = 0; i < borradas.length; i++) {
              this.deleteViaCroquis(borradas[i]);
              let indiceBorrar = this.dataCroquis.trazos.indexOf(borradas[i]);
              this.dataCroquis.trazos.splice(indiceBorrar, 1);
            }

            // Marcamos todas las vías como no modificadas y no nuevas
            for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
              this.dataCroquis.trazos[i].modificada = false;
              this.dataCroquis.trazos[i].nueva = false;
            }

            // notificamos que todo ha ido bien... aunque puede no haber sido así... aún no
            // se ha llamado al API una sola vez pero bueno, yo pongo tick verde que seguro que tengo razón
            this.$fire({
              type: "success",
              showConfirmButton: false,
              timer: 1000,
            });

            this.hayCambios = false;
            this.viaSeleccionada = null;
            this.seleccionandoVia = false;
            viaSeleccionable = null;

            pintaTodo();

            // guardo la copia
            this.dataCroquisCopia = JSON.parse(
              JSON.stringify(this.dataCroquis)
            );
          });
        };

        let borrarViaSeleccionada = () => {
          if (
            this.viaSeleccionada &&
            this.dataCroquis.trazos.indexOf(this.viaSeleccionada) > -1
          ) {
            if (this.viaSeleccionada.nueva) {
              // si la vía era nueva la eliminamos directamente
              let indiceBorrar = this.dataCroquis.trazos.indexOf(
                this.viaSeleccionada
              );
              this.dataCroquis.trazos.splice(indiceBorrar, 1);
            } else {
              // marcamos la vía como borrada
              this.viaSeleccionada.borrada = true;
            }
            this.viaSeleccionada = null;
            pintaTodo();
          }
        };

        /**
         * Añade la vía pasada al croquis.
         * Se crea un trazo inicial en mitad de la pantalla y se deja seleccionado.
         * Se añade el trazo el croquis en estado 'nueva'
         * Se pinta todo para que los cambios sean visibles
         * @param Object via La nueva vía
         */
        let anadirVia = (via) => {
          // trazo inicial en la mitad de la pantalla
          let nuevosPuntos = [
            { x: 0.5, y: 0.75 },
            { x: 0.5, y: 0.25 },
          ];

          let viaCroquis;

          // compruebo si las vía ya está en el croquis
          if (
            this.dataCroquis.trazos.filter((t) => t.via.id == via.id).length > 0
          ) {
            // si ya está en el croquis sólo podría estar borrada, la "reactivamos"
            if (
              getViasBorradas().filter((t) => t.via.id == via.id).length > 0
            ) {
              viaCroquis = this.dataCroquis.trazos.filter(
                (t) => t.via.id == via.id
              )[0];
              viaCroquis.borrada = false;
              viaCroquis.modificada = true;
              viaCroquis.puntos = nuevosPuntos;
              viaCroquis.curva = interpolate_1(nuevosPuntos, 25, 1);
            }
          } else {
            viaCroquis = {
              via: via,
              puntos: nuevosPuntos,
              curva: interpolate_1(nuevosPuntos, 25, 1),
              nueva: true,
            };
            // se añade el trazo recién creado al croquis
            addViaCroquis(viaCroquis);
          }

          seleccionarViaParaEmpezarAEditar(viaCroquis);
          pintaTodo();
        };

        //******************************** */

        let getViasNuevas = () => {
          let nuevas = [];
          //  se comprueban las vías que se han añadido al croquis
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            if (this.dataCroquis.trazos[i].nueva) {
              nuevas.push(this.dataCroquis.trazos[i]);
            }
          }
          return nuevas;
        };

        let getViasBorradas = () => {
          let borradas = [];
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            if (this.dataCroquis.trazos[i].borrada) {
              borradas.push(this.dataCroquis.trazos[i]);
            }
          }
          return borradas;
        };

        let getViasModificadas = () => {
          let modificadas = [];
          // se comprueban las vías que han sido modificadas
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            if (
              this.dataCroquis.trazos[i].modificada &&
              !this.dataCroquis.trazos[i].nueva &&
              !this.dataCroquis.trazos[i].borrada
            ) {
              modificadas.push(this.dataCroquis.trazos[i]);
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
              ? this.$refs.contenedor_croquis.getBoundingClientRect().width
              : 0;
          } else {
            width = this.$refs.div_toolbar.getBoundingClientRect().width;
          }
          // dimensión y del scroll
          this.alto = img.height * (width / img.width);
          // ajuste zooom
          width *= this.factorZoom;
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
            pintaPunto(puntos[i], color, diametro);
          }
        };

        let pintaPunto = (punto, color, diametro) => {
          s.noStroke();
          s.fill(color);
          s.circle(punto.x, punto.y, diametro);
        };

        /**
         * Comprueba si hay cambios pendientes en el croquis
         */
        let compruebarEstadoCroquis = () => {
          this.hayCambios =
            getViasModificadas().length > 0 ||
            getViasNuevas().length > 0 ||
            getViasBorradas().length > 0;
          this.hayVias =
            this.dataCroquis.trazos.filter((t) => !t.borrada).length > 0;
          this.editandoCanvas =
            this.viaSeleccionada != null || this.seleccionandoVia;
        };

        let pintaTodo = () => {
          // comprobamos el estado
          compruebarEstadoCroquis();
          // cursores
          seleccionaCursor();
          // pintamos la imagen
          s.image(img, 0, 0, width, height);
          // por cada vía grabada en el croquis, pintamos su curva
          let viasPintables = this.dataCroquis.trazos.filter((t) => !t.borrada);
          for (let i = 0; i < viasPintables.length; i++) {
            pintaCurva(viasPintables[i].curva, BLANCO, GROSOR_VIA * 2.25);
            let color;
            if (
              this.viaSeleccionada &&
              this.viaSeleccionada.via.id &&
              this.viaSeleccionada.via.id == viasPintables[i].via.id
            ) {
              // pintamos los puntos de fondo
              pintaPuntos(this.viaSeleccionada, BLANCO, RADIO_PUNTO * 3);
              // el color de la curva será el de curva seleccionada
              color = COLOR_SELECCIONADA;
            } else if (
              viaSeleccionable &&
              viaSeleccionable.via.id &&
              viaSeleccionable.via.id == viasPintables[i].via.id
            ) {
              // pintamos la curva en color seleccionable
              color = COLOR_SELECCIONABLE;
            } else {
              color = COLOR_VIA;
            }
            pintaCurva(viasPintables[i].curva, color, GROSOR_VIA);
            // de nuevo, en caso de ser la curva seleccionada pintamos los puntos de color
            if (
              this.viaSeleccionada &&
              this.viaSeleccionada.via.id &&
              this.viaSeleccionada.via.id == viasPintables[i].via.id
            ) {
              pintaPuntos(this.viaSeleccionada, color, RADIO_PUNTO * 2);
              pintaPunto(
                traduceAbsoluto(this.viaSeleccionada.puntos[indiceMarcado]),
                ROJO,
                RADIO_PUNTO * 1.5
              );
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
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            let via = this.dataCroquis.trazos[i].via;
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
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            let separador = i == 0 ? "" : "; ";
            let anchoAcumulado = s.textWidth(
              lineas[lineas.length - 1] + separador
            );
            let via = this.dataCroquis.trazos[i].via;
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
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            let via = this.dataCroquis.trazos[i];
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
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            let via = this.dataCroquis.trazos[i];
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
          if (curva != undefined) {
            for (let i = 0; i < curva.length - 1; i++) {
              s.line(curva[i].x, curva[i].y, curva[i + 1].x, curva[i + 1].y);
            }
          }
        };

        let inicializaVias = () => {
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            this.dataCroquis.trazos[i].curva = interpolate_1(
              this.dataCroquis.trazos[i].puntos,
              25,
              1
            );
            this.dataCroquis.trazos[i].modificada = false;
          }
        };

        let addViaCroquis = (via) => {
          this.dataCroquis.trazos.push(via);
          this.hayVias = true;
        };

        // TODO método para borrar una vía que ponga la propiedad this.hayVias a false cuando la lista de vías esté vacía

        let recalculaCurvaVia = (via) => {
          if (!via) {
            console.error("se llama con via inválida");
          }
          via.modificada = true;
          this.hayCambios = true;
          via.curva = interpolate_1(via.puntos, 25, 1);
        };

        let recalculaCurvasViasGuardadas = () => {
          for (let i = 0; i < this.dataCroquis.trazos.length; i++) {
            recalculaCurvaVia(this.dataCroquis.trazos[i]);
          }
        };

        let traduceAAbsolutos = (puntos) => {
          let puntosAbsolutos = [];
          for (let i = 0; i < puntos.length; i++) {
            puntosAbsolutos.push(traduceAbsoluto(puntos[i]));
          }
          return puntosAbsolutos;
        };

        let traduceAbsoluto = (punto) => {
          return {
            x: punto.x * width,
            y: punto.y * height,
          };
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
      new p5(this.sketch, "canvas-" + this.dataCroquis.id + this.detalle);
      this.loading = false;
    },
  },

  mounted() {
    this.$refs.scroll.ps.settings.scrollYMarginOffset = 20; //scroll Y se mostraba a la mínima
    this.dataCroquis = JSON.parse(JSON.stringify(this.croquis));
    this.dataCroquisCopia = JSON.parse(JSON.stringify(this.croquis));
    this.inicializar();
  },
};
</script>
<style>
.detalle {
  max-width: 100% !important;
}
.carrusel {
  max-width: 85% !important;
  padding-right: 0px !important;
  padding-left: 0px !important;
}
.detalle > div > .ps > div > canvas {
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