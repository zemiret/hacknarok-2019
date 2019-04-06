import Vue from 'vue'
import {loaded} from 'vue2-google-maps';

var settings = new Vue({
  data: {
    defaultIconSettings: {},
    defaultMapOptions: {
      disableDefaultUI: true,
      clickableIcons: false,
      streetViewControl: false,
      panControlOptions: false,
      gestureHandling: 'greedy'
    }
  }
})


export default {
  settings,
  build: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  }
}
//
loaded.then(() => {
  disableDefaultUI:true;
  /* google.maps.Size is now available! */
  settings.defaultIconSettings = "./static/img/icon_map.png"
  /* Do something with google.maps.Size */
})
