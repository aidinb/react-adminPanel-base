import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Layout, Icon} from 'antd';
import Button from '../../components/uielements/button';
import ContactList from '../../components/contacts/contactList';
import SingleContactView from '../../components/contacts/singleView';
import EditContactView from '../../components/contacts/editView';
import DeleteButton from '../../components/contacts/deleteButton';
import {otherAttributes} from './fakeData';
import IntlMessages from '../../components/utility/intlMessages';
import {ContactsWrapper} from './contacts.style';

const {Content} = Layout;
@inject('contacts', 'routing')
@observer
export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const contactsStore=this.props.contacts;

        const selectedContact = contactsStore.selectedId
            ? contactsStore.contacts.filter(contact => contact.id === contactsStore.selectedId)[0]
            : null;
        const onVIewChange = () => contactsStore.viewChange(!contactsStore.editView);
        return (
            <ContactsWrapper
                className="isomorphicContacts"
                style={{background: 'none'}}
            >
                <div className="isoContactListBar">
                    <ContactList
                        contacts={contactsStore.contacts}
                        selectedId={contactsStore.selectedId}
                        changeContact={contactsStore.changeContact}
                        deleteContact={contactsStore.deleteContact}
                    />
                </div>
                <Layout className="isoContactBoxWrapper">
                    {selectedContact ? (
                        <Content className="isoContactBox">
                            <div className="isoContactControl">
                                <Button type="button" onClick={onVIewChange}>
                                    {contactsStore.editView ? <Icon type="check"/> : <Icon type="edit"/>}{' '}
                                </Button>
                                <DeleteButton
                                    deleteContact={contactsStore.deleteContact}
                                    contact={selectedContact}
                                />
                                <Button
                                    type="primary"
                                    onClick={contactsStore.addContact}
                                    className="isoAddContactBtn"
                                >
                                    <IntlMessages id="contactlist.addNewContact"/>
                                </Button>
                            </div>
                            {contactsStore.editView ? (
                                <EditContactView
                                    contact={selectedContact}
                                    editContact={contactsStore.editContact}
                                    otherAttributes={otherAttributes}
                                />
                            ) : (
                                <SingleContactView
                                    contact={selectedContact}
                                    otherAttributes={otherAttributes}
                                />
                            )}
                        </Content>
                    ) : (
                        <div className="isoContactControl">
                            <Button
                                type="primary"
                                onClick={contactsStore.addContact}
                                className="isoAddContactBtn"
                            >
                                <IntlMessages id="contactlist.addNewContact"/>
                            </Button>
                        </div>
                    )}
                </Layout>
            </ContactsWrapper>
        );
    }
}
