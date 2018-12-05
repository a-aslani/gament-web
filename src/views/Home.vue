<template>
    <div>
        <home-banner></home-banner>
        <top-games></top-games>
        <features></features>
        <Footer></Footer>
    </div>
</template>

<script>
    import Banner from '../components/Banner.vue'
    import TopGames from '../components/home/TopGames';
    import Features from '../components/home/Features';
    import Footer from '../components/Footer';
    import HomeBanner from '../components/home/HomeBanner';

    export default {
        name: 'home',
        components: {
            HomeBanner,
            Footer,
            Features,
            TopGames,
            Banner
        },
        created() {
            this.$Progress.start()
        },
    }
</script>
