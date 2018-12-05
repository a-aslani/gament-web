<template>
    <div class="menu circle" @click="showMenu" @mouseover="showToolbar = true" @mouseleave="showToolbar = false">
        <i class="fas fa-gamepad"></i>
        <div class="toolbar" v-show="showToolbar"><p>کنسول</p></div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        name: "MenuButton",
        data() {
            return {
                showToolbar: false
            }
        },
        methods: mapActions(['showMenu'])
    }
</script>

<style scoped>

</style>