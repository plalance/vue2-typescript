<template>
    <div>Nombre {{ start + number }}</div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import {Criteria} from "./criteria/Criteria";
    import {SimpleCriterion} from "./criteria/SimpleCriterion";
    import {LogicalCriterion} from "./criteria/LogicalCriterion";

    @Component({})
    export default class App extends Vue {
        /** Props
         ** https://github.com/Microsoft/TypeScript-Vue-Starter#using-decorators-to-define-a-component
         **/
        @Prop() start!: number;

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
            let criteria : Criteria = new Criteria();
            criteria.add(SimpleCriterion.addEquals("etsId", 99));

            console.log(JSON.stringify(criteria));
        }
    }
</script>