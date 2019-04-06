<template>
    <div>
        Profile here
    </div>
</template>

<script>
  export default {
    name: "ProfileView",
    data: function data() {
      return {}
    },
    mounted() {
      // TODO: Call get here on user
      console.log(this.$route.params);
      // this.$http.get(API_URL + "categories/").then(
      //   data => {
      //     this.store.categories = data.body;
      //   },
      //   data => {
      //     this.error = data.err;
      //   }
      // );
      // this.$http.get(API_URL + "rooms/").then(
      //   data => {
      //     this.$store.data.rooms = data.body;
      //   },
      //   data => {
      //     this.error = data.err;
      //   }
      // );
      // this.getLocationAndCenter();
    },
  };
</script>
<style>

</style>
