import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CarbonDataForm from '../components/CarbonDataForm.vue';
import Credits from '../components/Credits.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/CarbonDataForm',
    name: 'carbon-data-form',
    component: CarbonDataForm,
  },
  {
    path: '/Credits',
    name: 'credits-card',
    component: Credits,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
