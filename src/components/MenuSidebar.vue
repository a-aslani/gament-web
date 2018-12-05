<template>
    <aside class="menu-sidebar-wrapper" @click.self="closeMenu">
        <div class="menu-sidebar">
            <div class="close-icon">
                <a @click.prevent="closeMenu">
                    <close-svg></close-svg>
                </a>
            </div>
            <div>
                <div class="menu-user-info">
                    <img v-if="!!userImage" :src="$domain + userImage" :alt="userFullName">
                    <div class="user-menu-left">
                        <h4 class="title">{{ userFullName }}</h4>
                        <div class="user-menu-acc">
                            <router-link to="/profile" class="primary-btn-soft">پروفایل کاربری</router-link>
                            <a href="" class="basic-btn-soft" @click.prevent="logout">خروج از حساب کاربری</a>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="menu-wrapper">
                    <ul class="menu-tabs">
                        <li @click="changeTab(1)" :class="{'active': active === 1}">تب اول</li>
                        <li @click="changeTab(2)" :class="{'active': active === 2}">تب دوم</li>
                        <li @click="changeTab(3)" :class="{'active': active === 3}">تب سوم</li>
                    </ul>
                    <div class="menu-tab-content">
                        <keep-alive>
                            <component :is="tabComponent"></component>
                        </keep-alive>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    import CloseSvg from './CloseSvg';
    import { mapActions, mapGetters } from 'vuex';
    import TabOne from './menu/TabOne';
    import Tab2 from './menu/Tab2';

    export default {
        name: "MenuSidebar",
        components: { CloseSvg, TabOne, Tab2 },
        data() {
            return {
                tabComponent: TabOne,
                active: 1,
                userImage: ''
            }
        },
        created() {
            this.fetchUser().then(data => {
                this.userImage = data.document.image
            }).catch(() => console.error('error'))
        },
        computed: {
            ...mapGetters(['user', 'isLoggedIn']),
            userFullName() {
                return `${this.user.name} ${this.user.family}`
            }
        },
        methods: {
            ...mapActions(['closeMenu', 'logout', 'fetchUser']),
            changeTab(tab) {
                this.active = tab;
                switch(tab) {
                    case 1:
                        this.tabComponent = TabOne;
                        break;
                    case 2:
                        this.tabComponent = Tab2;
                        break;
                    case 3:
                        this.tabComponent = Tab2;
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>