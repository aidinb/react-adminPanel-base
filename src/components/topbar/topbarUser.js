import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Popover from '../uielements/popover';
import IntlMessages from '../utility/intlMessages';
import userpic from '../../image/user1.png';
import TopbarDropdownWrapper from './topbarDropdown.style';

@inject('auth', 'routing')
@observer
export default class TopbarUser extends Component {
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
        const auth = this.props.auth;

        const content = (
            <TopbarDropdownWrapper className="isoUserDropdown">
                <a className="isoDropdownLink">
                    <IntlMessages id="themeSwitcher.settings"/>
                </a>
                <a className="isoDropdownLink">
                    <IntlMessages id="sidebar.feedback"/>
                </a>
                <a className="isoDropdownLink">
                    <IntlMessages id="topbar.help"/>
                </a>
                <a className="isoDropdownLink" onClick={auth.logout}>
                    <IntlMessages id="topbar.logout"/>
                </a>
            </TopbarDropdownWrapper>
        );

        return (
            <Popover
                content={content}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                arrowPointAtCenter={true}
                placement="bottomLeft"
            >
                <div className="isoImgWrapper">
                    <img alt="user" src={userpic}/>
                    <span className="userActivity online"/>
                </div>
            </Popover>
        );
    }
}