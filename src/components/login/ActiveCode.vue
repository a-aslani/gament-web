<template>
    <div>
        <h4 class="title margin-bottom-10">کد تایید</h4>
        <basic-input type="text" name="active_code" :hasError="hasError"></basic-input>
        <p class="input-info" v-if="!hasError">کد تایید به شماره موبایل شما ارسال میشود</p>
        <p class="input-error" v-else>{{ error }}</p>
    </div>
</template>

<script>
    import BasicInput from '../inputs/BasicInput';
    export default {
        name: "ActiveCode",
        components: { BasicInput },
        props: {error: String, hasError: Boolean}
    }
</script>

<style scoped>

</style>