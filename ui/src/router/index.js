import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CarbonDataForm from '../components/CarbonDataForm.vue';
import AssetCard from '../components/AssetCard.vue';

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
    path: '/AssetCard',
    name: 'asset-card',
    component: AssetCard,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
