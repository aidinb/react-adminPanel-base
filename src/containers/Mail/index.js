import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import DesktopView from './desktopView';
import MobileView from './mobileView';
import TabView from './tabView';


@inject('app', 'routing')
@observer
export default class Mail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const app = this.props.app;
        const MailView =
            app.view === 'DesktopView'
                ? DesktopView
                : app.view === 'TabView' ? TabView : MobileView;
        return (
            <div style={{height: '100%'}}>
                <MailView height={app.height}/>
            </div>
        );
    }
}