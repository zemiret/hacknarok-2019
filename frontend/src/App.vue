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
* {
  font-family: "Montserrat";
}
</style>
