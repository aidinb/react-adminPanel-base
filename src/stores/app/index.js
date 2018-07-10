import {observable, action} from 'mobx';
import {getDefaultPath} from '../../helpers/urlSync';
const preKeys = getDefaultPath();

export function getView(width) {
    let newView = 'MobileView';
    if (width > 1220) {
        newView = 'DesktopView';
    } else if (width > 767) {
        newView = 'TabView';
    }
    return newView;
}

class Store {
    @observable collapsed;
    @observable view;
    @observable height;
    @observable openDrawer;
    @observable openKeys;
    @observable current;

    constructor() {
        this.collapsed = window.innerWidth <= 1220;
        this.view = getView(window.innerWidth);
        this.height = getView(window.innerWidth);
        this.openDrawer = false;
        this.openKeys = preKeys;
        this.current = preKeys;
    }

    @action.bound toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }

    @action.bound toggleAll(w, h) {
        const view = getView(w);
        const clspd = view !== 'DesktopView';

        if (this.view !== view || h !== this.height) {
            const height = h ? h : this.height;
            this.collapsed = clspd;
            this.view = view;
            this.height = height;
        }
    }

    @action.bound toggleOpenDrawer() {
        this.openDrawer = !this.openDrawer;
    }

    @action.bound changeOpenKeys(openKeys) {
        this.openKeys = openKeys;
    }

    @action.bound changeCurrent(current) {
        this.current = current;
    }
}
let singleton = new Store();
export default singleton;