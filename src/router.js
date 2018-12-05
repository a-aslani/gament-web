import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
import { ACCESS_ERROR_TITLE, ACCESS_ERROR_MESSAGE, ERROR } from './constants/alert-messages';
import Home from './views/Home.vue'
import About from './views/About.vue';
import ContactUs from './views/ContactUs.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: "active",
    linkExactActiveClass: "active",
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,

        },
        {
            path: '/about',
            name: 'about',
            component: About,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/contact-us',
            name: 'ContactUs',
            component: ContactUs
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    store.dispatch('closeMenu');
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(store.getters.isLoggedIn) {
            next();
            return
        }
        store.dispatch('setAlert', {
            type: ERROR,
            title: ACCESS_ERROR_TITLE,
            message: ACCESS_ERROR_MESSAGE
        });
        store.dispatch('showLoginSidebar');
    }else {
        next()
    }
});

export default router
