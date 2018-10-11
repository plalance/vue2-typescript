<template>
    <div>
        <h2>Liste</h2>
        <table-com></table-com>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import {mapGetters, mapActions} from 'vuex';

    import Table from '../Components/Table.vue'

    @Component({
        name: 'Villes',
        components: {
            'table-com': Table
        },
    })
    export default class Contact extends Vue {
        /** Props
         ** https://github.com/Microsoft/TypeScript-Vue-Starter#using-decorators-to-define-a-component
         **/

        private testAction() {
            this.$store.dispatch('decr', 12);
        }
        
        number: number = 15;
        msg: string = "Salut les gens !!";

        created() {}

        beforeMount() {}

        mounted() {}
    }
</script>