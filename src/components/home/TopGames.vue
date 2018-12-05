<template>
    <section class="container-fluid">
        <h4 class="title col-xs-12 center-xs start-md margin-bottom-10">بازی های پر مخاطب</h4>
        <div class="divider col-sm-12"></div>
        <div class="row">
            <Loading :text="true" v-if="loading"></Loading>
            <div class="col-md-4 col-sm-6 col-xs-12" v-for="game in topGames" :key="game.key">
                <game-card :game="game"></game-card>
            </div>
        </div>
    </section>
</template>

<script>
    import GameCard from './GameCard';
    import { mapActions, mapGetters } from 'vuex';
    import Loading from '../Loading';

    export default {
        name: "TopGames",
        components: { Loading, GameCard },
        data() {
            return {
                loading: false
            }
        },
        computed: mapGetters(['topGames']),
        methods: mapActions(['fetchTopGames']),
        created() {
            if(this.topGames.length <= 0 ) {
                this.loading = true;
                this.fetchTopGames().then(() => {
                    this.loading = false;
                    this.$Progress.finish()
                }).catch(err => console.log(err));
            } else {
                this.$Progress.finish()
            }
        }
    }
</script>

<style scoped>

</style>