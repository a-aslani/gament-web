<template>
    <div class="full-width-input margin-bottom-10">
        <h4 class="title margin-bottom-10 margin-top-10">نام خانوادگی</h4>
        <basic-input-rtl type="text" name="family" :hasError="hasError"></basic-input-rtl>
        <p class="input-error" v-if="hasError">{{ error }}</p>
        <p class="input-info" v-else>در صورت امکان به زبان فارسی بنویسید</p>
    </div>
</template>

<script>
    import BasicInputRtl from '../inputs/BasicInputRtl';
    export default {
        name: "Family",
        components: { BasicInputRtl },
        props: {error: String, hasError: Boolean}
    }
</script>

<style scoped>

</style>