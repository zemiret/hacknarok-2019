<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card>
      <v-card-title>
        Dodaj event
      </v-card-title>
      <v-card-text>
        <v-text-field label="Nazwa" v-model="form.name" :rules="nameRules" :counter="128" required></v-text-field>
        <v-text-field label="Opis" v-model="form.caption" :rules="descRules" :counter="256" required></v-text-field>
        <v-select :items="store.categories" v-model="form.category" label="Kategoria" item-text="caption" item-key="pk" data-vv-name="select"
          required></v-select>
          <span>Start</span>
        <v-time-picker full-width landspace v-model="form.time" format="24hr"></v-time-picker>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" flat @click="submit" :disabled="!valid">
          submit
        </v-btn>
        <v-btn color="primary" flat @click.stop="hideDialog">Zamknij</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import {API_URL} from '@/constants.js'

export default {
  data() {
    return {
      valid: true,
      form: {
        name: "",
        category: "",
        caption: "",
        time: "11:15"
      },
      store: this.$store.data,
      nameRules: [
        v => !!v || "Nazwa jest wymagana",
        v => (v && v.length <= 128) || "Nazwa musi być krótsza niż 128 znaków"
      ],
      descRules: [
        v => !!v || "Opis jest wymagany",
        v => (v && v.length <= 256) || "Opis musi być krótszy niż 256 znaków"
      ]
    };
  },

  methods: {
    hideDialog() {
      this.$store.bus.$emit("hide-dialog");
    },
    submit() {
      if (!this.$refs.form.validate()) return;
      let time = new Date();
      this.form.start = time.getFullYear()+'-0'+time.getMonth()+'-'+time.getDate()+' '+this.form.time
      console.log(this.form.start)
      this.$http.post(API_URL + "rooms/",this.form).then(
        data => {
          this.$store.data.rooms = data.body;
        },
        data => {
          this.error = data.err;
        }
      );
    }
  }
};
</script>
<style>

</style>
