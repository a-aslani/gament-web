<template>
    <div>
        <transition name="slide-left-alert">
            <alert v-show="alertSate"></alert>
        </transition>
        <transition name="slide-right">
            <login-sidebar v-if="loginSidebarState"></login-sidebar>
        </transition>
        <transition name="fade">
            <menu-button v-if="isLoggedIn && !menuState"></menu-button>
        </transition>
        <transition name="fade">
            <login-button v-if="!isLoggedIn"></login-button>
        </transition>
        <transition name="slide-right">
            <menu-sidebar v-if="isLoggedIn" v-show="menuState"></menu-sidebar>
        </transition>
        <div class="app-wrapper">
            <div :class="[{'content-slide' : loginSidebarState || menuState}, 'app-content']">
                <header class="header-wrapper">
                    <nav class="header-right">
                        <router-link to="/" exact>صفحه اصلی</router-link>
                        <router-link to="/about">درباره ی ما</router-link>
                        <router-link to="/contact-us">تماس با ما</router-link>
                    </nav>
                    <nav class="header-left"></nav>
                </header>
                <router-view/>
                <vue-progress-bar></vue-progress-bar>
            </div>
        </div>
    </div>
</template>

<script>
    import LoginSidebar from './components/login/LoginSidebar.vue';
    import { mapGetters, mapActions } from 'vuex';
    import Alert from './components/alert/Alert.vue';
    import MenuButton from './components/bottons/MenuButton';
    import MenuSidebar from './components/MenuSidebar';
    import LoginButton from './components/bottons/LoginButton';

    export default {
        components: { LoginButton, MenuSidebar, MenuButton, Alert, LoginSidebar },
        created() {
            this.$http.interceptors.response.use(undefined, (err) => {
                return new Promise(() =>  {
                    if(err.response.status === 401 && err.response.config && !err.response.config.__isRetryRequest) {
                        this.logout()
                    }
                    throw err;
                });
            });
        },
        computed: mapGetters(['loginSidebarState', 'alertSate', 'isLoggedIn', 'menuState']),
        methods: mapActions(['showLoginSidebar', 'logout'])
    }
</script>

<style>
    @import './assets/css/normalize.css';
    @import './assets/css/fonts.css';
    @import './assets/css/flexboxgrid.min.css';
    @import './assets/css/all.min.css';
    @import './assets/css/app.css';
</style>
