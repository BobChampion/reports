import Vue from 'vue';
import VueRouter from 'vue-router';
import MyHome from '../components/MyHome';
import MyStreams from '../views/adspect/MyStreams.vue';
import StreamsWithClick from '../views/adspect/StreamsWithClick.vue';
import VoluumnError from '../views/voluumn/VoluumnError.vue';
import VoluumnValidator from '../views/voluumn/VoluumnValidator.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MyHome',
    component: MyHome,
  },
  {
    path: '/adspect/streams',
    name: 'MyStreams',
    component: MyStreams,
  },
  {
    path: '/adspect/streamswithclick',
    name: 'StreamsWithClick',
    component: StreamsWithClick,
  },
  {
    path: '/voluumn/voluumnerror',
    name: 'VoluumnError',
    component: VoluumnError,
  },
  {
    path: '/voluumn/validator',
    name: 'VoluumnValidator',
    component: VoluumnValidator,
  },
];

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'router-link-active',
  routes,
});

export default router;
