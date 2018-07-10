import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import ReactDrawer from 'react-motion-drawer';
import {Scrollbars} from 'react-custom-scrollbars';
import {InputSearch} from '../../components/uielements/input';
import mailList from '../../components/mail/maiilList';
import mailBuckets from '../../components/mail/mailBuckets';
import mailTags from '../../components/mail/mailTags';
import singleMail from '../../components/mail/singleMail';
import ComposeBtn from '../../components/mail/mailComposeBtn';
import ComposeMail from '../../components/mail/composeMail';
import PaginationControl from '../../components/mail/mailPagination';
import IntlMessages from '../../components/utility/intlMessages';
import MailDrawer from './mailDrawer.style';
import MailBox from './mailBox.style';


@inject('mail', 'routing')
@observer
export default class TabView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            search: this.props.mail.searchString,
            open: false
        };
    }


    openDrawer = () => {
        this.setState({open: true});
    }

    closeDrawer = () => {
        this.setState({open: false});
    }

    onDrawerClose = () => {
        this.setState({open: false});
    }

    onDrawerChange = val => {
        if (!val) {
            this.setState({open: false});
        }
    };

    render() {
        const mail = this.props.mail;
        const {search} = this.state;
        let singleMailComponent = (
            <p className="isoNoMailMsg">
                <IntlMessages id="email.noMessage"/>
            </p>
        );
        const index = mail.allMails.findIndex(mail => mail.id === mail.selectedMail);
        if (index !== -1) {
            singleMailComponent = singleMail(
                mail.allMails,
                mail.allMails,
                index,
                mail.replyMail,
                mail.changeReplyMail,
                mail.selectMail
            );
        }
        return (
            <div style={{height: '100%'}}>
                <MailBox className="isomorphicMailBox">
                    {mail.composeMail ? (
                        ''
                    ) : (
                        <div className="isoMiddleWrapper">
                            <div className="isoBucketLabel">
                                <button className="isoBackCatBtn" onClick={this.openDrawer}>
                                    <i className="ion-android-menu"/>
                                </button>
                                <h3>{mail.filterAttr.bucket}</h3>
                                <PaginationControl />
                            </div>
                            <div className="isoSearchMailWrapper">
                                <InputSearch
                                    placeholder="Search Email"
                                    value={search}
                                    className="isoSearchEmail"
                                    onChange={event =>
                                        this.setState({search: event.target.value})}
                                    onSearch={value => mail.changeSearchString(value)}
                                />
                            </div>
                            <Scrollbars style={{height: this.props.height - 70}}>
                                {mailList(mail.allMails, mail.selectMail, mail.selectedMail)}
                            </Scrollbars>
                        </div>
                    )}
                    <div className="isoSingleMailWrapper">
                        <Scrollbars style={{height: this.props.height - 70}}>
                            {mail.composeMail ? (
                                <ComposeMail allMails={mail.allMails} changeComposeMail={mail.changeComposeMail} tabView/>
                            ) : (
                                singleMailComponent
                            )}
                        </Scrollbars>
                    </div>
                </MailBox>

                <MailDrawer>
                    <ReactDrawer
                        open={this.state.open}
                        right={true}
                        onChange={this.onDrawerChange}
                    >
                        <i onClick={this.closeDrawer} className="icono-cross"/>
                        <div className="isoLeftWrapper">
                            <ComposeBtn
                                changeComposeMail={mail.changeComposeMail}
                                onDrawerClose={this.onDrawerClose}
                            />
                            <div className="isoMailOptions">
                                <Scrollbars style={{height: this.props.height - 70}}>
                                    {mailBuckets(
                                        mail.allMails,
                                        mail.filterAction,
                                        mail.filterAttr,
                                        this.onDrawerClose
                                    )}
                                    {mailTags(
                                        mail.allMails,
                                        mail.filterAction,
                                        mail.filterAttr,
                                        this.onDrawerClose
                                    )}
                                </Scrollbars>
                            </div>
                        </div>
                    </ReactDrawer>
                </MailDrawer>
            </div>
        );
    }
}
