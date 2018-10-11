<template>
    <div>
        <vheader></vheader>
        <h1>Application</h1>

        <router-link to="/">
            <span class="nav-link">Home</span>
        </router-link>

        <router-link to="/cities">
            <span class="nav-link">Cities</span>
        </router-link>

        <router-link to="/contact">
            <span class="nav-link">Contact</span>
        </router-link>

        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {mapGetters, mapActions} from 'vuex';
    import Header from './Components/Header.vue';

    @Component({
        name: 'App',
        components: {
            'vheader': Header
        },
        computed: {
            ...mapGetters([])
        },
        methods: {
            ...mapActions([])
        }
    })
    export default class App extends Vue {
        /** Props
         ** https://github.com/Microsoft/TypeScript-Vue-Starter#using-decorators-to-define-a-component
         **/
        @Prop() start!: number;

        created() {}

        beforeMount() {}

        mounted() {}
    }
</script>