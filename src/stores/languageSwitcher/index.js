import {observable, action} from 'mobx';
import config, {getCurrentLanguage} from '../../containers/LanguageSwitcher/config';


class Store  {
    @observable language;
    @observable isActivated;

    constructor() {
        this.language = getCurrentLanguage(config.defaultLanguage || 'english');
        this.isActivated = false;

    }

    @action.bound switchActivation() {
        this.isActivated = !this.isActivated;
    }

    @action.bound changeLanguage(language) {
        this.language = language;
    }
}
let singleton = new Store();
export default singleton;
