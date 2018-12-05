<template>
    <div class="login-button circle" @click="showLoginSidebar" @mouseover="showToolbar = true" @mouseleave="showToolbar = false">
        <i class="fas fa-sign-in-alt"></i>
        <div class="toolbar" v-show="showToolbar"><p>ورود/عضویت</p></div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "LoginButton",
        data() {
            return {
                showToolbar: false
            }
        },
        methods: mapActions(['showLoginSidebar'])
    }
</script>

<style scoped>

</style>