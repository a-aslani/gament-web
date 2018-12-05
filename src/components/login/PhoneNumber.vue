<template>
    <div>
        <h4 class="title margin-bottom-10">شماره موبایل</h4>
        <ltr-left-content type="text" name="phone" :hasError="hasError"><p>+98</p></ltr-left-content>
        <p class="input-info" v-if="!hasError">شماره موبایل خود را بدون 0 ابتدایی وارد نمایید</p>
        <p class="input-error" v-else>{{ error }}</p>
    </div>
</template>

<script>
    import LtrLeftContent from '../inputs/LtrLeftContent';
    export default {
        name: "PhoneNumber",
        components: { LtrLeftContent },
        props: {error: String, hasError: Boolean}
    }
</script>