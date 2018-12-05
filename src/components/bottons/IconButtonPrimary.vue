<template>
    <button :type="type" class="button-small blue-btn around" v-if="buttonType">
        <slot></slot>
        <i :class="icon"></i>
    </button>
    <button type="button" class="button-small blue-btn around" v-else @click.prevent="$emit('buttonClick')">
        <slot></slot>
        <i :class="icon"></i>
    </button>
</template>

<script>
    export default {
        name: "IconButtonPrimary",
        props: { icon: String, type: { type: String, default: 'submit' } },
        computed: {
            buttonType() {
                return this.type !== 'button'
            }
        }
    }
</script>