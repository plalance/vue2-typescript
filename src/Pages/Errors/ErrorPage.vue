<template>
    <div>
        <h2>Oups</h2>
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import {mapGetters, mapActions} from 'vuex';

    @Component
    export default class ErrorPage extends Vue {

        // Datas
        message: string = "404, cette page n'existe pas";

        created(){}
        beforeMount(){}
        mounted(){}
    }
</script>