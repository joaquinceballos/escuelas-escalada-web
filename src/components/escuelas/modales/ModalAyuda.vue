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
              <b> {{ $t("message.ayuda.exportar.exportar") }}</b>
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
                {{ $t("message.ayuda.editar.modificar.p1c") }}
              </p>
              <p>{{ $t("message.ayuda.editar.modificar.p2") }}</p>
              <p>
                {{ $t("message.ayuda.editar.modificar.p3a") }}
                {{ $t("message.ayuda.editar.modificar.p3b") }}
              </p>
              <p>
                {{ $t("message.ayuda.editar.modificar.p4a") }}
                <b>{{ $t("message.ayuda.editar.modificar.croquis") }} </b> /
                <b>{{ $t("message.ayuda.editar.modificar.guardar") }} </b>
                {{ $t("message.ayuda.editar.modificar.p4b") }}
                {{ $t("message.ayuda.editar.modificar.p4c") }}
              </p>
              <p>
                {{ $t("message.ayuda.editar.modificar.p5a") }}
                <b> {{ $t("message.ayuda.editar.modificar.edicion") }}</b> /
                <b>{{ $t("message.ayuda.editar.modificar.recargar") }}</b>
                {{ $t("message.ayuda.editar.modificar.p5b") }}
                {{ $t("message.ayuda.editar.modificar.p5c") }}
              </p>
            </section>
            <section id="leyenda">
              <h3>{{ $t("message.ayuda.editar.leyenda.titulo") }}</h3>
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
    return {};
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
    
    