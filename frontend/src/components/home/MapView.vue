<template>
  <div class="map-wrapper">

    <v-dialog v-model="this.is_dialog_open" max-width="400px" class="clan-dialog">
        <clan-list></clan-list>
    </v-dialog>

    <l-map :zoom="zoom" :center="center" class="map">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>


    <v-btn bottom fab right fixed @click="is_dialog_open = !is_dialog_open" class="clan-btn">
        Vikings list
    </v-btn>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import ClanList from '../clans/ClanList';


export default {
  name: "MapView",
  data: function data() {
    return {
      zoom:13,
      center: L.latLng(47.413220, -1.219482),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      is_dialog_open: false,
    }
  },
  mounted() {
    this.$store.bus.$on('hide-dialog', () => {
      this.is_dialog_open = false;
    });
  },
  components: {
    ClanList,
    LMap,
    LTileLayer,
    LMarker,
  }
};
</script>
<style>

.map-wrapper {
  height: 100%;
  width: 100%;
}

.clan-btn {
    margin-bottom: 80px;
    position: absolute;
}

.map {
  z-index: 0;
}
</style>
