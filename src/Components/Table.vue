<template>
    <div>
        <h3>Table à cellules éditables</h3>
        <table>
            <thead>
            <tr>
                <th>Villes</th>
                <th>Habitants</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(city, index) in cities">
                <td>
                    <span v-if="!city.editing_city" @click="edit(index, 'editing_city')">{{ city.name }}</span>
                    <input v-else="" type="text" v-model="city.name">
                </td>
                <td>
                    <span v-if="!city.editing_number" @click="edit(index, 'editing_number')">{{ city.number }}</span>
                    <input v-else="" type="text" v-model="city.number">
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <th>Total :</th>
                <th>{{ somme }}</th>
            </tr>
            <tr>
                <th>Moyenne :</th>
                <th>{{ moyenne }}</th>
            </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
    import {Vue, Prop, Component, } from 'vue-property-decorator'

    @Component({
        name: 'Table'
    })
    export default class Table extends Vue {

        cities: object[] = [
            {
                name: 'Dijon',
                number: 50,
                editing_city: false,
                editing_number: false
            },
            {
                name: 'Belfort',
                number: 28,
                editing_city: false,
                editing_number: false
            }
        ];

        /** Editable Text Value  */
        value: string = 'Texte de base';

        /** Temp value  */
        tempValue: string = '';

        edit(index, column) {
            this.cities.forEach(function (el, id) {
                    el['editing_city'] = false;
                    el['editing_number'] = false;
                }
            );
            this.cities[index][column] = true;
        }


        get moyenne(){
            return (this.somme / this.cities.length);
        }
        get somme(){
            let total: number = 0;
            this.cities.forEach(function (el) {
                total += parseFloat(el.number);
            });
            return total;
        }

        created() {
        }

        beforeMount() {
        }

        mounted() {
        }
    }
</script>