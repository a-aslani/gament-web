<template>
    <div class="basic-input">
        <input :type="type" :name="name" :class="[{'has-error': hasError}, 'rtl']">
    </div>
</template>

<script>
    export default {
        name: "BasicInputRtl",
        props: {type: String, name: String, hasError: Boolean}
    }
</script>

<style scoped>

</style>