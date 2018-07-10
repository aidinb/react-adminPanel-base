import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import DesktopView from './desktopView';
import MobileView from './mobileView';

@inject('ecommerce', 'routing')
@observer
export default class InstantSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const ecommerce = this.props.ecommerce;
        const View = ecommerce.view !== 'MobileView' ? DesktopView : MobileView;
        return (
            <div style={{height: '100%'}}>
                <View />
            </div>
        );
    }
}
