import {observable, action} from 'mobx';


class Store  {
    @observable authenticated;

    constructor() {
        this.authenticated = true;
    }

    @action.bound login() {
        this.authenticated = true;
    }

    @action.bound logout() {
        this.authenticated = false;
    }
}
let singleton = new Store();
export default singleton;
