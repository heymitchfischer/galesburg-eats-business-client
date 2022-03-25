import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import NewBusiness from '../views/NewBusiness.vue';
import Business from '../views/Business.vue';
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      requiresAbsenceOfAuth: false
    }
  },
  {
    path: '/sign_in',
    name: 'Sign In',
    component: Auth,
    meta: {
      requiresAuth: false,
      requiresAbsenceOfAuth: true
    }
  },
  {
    path: '/sign_up',
    name: 'Sign Up',
    component: Auth,
    meta: {
      requiresAuth: false,
      requiresAbsenceOfAuth: true
    }
  },
  {
    path: '/businesses/new',
    name: 'New Business',
    component: NewBusiness,
    meta: {
      requiresAuth: true,
      requiresAbsenceOfAuth: false
    }
  },
  {
    path: '/businesses/:slug',
    name: 'Business',
    component: Business,
    meta: {
      requiresAuth: true,
      requiresAbsenceOfAuth: false
    }
  }
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

      if (to.meta.requiresAbsenceOfAuth && store.getters.isLoggedIn) {
        next({ path: '/' });
      }

      next();
    });
  // Otherwise just move to next route
  } else {
    if (to.meta.requiresAuth && store.getters.isLoggedOut) {
      next({ path: '/sign_in' });
    }

    if (to.meta.requiresAbsenceOfAuth && store.getters.isLoggedIn) {
      next({ path: '/' });
    }

    next();
  }
});

export default router;
