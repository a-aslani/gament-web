<template>
    <div>
        <Banner>
            <div class="profile-user-info">
                <img :src="$domain + user.image" alt="user name">
                <div class="user-profile-left">
                    <h4 class="title">{{ fullName }}</h4>
                    <div class="user-profile-acc">
                        <p class="orange-label around-label margin-top-10">کاربر عادی</p>
                    </div>
                </div>
            </div>
        </Banner>
        <div class="profile-content">
            <h1>dfsdf</h1>
            <h1>dfsdf</h1>
            <h1>dfsdf</h1>
            <h1>dfsdf</h1>
            <h1>dfsdf</h1>
            <h1>dfsdf</h1>
            <h1>dfsdf</h1>
            <h1>dfsdf</h1>
        </div>
    </div>
</template>

<script>
    import Banner from '../components/Banner';
    import { mapGetters } from 'vuex';

    export default {
        name: "Profile",
        components: { Banner },
        computed: {
            ...mapGetters(['user']),
            fullName() {
                return `${this.user.name} ${this.user.family}`
            }
        }
    }
</script>

<style scoped>

</style>