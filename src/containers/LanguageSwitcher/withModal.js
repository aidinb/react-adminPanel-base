import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Modal from '../../components/feedback/modal';
import Button from '../../components/uielements/button';
import config from './config';

@inject('languageSwitcher', 'routing')
@observer
export default class LanguageSwitcher extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const languageSwitcher = this.props.languageSwitcher;

        return (
            <div className="isoButtonWrapper">
                <Button type="primary" className="" onClick={languageSwitcher.switchActivation}>
                    Switch Language
                </Button>

                <Modal
                    title={'Select Language'}
                    visible={languageSwitcher.isActivated}
                    onCancel={languageSwitcher.switchActivation}
                    cancelText="Cancel"
                    footer={[]}
                >
                    <div>
                        {config.options.map(option => {
                            const {languageId, text} = option;
                            const type =
                                languageId === languageSwitcher.language.languageId ? 'primary' : 'success';
                            return (
                                <Button
                                    type={type}
                                    key={languageId}
                                    onClick={() => {
                                        languageSwitcher.changeLanguage(languageId);
                                    }}
                                >
                                    {text}
                                </Button>
                            );
                        })}
                    </div>
                </Modal>
            </div>
        );
    }
}
