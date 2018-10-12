export default class Person {
    name: string = "";
    lastName: string = "";

    getFullName(){
        return this.name+' '+this.lastName;
    }
}
