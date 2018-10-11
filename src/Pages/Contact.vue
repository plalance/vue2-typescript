<template>
    <div>
        <h2>Page de contact</h2>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import {mapGetters, mapActions} from 'vuex';

    @Component({
        computed: {
            ...mapGetters([
                'countValue'
            ])
        },
        methods: {
            ...mapActions([
                'incr',
                'decr'
            ])
        }
    })
    export default class Contact extends Vue {
        /** Props
         ** https://github.com/Microsoft/TypeScript-Vue-Starter#using-decorators-to-define-a-component
         **/

        private testAction(){
            this.$store.dispatch('decr', 12);
        }

        // Datas
        number: number = 15;
        msg: string = "Salut les gens !!";

        created(){
            console.log('App Created');
        }
        beforeMount(){
            console.log('App Before Mount');
        }
        mounted(){
            console.log('App Mounted');
        }
    }
</script>