<template>
    <a :href="`/tournaments/${game.key}`" class="game-card-link">
        <article class="card game-card">
            <div class="images-wrapper">
                <div class="featured-image-outer">

                    <img class="featured-image-inner" :src="$domain + game.image" :alt="game.name">
                </div>
            </div>
            <div class="game-card-left">
                <div class="game-name">
                    <h4 class="title">{{ game.name.toUpperCase() }}</h4>
                    <p>{{ game.description }}</p>
                </div>
                <div class="console-icons">
                    <i class="fas fa-desktop" :class="{ 'enable':game.pc }"></i>
                    <i class="fab fa-xbox" :class="{ 'enable':game.xbox }"></i>
                    <i class="fab fa-playstation" :class="{ 'enable':game.ps }"></i>
                    <i class="fas fa-mobile-alt" :class="{ 'enable':game.mobile }"></i>
                </div>
            </div>
        </article>
    </a>
</template>

<script>
    export default {
        name: "GameCard",
        props: { game: Object },
    }
</script>
