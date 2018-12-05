<template>
    <div class="full-width-input">
        <h4 class="title margin-bottom-10 margin-top-10">نام</h4>
        <basic-input-rtl type="text" name="name" :hasError="hasError"></basic-input-rtl>
        <p class="input-error" v-if="hasError">{{ error }}</p>
    </div>
</template>

<script>
    import BasicInputRtl from '../inputs/BasicInputRtl';
    export default {
        name: "Name",
        components: { BasicInputRtl },
        props: {error: String, hasError: Boolean}
    }
</script>

<style scoped>

</style>