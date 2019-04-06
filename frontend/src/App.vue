<template>
  <v-app>
    <v-content pa-0>
      <v-container fill-height fill-width pa-0 fluid>
        <transition name="fade">
        <router-view :key="$route.fullPath"/>
        </transition>

    <v-btn small top fab right fixed class="center-button" v-if="this.isLoggedIn()" @click="logout">
      <v-icon dark>exit_to_app</v-icon>
    </v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { API_URL } from "@/constants.js";
export default {
  name: "app",
  methods: {
    isLoggedIn() {
      return this.$store.user.token() &&
        this.$route.name !== "Login" &&
        this.$route.name !== "Register";
    },
    logout() {
      this.$store.user.logout(this.$router);
    }
  }
};
</script>

<style>
html {
  overflow: auto;
}

.gradient-background {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 169, 157, 1) 100%
  );
  background-color: transparent !important;
  color: #ffffff;
  pointer-events: none;
}

.pointer-events {
  pointer-events: all;
}

* {
  font-family: "Montserrat";
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  position: absolute;
  opacity: 0;
}
</style>
