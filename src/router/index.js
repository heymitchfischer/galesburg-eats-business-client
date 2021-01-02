import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      requiresGuest: false
    }
  },
  {
    path: '/sign_in',
    name: 'Sign In',
    component: Auth,
    meta: {
      requiresAuth: false,
      requiresGuest: true
    }
  },
  {
    path: '/sign_up',
    name: 'Sign Up',
    component: Auth,
    meta: {
      requiresAuth: false,
      requiresGuest: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Attempt auto-sign-in if necessary before moving forward
  if (store.getters.isLoggedOut && localStorage.getItem('auth')) {
    store.dispatch('autoSignIn').then(() => {
      if (to.meta.requiresAuth && store.getters.isLoggedOut) {
        next({ path: '/sign_in' });
      }

      if (to.meta.requiresGuest && store.getters.isLoggedIn) {
        next({ path: '/' });
      }

      next();
    });
  // Otherwise just move to next route
  } else {
    if (to.meta.requiresAuth && store.getters.isLoggedOut) {
      next({ path: '/sign_in' });
    }

    if (to.meta.requiresGuest && store.getters.isLoggedIn) {
      next({ path: '/' });
    }

    next();
  }
});

export default router;
