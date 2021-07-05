<template>
  <b-modal
    id="modal_ayuda"
    ref="modal_ayuda"
    size="lg"
    ok-only
    v-bind:title="$t('message.ayuda.header')"
  >
    <main class="ayuda-main">
      <perfect-scrollbar ref="scroll">
        <div>
          <h1>{{ $t("message.ayuda.titulo") }}</h1>
          <p>{{ $t("message.ayuda.p1") }}</p>
          <section id="exportar">
            <h2>{{ $t("message.ayuda.exportar.titulo") }}</h2>
            <p>
              {{ $t("message.ayuda.exportar.p1") }}
              <b> {{ $t("message.ayuda.exportar.croquis") }}</b> /
              <b> {{ $t("message.ayuda.exportar.exportar") }}</b
              >.
            </p>
          </section>
          <section id="editar-croquis">
            <h2>{{ $t("message.ayuda.editar.titulo") }}</h2>
            <p>{{ $t("message.ayuda.editar.p1") }}</p>
            <section id="anadir-via">
              <h3>{{ $t("message.ayuda.editar.anadir.titulo") }}</h3>
              <p>
                {{ $t("message.ayuda.editar.anadir.p1a") }}
                <b>{{ $t("message.ayuda.editar.anadir.via") }}</b> /
                <b>{{ $t("message.ayuda.editar.anadir.anadir") }}</b>
                {{ $t("message.ayuda.editar.anadir.p1b") }}
                <img
                  :src="imagenes.anadir_via.url"
                  :alt="imagenes.anadir_via.alt"
                />.
              </p>
              <p>{{ $t("message.ayuda.editar.anadir.p2") }}</p>
              <p>{{ $t("message.ayuda.editar.anadir.p3") }}</p>
              <p>{{ $t("message.ayuda.editar.anadir.p4") }}</p>
            </section>
            <section id="modificar-via">
              <h3>{{ $t("message.ayuda.editar.modificar.titulo") }}</h3>
              <p>
                {{ $t("message.ayuda.editar.modificar.p1a") }}
                <b>{{ $t("message.ayuda.editar.modificar.via") }}</b> /
                <b>{{ $t("message.ayuda.editar.modificar.seleccionar") }}</b>
                {{ $t("message.ayuda.editar.modificar.p1b") }}
                <img
                  :src="imagenes.seleccionar_via.url"
                  :alt="imagenes.seleccionar_via.alt"
                />
                {{ $t("message.ayuda.editar.modificar.p1c") }}
              </p>
              <p>{{ $t("message.ayuda.editar.modificar.p2") }}</p>
              <div class="text-center mb-2">
                <img
                  :src="imagenes.borrar_punto.url"
                  :alt="imagenes.borrar_punto.alt"
                />
              </div>
              <p>
                {{ $t("message.ayuda.editar.modificar.p3a") }}
                <img :src="imagenes.borrar.url" :alt="imagenes.borrar.alt" />
                {{ $t("message.ayuda.editar.modificar.p3b") }}
              </p>
              <p>
                {{ $t("message.ayuda.editar.modificar.p4a") }}
                <b>{{ $t("message.ayuda.editar.modificar.croquis") }} </b> /
                <b>{{ $t("message.ayuda.editar.modificar.guardar") }} </b>
                {{ $t("message.ayuda.editar.modificar.p4b") }}
                <img :src="imagenes.guardar.url" :alt="imagenes.guardar.alt" />
                {{ $t("message.ayuda.editar.modificar.p4c") }}
              </p>
              <p>
                {{ $t("message.ayuda.editar.modificar.p5a") }}
                <b> {{ $t("message.ayuda.editar.modificar.edicion") }}</b> /
                <b>{{ $t("message.ayuda.editar.modificar.recargar") }}</b>
                {{ $t("message.ayuda.editar.modificar.p5b") }}
                <img
                  :src="imagenes.recargar.url"
                  :alt="imagenes.recargar.alt"
                />
                {{ $t("message.ayuda.editar.modificar.p5c") }}
              </p>
            </section>
            <section id="leyenda">
              <h3>{{ $t("message.ayuda.editar.leyenda.titulo") }}</h3>
              <div class="text-center mb-2">
                <img :src="imagenes.leyenda.url" :alt="imagenes.leyenda.alt" />
              </div>
              <p>{{ $t("message.ayuda.editar.leyenda.p1") }}</p>
              <p>
                {{ $t("message.ayuda.editar.leyenda.p2") }}
                <b>{{ $t("message.ayuda.editar.leyenda.formato") }} </b>/
                <b>{{ $t("message.ayuda.editar.leyenda.leyenda") }}</b
                >.
              </p>
              <ul>
                <li>{{ $t("message.ayuda.editar.leyenda.caja") }}</li>
                <li>{{ $t("message.ayuda.editar.leyenda.barra") }}</li>
                <li>{{ $t("message.ayuda.editar.leyenda.via") }}</li>
              </ul>
              <p>{{ $t("message.ayuda.editar.leyenda.p3") }}</p>
              <p>{{ $t("message.ayuda.editar.leyenda.p4") }}</p>
            </section>
          </section>
          <section id="zoom">
            <h2>{{ $t("message.ayuda.zoom.titulo") }}</h2>
            <p>
              {{ $t("message.ayuda.zoom.p1a") }}
              <b>{{ $t("message.ayuda.zoom.ver") }} </b> /
              <b>{{ $t("message.ayuda.zoom.zoom") }}</b>
              {{ $t("message.ayuda.zoom.p1b") }}
              <img :src="imagenes.zoom.url" :alt="imagenes.zoom.alt" />
            </p>
            <p>{{ $t("message.ayuda.zoom.p2") }}</p>
            <p>{{ $t("message.ayuda.zoom.p3") }}</p>
          </section>
          <section id="salir">
            <h2>{{ $t("message.ayuda.salir.titulo") }}</h2>
            <p>{{ $t("message.ayuda.salir.p1") }}</p>
          </section>
        </div>
      </perfect-scrollbar>
      <nav class="section-nav">
        <ol>
          <li>
            <a href="#exportar">{{ $t("message.ayuda.exportar.titulo") }}</a>
          </li>
          <li>
            <a href="#editar-croquis">{{
              $t("message.ayuda.editar.titulo")
            }}</a>
            <ul>
              <li>
                <a href="#anadir-via">{{
                  $t("message.ayuda.editar.anadir.titulo")
                }}</a>
              </li>
              <li>
                <a href="#modificar-via">{{
                  $t("message.ayuda.editar.modificar.titulo")
                }}</a>
              </li>
              <li>
                <a href="#leyenda">{{
                  $t("message.ayuda.editar.leyenda.titulo")
                }}</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#zoom">{{ $t("message.ayuda.zoom.titulo") }}</a>
          </li>
          <li>
            <a href="#salir">{{ $t("message.ayuda.salir.titulo") }}</a>
          </li>
        </ol>
      </nav>
    </main>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      imagenes: {
        anadir_via: {
          url: require("../../../assets/img/manual/anadir_via.png"),
          alt: this.$t("message.ayuda.imagenes.alt.anadir_via"),
        },
        seleccionar_via: {
          url: require("../../../assets/img/manual/seleccionar_via.png"),
          alt: this.$t("message.ayuda.imagenes.alt.seleccionar_via"),
        },
        borrar_punto: {
          url: require("../../../assets/img/manual/borrar_punto.png"),
          alt: this.$t("message.ayuda.imagenes.alt.borrar_punto"),
        },
        borrar: {
          url: require("../../../assets/img/manual/borrar.png"),
          alt: this.$t("message.ayuda.imagenes.alt.borrar"),
        },
        guardar: {
          url: require("../../../assets/img/manual/guardar.png"),
          alt: this.$t("message.ayuda.imagenes.alt.guardar"),
        },
        recargar: {
          url: require("../../../assets/img/manual/recargar.png"),
          alt: this.$t("message.ayuda.imagenes.alt.recargar"),
        },
        zoom: {
          url: require("../../../assets/img/manual/zoom.png"),
          alt: this.$t("message.ayuda.imagenes.alt.zoom"),
        },
        leyenda: {
          url: require("../../../assets/img/manual/leyenda.png"),
          alt: this.$t("message.ayuda.imagenes.alt.leyenda"),
        },
      },
    };
  },
  methods: {
    mostrar() {
      this.$bvModal.show("modal_ayuda");
    },
    resetModalAyuda() {
      console.log("reset");
    },
  },
  created() {
    window.addEventListener("DOMContentLoaded", () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.intersectionRatio > 0) {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              .parentElement.classList.add("active");
          } else {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              .parentElement.classList.remove("active");
          }
        });
      });

      // Track all sections that have an `id` applied
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.observe(section);
      });
    });
  },
};
</script>
<style>
main.ayuda-main > .ps {
  height: 600px;
}

/* 2. Make nav sticky */
main.ayuda-main > nav {
  position: sticky;
  top: 2rem;
  align-self: start;
}

/* 3. ScrollSpy active styles (see JS tab for activation) */
.section-nav li.active > a {
  color: #333;
  font-weight: 500;
}

/* Sidebar Navigation */
.section-nav {
  padding-left: 0;
  border-left: 1px solid #efefef;
}

.section-nav a {
  text-decoration: none;
  display: block;
  padding: 0.125rem 0;
  color: #ccc;
  transition: all 50ms ease-in-out; /* 💡 This small transition makes setting of the active state smooth */
}

.section-nav a:hover,
.section-nav a:focus {
  color: #666;
}

/** page layout **/
main.ayuda-main {
  display: grid;
  grid-template-columns: 1fr 15em;
  max-width: 100em;
  width: 90%;
  margin: 0 auto;
}
</style>
    
    