<template>
    <div class="alert-card">
        <a class="alert-close" @click.prevent="hiddenAlert"><i class="fas fa-times"></i></a>
        <h4 :class="[ alertType]"><i :class="alertIcon"></i>{{ alertTitle }}</h4>
        <div class="alert-divider"></div>
        <p>{{ alertMessage }}</p>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        name: "Alert",
        computed: {...mapGetters(['alertType', 'alertTitle', 'alertMessage']),
        alertIcon() {
            switch(this.alertType) {
                case 'error':
                    return 'fas fa-skull-crossbones';
                case 'success':
                    return 'far fa-check-circle';
                case 'warning':
                    return 'fas fa-info-circle';
                default:
                    return 'far fa-bell'
            }
        }
        },
        methods: mapActions(['hiddenAlert'])
    }
</script>
