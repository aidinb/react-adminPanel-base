import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {InputSearch} from '../uielements/input';
import TopbarSearchModal from './topbarSearchModal.style';

class Searchbar extends Component {
    componentDidMount() {
        setTimeout(() => {
            try {
                document.getElementById('InputTopbarSearch').focus();
            } catch (e) {
            }
        }, 200);
    }

    render() {
        return (
            <InputSearch
                id="InputTopbarSearch"
                size="large"
                placeholder="Enter search text"
                onBlur={this.props.onBlur}
            />
        );
    }
}

@inject('themeSwitcher', 'routing')
@observer
export default class TopbarSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiblity: false
        };
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
    handleBlur = () => {
        setTimeout(() => {
            this.setState({
                visible: false
            });
        }, 200);
    };
    showModal = () => {
        this.setState({
            visible: true
        });
    };

    render() {
        const themeSwitcher = this.props.themeSwitcher;
        const {visible} = this.state;
        return (
            <div onClick={this.showModal}>
                <i
                    className="ion-ios-search-strong"
                    style={{color: themeSwitcher.topbarTheme.textColor}}
                />
                <TopbarSearchModal
                    visible={visible}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    wrapClassName="isoSearchModal"
                    width="60%"
                    footer={null}
                >
                    <div className="isoSearchContainer">
                        {visible ? <Searchbar onBlur={this.handleBlur}/> : ''}
                    </div>
                </TopbarSearchModal>
            </div>
        );
    }
}

