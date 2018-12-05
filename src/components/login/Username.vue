<template>
    <div>
        <h4 class="title margin-bottom-10">نام کاربری</h4>
        <div class="basic-input">
            <input type="text" name="username" v-model="username" :class="{'has-error': hasError, 'is-valid': valid.isValid}" @input="$emit('changeUsername', username)">
        </div>
        <p class="input-error" v-if="hasError">{{ error }}</p>
        <p class="input-valid" v-if="valid.isValid">{{ valid.message }}</p>
    </div>
</template>

<script>
    import BasicInput from '../inputs/BasicInput';
    export default {
        name: "Username",
        components: { BasicInput },
        props: {error: String, hasError: Boolean, valid: Object},
        data() {
            return {
                username: ''
            }
        }
    }
</script>

<style scoped>

</style>