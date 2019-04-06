import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// import middleware from '@/middleware/middleware'
import store from '@/store/store.js'
// import {API_URL} from '@/constants.js'
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(store)


// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// middleware(router)
//
// Vue.http.interceptors.push((request, next) => {
//   let token = window.localStorage.getItem('token')
//
//   if (token) {
//     request.headers.set('Authorization', `JWT ${token}`)
//   }
//   next((response) => {
//     if (response.status === 401) {
//       return Vue.http.post(API_URL + 'api-token-refresh/', {token: token}).then((result) => {
//           return Vue.http(request).then((response) => {
//             return response
//           })
//         })
//         .catch((eee) => {
//           console.log(eee)
//           return router.push('login')
//         })
//     }
//   })
// })


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
