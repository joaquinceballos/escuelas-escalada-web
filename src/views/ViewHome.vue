<template>
  <div class="home">
    <NavBar @logeado="logeado" :key="componentKey" />
    <home :key="homeKey ? homeKey : 500" />
    <b-alert
      :show="dismissCountDown"
      dismissible
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000"
      variant="warning"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ $t("message.home.alert.token") }}
    </b-alert>
  </div>
</template>
<script>
import NavBar from "../components/escuelas/NavBar";
import home from "../components/escuelas/home";
export default {
  components: {
    NavBar,
    home,
  },
  data() {
    return {
      dismissCountDown: 0,
      componentKey: 0,
    };
  },
  props: {
    tokenCaducado: {
      type: Boolean,
    },
    homeKey: {
      type: [Number, String],
    },
  },
  methods: {
    logeado() {
      this.componentKey += 1;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
  mounted() {
    this.dismissCountDown = this.tokenCaducado ? 5 : 0;
  },
};
</script>
