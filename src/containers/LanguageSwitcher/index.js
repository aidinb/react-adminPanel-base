import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import IntlMessages from '../../components/utility/intlMessages';
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
            <div className="themeSwitchBlock">
                <h4>
                    <IntlMessages id="languageSwitcher.label"/>
                </h4>
                <div className="themeSwitchBtnWrapper">
                    {config.options.map(option => {
                        const {languageId, icon} = option;
                        const customClass =
                            languageId === languageSwitcher.language.languageId
                                ? 'selectedTheme languageSwitch'
                                : 'languageSwitch';

                        return (
                            <button
                                type="button"
                                className={customClass}
                                key={languageId}
                                onClick={() => {
                                    languageSwitcher.changeLanguage(languageId);
                                }}
                            >
                                <img src={process.env.PUBLIC_URL + icon} alt="flag"/>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
}