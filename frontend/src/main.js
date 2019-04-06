import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// import middleware from '@/middleware/middleware'
import store from '@/store/store.js'
// import {API_URL} from '@/constants.js'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(store)

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
