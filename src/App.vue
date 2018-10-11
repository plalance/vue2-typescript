<template>
    <div>
        <div>Nombre du store {{ countValue }}</div>
        <button @click="incr(3)">Ajouter 3</button>
        <button @click="decr(2)">Enlever 2</button>
        <button @click="testAction">Tester un dispatch (decr de 12)</button>
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
    export default class App extends Vue {
        /** Props
         ** https://github.com/Microsoft/TypeScript-Vue-Starter#using-decorators-to-define-a-component
         **/
        @Prop() start!: number;

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