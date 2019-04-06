import Vue from 'vue'
import Router from 'vue-router'
import EventListItem from '@/components/home/EventListItem'
import 'vuetify/dist/vuetify.min.css'
import MapView from '@/components/home/MapView'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import VueTouch from 'vue-touch'
import Room from '@/components/room/Room'

Vue.use(VueTouch, { name: 'v-touch' });
Vue.use(Vuetify, {
  theme: {
    primary: '#00A99D',
    accent: '#FF6619',
    secondary: '#494949',
    secondaryText: '#8E8E8E'
  }
});

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: MapView
    },
    {
      path: '/event',
      name: 'EventListItem',
      component: EventListItem
    },
    {
      path: '/room/:roomId',
      name: 'Room',
      component: Room
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
});
