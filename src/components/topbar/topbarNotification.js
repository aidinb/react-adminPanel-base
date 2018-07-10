import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {Popover} from 'antd';
import IntlMessages from '../utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';

const demoNotifications = [
    {
        id: 1,
        name: 'David Doe',
        notification: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
    },
    {
        id: 2,
        name: 'Navis Doe',
        notification: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
    },
    {
        id: 3,
        name: 'Emanual Doe',
        notification: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
    },
    {
        id: 4,
        name: 'Dowain Doe',
        notification: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
    }
];


@inject('themeSwitcher', 'routing')
@observer
export default class TopbarNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    hide = () => {
        this.setState({visible: false});
    };

    handleVisibleChange = () => {
        this.setState({visible: !this.state.visible});
    };

    render() {
        const themeSwitcher = this.props.themeSwitcher;

        const content = (
            <TopbarDropdownWrapper className="topbarNotification">
                <div className="isoDropdownHeader">
                    <h3>
                        <IntlMessages id="sidebar.notification"/>
                    </h3>
                </div>
                <div className="isoDropdownBody">
                    {demoNotifications.map(notification => (
                        <a className="isoDropdownListItem" key={notification.id}>
                            <h5>{notification.name}</h5>
                            <p>{notification.notification}</p>
                        </a>
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
                        className="ion-android-notifications"
                        style={{color: themeSwitcher.topbarTheme.textColor}}
                    />
                    <span>{demoNotifications.length}</span>
                </div>
            </Popover>
        );
    }
}
