import {observable, action} from 'mobx';
import allMails from '../../containers/Mail/fakeData';


class Store  {
    @observable allMails;
    @observable tag;
    @observable selectedMail;
    @observable filterAttr;
    @observable composeMail;
    @observable replyMail;
    @observable searchString;

    constructor() {
        this.allMails = allMails;
        this.tag = undefined;
        this.selectedMail = -1;
        this.filterAttr = {bucket: 'Inbox'};
        this.composeMail = false;
        this.replyMail = false;
        this.searchString = '';
    }

    @action.bound filterAction(newFilterAttr) {
        const filterAttr = this.filterAttr;
        if (newFilterAttr) {
            if (newFilterAttr.bucket) {
                filterAttr.bucket = newFilterAttr.bucket;
                filterAttr.tag = newFilterAttr.tag;
            } else if (newFilterAttr.tag) {
                filterAttr.tag = newFilterAttr.tag;
            }
        }
        this.filterAttr = {...filterAttr};
        this.selectedMail = -1;
        this.composeMail = false;
        this.replyMail = false;
    }

    @action.bound selectMail(selectedMail) {
        const allMails = this.allMails;
        allMails[allMails.findIndex(mail => mail.id === selectedMail)].read = true;
        this.selectedMail = selectedMail;
        this.allMails = allMails;
        this.replyMail = false;
    }

    @action.bound changeComposeMail(composeMail) {
        this.composeMail = composeMail;
        this.replyMail = false;
    }

    @action.bound changeReplyMail(replyMail) {
        this.replyMail = replyMail;
    }

    @action.bound changeSearchString(searchString) {
        this.searchString = searchString;
    }
}
let singleton = new Store();
export default singleton;
