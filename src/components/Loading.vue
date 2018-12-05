<template>
    <div class="loading-container">
        <div>
            <vue-loading type="cylon" color="#5F6472" :size="{ width: '75px', height: '75px' }"></vue-loading>
            <h4 v-if="text" class="title">درحال بارگذاری ...</h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        props: {text: Boolean}
    }
</script>
