<template>
    <button :type="type" class="button-small blue-btn around" v-if="buttonType">
        <slot></slot>
    </button>
    <button type="button" class="button-small blue-btn around" v-else @click.prevent="$emit('buttonClick')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "ButtonPrimary",
        props: { icon: String, type: { type: String, default: 'submit' } },
        computed: {
            buttonType() {
                return this.type !== 'button'
            }
        }
    }
</script>