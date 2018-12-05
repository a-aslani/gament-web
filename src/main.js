import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './store/api';
import VueLoading from 'vue-loading-template'
import './registerServiceWorker'
import { DOMAIN } from './constants/config';

Vue.prototype.$domain = DOMAIN;
Vue.prototype.$http = axios;

const options = {
    color: '#FF7324',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};

Vue.use(VueProgressBar, options);
Vue.use(VueLoading, /** options **/);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
