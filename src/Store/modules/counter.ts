import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'

@Module
export default class exemple extends VuexModule {
    count: number = 0;
    name: string = "Toto";

    @Mutation INCREMENT(delta: number) {this.count+=delta}
    @Mutation DECREMENT(delta: number) {this.count-=delta}

    @Action
    incr(delta: number) {
        console.log('Action "incr" va commiter INCREMENT');
        this.context.commit("INCREMENT", delta);
    }

    // @Action({commit: 'decrement'}) decr(delta: number) {return 5}
    // OU
    @Action
    decr(delta: number) {
        console.log('Action "decr" va commiter DECREMENT');
        this.context.commit("DECREMENT", delta);
    }

    /** Getters **/
    get countValue() {
        return (this.count)
    }

}