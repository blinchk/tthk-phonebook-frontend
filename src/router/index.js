import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Home from '../views/Home.vue';
import Contacts from '../views/contacts/Contacts.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register';
import NewContact from '../views/contacts/NewContact';

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
    path: '/contacts/add',
    name: 'New Contact',
    component: NewContact
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
