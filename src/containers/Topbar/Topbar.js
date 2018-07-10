import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {Layout} from 'antd';
import TopbarWrapper from './topbar.style';
import {
    TopbarNotification,
    TopbarMessage,
    TopbarSearch,
    TopbarUser,
    TopbarAddtoCart,
} from '../../components/topbar';

const {Header} = Layout;

@inject('app','languageSwitcher','themeSwitcher', 'routing')
@observer
export default class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const {url} = this.props;
        const app = this.props.app;
        const languageSwitcher = this.props.languageSwitcher;
        const themeSwitcher = this.props.themeSwitcher;
        const collapsed = app.collapsed && !app.openDrawer;
        const styling = {
            background: themeSwitcher.topbarTheme.backgroundColor,
            position: 'fixed',
            width: '100%',
            height: 70,
        };
        return (
            <TopbarWrapper>
                <Header
                    style={styling}
                    className={
                        collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
                    }>
                    <div className="isoLeft">
                        <button
                            className={
                                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
                            }
                            style={{color: themeSwitcher.topbarTheme.textColor}}
                            onClick={app.toggleCollapsed}
                        />
                    </div>

                    <ul className="isoRight">
                        <li className="isoSearch">
                            <TopbarSearch locale={languageSwitcher.language.locale}/>
                        </li>

                        <li
                            onClick={() => this.setState({selectedItem: 'notification'})}
                            className="isoNotify">
                            <TopbarNotification locale={languageSwitcher.language.locale}/>
                        </li>

                        <li
                            onClick={() => this.setState({selectedItem: 'message'})}
                            className="isoMsg">
                            <TopbarMessage locale={languageSwitcher.language.locale}/>
                        </li>
                        <li
                            onClick={() => this.setState({selectedItem: 'addToCart'})}
                            className="isoCart">
                            <TopbarAddtoCart url={url} locale={languageSwitcher.language.locale}/>
                        </li>

                        <li
                            onClick={() => this.setState({selectedItem: 'user'})}
                            className="isoUser">
                            <TopbarUser locale={languageSwitcher.language.locale}/>
                        </li>
                    </ul>
                </Header>
            </TopbarWrapper>
        );
    }
}