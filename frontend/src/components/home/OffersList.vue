<template>
  <div>
    <div id="swipe-container" v-on:swipeup="toggle" class="swipe mx-auto" fill-width grid-list-md text-xs-center>
      <v-touch @swipeup="toggle" @swipedown="toggle">
        <div class="button-wrapper">
          <v-btn style="display: inline-block; width: 100%" class="trigger-button" color="primary" depressed @click="toggle">
            <v-icon v-if="collapsed">keyboard_arrow_up</v-icon>
            <v-icon v-else>keyboard_arrow_down</v-icon>
          </v-btn>
        </div>
      </v-touch>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap align-content-space-around justify-space-around>
            <eventListItem
              color="primary"
              v-for="item in store.rooms"
              @click.native="goToRoom(item.pk)"
              :key="item.pk"
              :event="item">
            </eventListItem>
          </v-layout>
        </v-container>
    </div>
  </div>
</template>
<script>
  import EventListItem from "./EventListItem.vue";

  export default {
    name: "OffersList",
    mounted() {
      this.toggle();
    },
    data() {
      return {
        store: this.$store.data,
        collapsed: false
      };
    },
    methods: {
      toggle: function () {
        this.collapsed = !this.collapsed
        let element = document.getElementById("swipe-container")
        if (this.collapsed) {
          element.classList.remove("swipe-active")
          element.scrollTo(0, 0)
        } else {
          element.classList.add("swipe-active")
        }
      },
      goToRoom: function(roomId) {
        this.$router.push({ name: 'Room', params: { roomId: roomId } });
      }
    },
    components: {
      EventListItem
    }
  };

</script>
<style>
  .swipe {
    right: 0;
    left: 0;
    transition: all 0.5s;
    text-align: center;
    width: 100%;
    position: fixed;
    z-index: 10;
    background: #f7f7f7;
    overflow: hidden;
    max-height: 100%;
  }

  .swipe-active {
    transform: translateY(-100%);
    overflow: auto;
    margin-top:60px;
  }

  .trigger-button {
    max-width: 70%;
    margin: 8pt auto;
  }

  .align--left {
    text-align: left;
  }

  .button-wrapper {
    width: 100%;
    height: 60px;
    background: #00a99d;
  }
</style>
