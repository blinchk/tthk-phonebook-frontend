import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Home from '../views/Home.vue';
import Contacts from '../views/Contacts.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register';
import NewContact from '../views/NewContact';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
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
  },
  {
    path: '/add',
    name: 'New Contact',
    component: NewContact
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
