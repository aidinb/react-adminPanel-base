import {observable, action} from 'mobx';
import fakeData from "../../containers/Contacts/fakeData";
const contacts = new fakeData(10).getAll();

function ascendingSort(contact1, contact2) {
    const name1 = contact1.name ? contact1.name.toUpperCase() : '~';
    const name2 = contact2.name ? contact2.name.toUpperCase() : '~';
    return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}


class Store  {
    @observable contacts;
    @observable selectedId;
    @observable editView;

    constructor() {
        this.contacts = contacts;
        this.selectedId = contacts[0].id;
        this.editView = false;
    }

    @action.bound changeContact(id) {
        this.selectedId = id;
        this.editView = false;
    }

    @action.bound addContact() {
        const newContact = {
            id: new Date(),
            firstName: '',
            avatar: contacts[new Date() % 10].avatar,
            LastName: '',
            mobile: '',
            home: '',
            name: '',
            company: '',
            work: '',
            note: '',
        };
        this.contacts = [...this.contacts, newContact];
        this.selectedId = newContact.id;
        this.editView = false;
    }

    @action.bound editContact(newContact) {
        const contacts = this.contacts;
        const newContacts = [];
        contacts.forEach(contact => {
            if (contact.id === newContact.id) {
                newContacts.push(newContact);
            } else {
                newContacts.push(contact);
            }
        });

        this.contacts = newContacts.sort(ascendingSort);
    }

    @action.bound deleteContact(id) {
        const contacts = this.contacts;
        const selectedId = this.selectedId;
        const newContacts = [];
        contacts.forEach(contact => {
            if (contact.id === id) {
            } else {
                newContacts.push(contact);
            }
        });
        this.contacts = newContacts;
        this.selectedId = id === selectedId ? undefined : selectedId;
    }

    @action.bound viewChange(view) {
        this.view = view;
    }
}
let singleton = new Store();
export default singleton;