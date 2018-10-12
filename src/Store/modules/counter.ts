import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'
import Person from './Person';

const INCREMENT: string = "INCREMENT";

@Module
export default class exemple extends VuexModule {
    count: number = 0;
    name: string = "Toto";
    object: Person = null;

    @Mutation INCREMENT(delta: number) {this.count+=delta}
    @Mutation DECREMENT(delta: number) {this.count-=delta}
    @Mutation CHANGE_NAME(data: string) {
        if(this.object == null) {
            this.object = new Person();
        }
        this.object.name = data;
    }

    @Action
    incr(delta: number) {
        console.log('Action "incr" va commiter INCREMENT');
        this.context.commit(INCREMENT, delta);
    }

    // @Action({commit: 'decrement'}) decr(delta: number) {return 5}
    // OU
    @Action
    decr(delta: number) {
        console.log('Action "decr" va commiter DECREMENT');
        this.context.commit("DECREMENT", delta);
    }

    @Action({commit: "CHANGE_NAME"}) changeName(name: string) { return name; }

    /** Getters **/
    get countValue() {
        return (this.count)
    }

    get personFullName(){
        return this.object.getFullName();
    }

}