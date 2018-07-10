import {observable, action} from 'mobx';


class Store  {
    @observable searchText;
    @observable total_count;
    @observable result;
    @observable loading;
    @observable error;

    constructor() {
        this.searchText = 'React JS Conf';
        this.total_count = 0;
        this.result = [];
        this.loading = false;
        this.error = false;
    }

    @action.bound youtubeSearch(searchText) {
        this.loading = true;
        this.searchText = searchText;
    }

    @action.bound onPageChange(searchText, pageToken) {
        this.loading = true;
        this.searchText = searchText;
    }

    @action.bound gitSearchSuccess(result, total_count, nextPageToken, prevPageToken) {
        this.result = result;
        this.total_count = total_count;
        this.nextPageToken = nextPageToken;
        this.prevPageToken = prevPageToken;
        this.loading = false;
        this.error = false;
    }

    @action.bound gitSearchError() {
        this.result = [];
        this.loading = false;
        this.error = false;
    }

}
let singleton = new Store();
export default singleton;
