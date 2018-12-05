<template>
    <div class="basic-input">
        <input :type="type" :name="name" :class="{'has-error': hasError}">
    </div>
</template>

<script>
    export default {
        name: "BasicInput",
        props: {type: String, name: String, hasError: Boolean}
    }
</script>

<style scoped>

</style>