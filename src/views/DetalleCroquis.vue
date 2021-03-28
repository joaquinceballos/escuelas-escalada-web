<template>
  <div>
    <NavBar />
    <Croquis :croquis="dataCroquis" :alto="700" v-if="dataCroquis.id" :detalle="true"/>
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import Croquis from "../components/escuelas/Croquis";
import Vue from "vue";
export default {
  components: {
    NavBar,
    Croquis,
  },
  data() {
    return {
      dataCroquis: {},
    };
  },
  props: {
    idEscuela: {
      type: Number,
    },
    idSector: {
      type: Number,
    },
    idCroquis: {
      type: Number,
    },
    croquis: {
      type: Object,
    },
  },
  mounted() {
    if (this.croquis == null) {
      let token = Vue.getToken();
      const headers = { Authorization: "Bearer " + token };
      this.$http
        .get(
          "/escuelas/" +
            this.idEscuela +
            "/sectores/" +
            this.idSector +
            "/croquis/" +
            this.idCroquis,
          {
            headers,
          }
        )
        .then((response) => {
          this.dataCroquis = response.data.data;
          this.dataCroquis.idEscuela = this.idEscuela;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.dataCroquis = this.croquis;
      this.dataCroquis.idEscuela = this.idEscuela;
    }
  },
};
</script>