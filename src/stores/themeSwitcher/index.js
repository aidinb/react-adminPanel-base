import {observable, action} from 'mobx';
import config, {getCurrentTheme} from '../../containers/ThemeSwitcher/config';


class Store  {
    @observable isActivated;
    @observable changeThemes;
    @observable topbarTheme;
    @observable sidebarTheme;
    @observable layoutTheme;

    constructor() {
        this.isActivated = false;
        this.changeThemes = getCurrentTheme(
            'changeThemes',
            config.changeThemes.defaultTheme || 'themedefault'
        );
        this.topbarTheme = getCurrentTheme(
            'topbarTheme',
            config.topbarTheme.defaultTheme || 'themedefault'
        );
        this.sidebarTheme = getCurrentTheme(
            'sidebarTheme',
            config.sidebarTheme.defaultTheme || 'themedefault'
        );

        this.layoutTheme = getCurrentTheme(
            'layoutTheme',
            config.layoutTheme.defaultTheme || 'themedefault'
        );
    }

    @action.bound switchActivation() {
        this.isActivated = !this.isActivated;
    }

    @action.bound changeTheme(attribute, themeName) {
        this[attribute] = themeName;
    }
}
let singleton = new Store();
export default singleton;