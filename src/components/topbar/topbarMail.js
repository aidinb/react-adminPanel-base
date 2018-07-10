import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {Link} from 'react-router-dom';
import IntlMessages from '../utility/intlMessages';
import Popover from '../uielements/popover';
import TopbarDropdownWrapper from './topbarDropdown.style';

const demoMails = [
    {
        id: 1,
        name: 'David Doe',
        time: '3 minutes ago',
        desc: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
    },
    {
        id: 2,
        name: 'Navis Doe',
        time: '4 minutes ago',
        desc: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
    },
    {
        id: 3,
        name: 'Emanual Doe',
        time: '5 minutes ago',
        desc: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
    },
    {
        id: 4,
        name: 'Dowain Doe',
        time: '6 minutes ago',
        desc: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
    }
];


@inject('themeSwitcher', 'routing')
@observer
export default class TopbarMail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    hide = () => {
        this.setState({visible: false});
    }

    handleVisibleChange = () => {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const {url} = this.props;
        const themeSwitcher = this.props.themeSwitcher;

        const content = (
            <TopbarDropdownWrapper className="topbarMail">
                <div className="isoDropdownHeader">
                    <h3>
                        <IntlMessages id="sidebar.email"/>
                    </h3>
                </div>
                <div className="isoDropdownBody">
                    {demoMails.map(mail => (
                        <Link to={`${url}/mailbox`} onClick={this.hide} key={mail.id}>
                            <div className="isoDropdownListItem">
                                <div className="isoListHead">
                                    <h5>{mail.name}</h5>
                                    <span className="isoDate">{mail.time}</span>
                                </div>
                                <p>{mail.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <a className="isoViewAllBtn">
                    <IntlMessages id="topbar.viewAll"/>
                </a>
            </TopbarDropdownWrapper>
        );
        return (
            <Popover
                content={content}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                placement="bottomLeft"
            >
                <div className="isoIconWrapper">
                    <i
                        className="ion-email"
                        style={{color: themeSwitcher.topbarTheme.textColor}}
                    />
                    <span>{demoMails.length}</span>
                </div>
            </Popover>
        );
    }
}

