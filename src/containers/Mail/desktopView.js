import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
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
import MailBox from './mailBox.style';



@inject('mail', 'routing')
@observer
export default class DesktopView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.mail.searchString,
        };
    }

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
            <MailBox className="isomorphicMailBox">
                <div className="isoLeftWrapper">
                    <ComposeBtn changeComposeMail={mail.changeComposeMail}/>
                    <div className="isoMailOptions">
                        <Scrollbars style={{height: this.props.height - 70}}>
                            {mailBuckets(mail.allMails, mail.filterAction, mail.filterAttr)}
                            {mailTags(mail.allMails, mail.filterAction, mail.filterAttr)}
                        </Scrollbars>
                    </div>
                </div>
                {mail.composeMail ? (
                    ''
                ) : (
                    <div className="isoMiddleWrapper">
                        <div className="isoBucketLabel">
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
                            <ComposeMail allMails={mail.allMails}/>
                        ) : (
                            singleMailComponent
                        )}
                    </Scrollbars>
                </div>
            </MailBox>
        );
    }
}