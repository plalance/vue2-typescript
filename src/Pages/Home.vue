<template>
    <div>
        <h2>Home !!</h2>
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
    export default class Home extends Vue {
        private testAction(){
            this.$store.dispatch('decr', 12);
        }

        // Datas
        number: number = 15;
        msg: string = "Salut les gens !!";

        created(){
            console.log('Home Created');
        }
        beforeMount(){
            console.log('Home Before Mount');
        }
        mounted(){
            console.log('Home Mounted');
        }
    }
</script>