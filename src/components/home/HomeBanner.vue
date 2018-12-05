<template>
    <banner>
        <div class="row col-md-12 center-xs middle-xs">
            <a class="button around orange-btn margin-10" @click.prevent="showLoginSidebar" v-if="!isLoggedIn">ورود به حساب کاربری یا عضویت در سایت</a>
            <a class="button around orange-btn margin-10" v-else>رفتن به بخش پروفایل کاربری</a>
            <a class="button around basic-btn margin-10">خود برگذار کننده ی مسابقه باش</a>
        </div>
    </banner>
</template>

<script>
    import Banner from '../Banner';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "HomeBanner",
        components: { Banner },
        computed: mapGetters(['isLoggedIn']),
        methods: mapActions([ 'showLoginSidebar'])
    }
</script>