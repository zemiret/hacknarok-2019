<template>
  <div class="full-width">
    <v-toolbar class="no-bg" flat height="100">
      <v-container align-center grid-list-lg text-xs-center>
        <v-toolbar-title class="white--text display-3" style="font-weight: bold">WeLearn</v-toolbar-title>
      </v-container>
    </v-toolbar>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 md10 offset-md2 lg6 offset-lg3>
          <v-card>
            <v-card-text>
              <v-form ref="form" style="width: 100%">
                <v-container fill-height fluid>
                  <v-layout fill-height row wrap>
                    <v-flex offset-md1 xs12 md10>
                      <v-text-field label="Login" :rules="requiredRule" v-model="credentials.username"
                                    required></v-text-field>
                    </v-flex>
                    <v-flex offset-md1 xs12 md10>
                      <v-text-field label="Hasło" type="password" :rules="requiredRule" v-model="credentials.password"
                                    required></v-text-field>
                    </v-flex>
                    <v-flex offset-md1 xs12 md10>
                      <v-btn color="primary" block round depressed type="Zaloguj" v-on:click="login">Log in</v-btn>
                    </v-flex>
                    <v-flex offset-md1 xs12 md10>
                      Nie masz jeszcze konta?
                      <router-link to="/register">Zarejestruj się</router-link>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {
    API_URL
  } from "@/constants.js";
  export default {
    data() {
      return {
        credentials: {
          username: "",
          password: ""
        },
        requiredRule: [v => !!v || "To pole jest wymagane"],
      };
    },
    methods: {
      login() {
        if(!this.$refs.form.validate()) return;
        this.$http
          .post(API_URL + "api-token-auth/", this.credentials)
          .then(response => {
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem('userPk', response.data.pk);
            this.$router.push("/");
          })
          .catch(errors => {
            console.log(errors);
          });
      }
    }
  };

</script>

<style>
  #app {
    background: #00a99d;
  }

  .full-width {
    width: 100%;
  }

  .no-bg {
    background: transparent !important;
  }

</style>
