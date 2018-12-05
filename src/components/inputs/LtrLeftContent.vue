<template>
    <div class="input-left-content">
        <input :type="type" :name="name" :class="{'has-error': hasError}">
        <div :class="[{'has-error': hasError}, 'input-content']">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LtrLeftContent",
        props: { name: String, type: String, hasError: Boolean }
    }
</script>