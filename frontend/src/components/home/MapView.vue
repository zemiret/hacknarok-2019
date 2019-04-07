<template>
    <div class="map-wrapper">

        <v-dialog v-model="this.is_dialog_open" max-width="400px" class="clan-dialog">
            <clan-list></clan-list>
        </v-dialog>

        <l-map :zoom="zoom" :center="center" class="map">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="user_marker"></l-marker>
            <l-marker v-for="marker in markers" :lat-lng="marker" :key="marker.lat"></l-marker>

<!--            <l-polygon-->
<!--                    v-for="polygon in polygons"-->
<!--                    :key="polygon.latlngs"-->
<!--                    :lat-lngs="polygon.latlngs"-->
<!--                    :color="polygon.color">-->
<!--            </l-polygon>-->
        </l-map>


        <v-btn bottom fab right fixed @click="is_dialog_open = !is_dialog_open" class="clan-btn">
            Vikings list
        </v-btn>
    </div>
</template>

<script>
  import { LMap, LTileLayer, LMarker, LPolygon } from 'vue2-leaflet';
  import ClanList from '../clans/ClanList';

  export default {
    name: 'MapView',
    data: () => {
      return {
        zoom: 13,
        center: L.latLng(47.1969447, -1.6136169),
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        // marker: L.latLng(47.413220, -1.219482),
        user_marker: L.latLng(47.413220, -1.219482),
        is_dialog_open: false,
        markers: [
          L.latLng(50.028107999999995, 19.8719436),
          L.latLng(50.008108999999995, 19.8619536),
          L.latLng(50.018109999999995, 19.8919636),
        ],
        // polygon: {
        //   latlngs: [[47.2263299, -1.6222], [47.21024000000001, -1.6270065], [47.1969447, -1.6136169], [47.18527929999999, -1.6143036], [47.1794457, -1.6098404], [47.1775788, -1.5985107], [47.1676598, -1.5753365], [47.1593731, -1.5521622], [47.1593731, -1.5319061], [47.1722111, -1.5143967], [47.1960115, -1.4841843], [47.2095404, -1.4848709], [47.2291277, -1.4683914], [47.2533687, -1.5116501], [47.2577961, -1.5531921], [47.26828069, -1.5621185], [47.2657179, -1.589241], [47.2589612, -1.6204834], [47.237287, -1.6266632], [47.2263299, -1.6222]],
        //   color: '#ff00ff',
        // },
        polygons: [
          'what',
          // this.createPolygon()
          // this.createPolygon(L.latLng(50.008108999999995, 19.8619536), 0.1, '#005555'),
          // this.createPolygon(L.latLng(50.008108999999995, 19.8619536), 0.2, '#ff5555'),
        ],
      };
    },
    mounted() {
      this.$store.bus.$on('hide-dialog', () => {
        this.is_dialog_open = false;
      });
    },
    methods: {
      createPolygon: (centerLatLng, range, color) => {
        return 'What';
        // const lat = centerLatLng.lat;
        // const lng = centerLatLng.lng;
        //
        // return {
        //   latlngs: [
        //     [lat - range / 3, lng - 2 * range / 3],
        //     [lat + range / 3, lng - 2 * range / 3],
        //     [lat + range, lng],
        //     [lat + range / 3, lng + 2 * range / 3],
        //     [lat - range / 3, lng + 2 * range / 3],
        //     [lat - range, lng],
        //   ],
        //   color: color
        // };
      }
    },
    beforeMount() {
      this.$watchLocation({
        enableHighAccuracy: true, //defaults to false
        timeout: 1000 //defaults to Infinity
      })
        .then(coordinates => {
          const lat = coordinates.lat;
          const lng = coordinates.lng;

          console.log(coordinates);

          this.user_marker = L.latLng(lat, lng);
          // this.center = L.latLng(lat, lng);
        });
    },
    components: {
      ClanList,
      LMap,
      LTileLayer,
      LMarker,
      LPolygon
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
