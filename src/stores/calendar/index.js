import {observable, action} from 'mobx';
import events from '../../containers/Calendar/demoEvents';


class Store  {
    @observable events;
    @observable view;

    constructor() {
        this.events = events;
        this.view = 'month';
    }

    @action.bound changeView(view) {
        this.view = view;
    }

    @action.bound changeEvents(events) {
        this.events = events;
    }
}
let singleton = new Store();
export default singleton;
