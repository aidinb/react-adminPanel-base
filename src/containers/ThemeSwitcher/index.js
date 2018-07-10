import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Switcher from '../../components/themeSwitcher/themeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher';
import Themes from './config';
import bucketSVG from '../../image/bucket.svg';
import IntlMessages from '../../components/utility/intlMessages';
import ThemeSwitcherStyle from './themeSwitcher.style';

@inject('themeSwitcher', 'routing')
@observer
export default class ThemeSwitcher extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const themeSwitcher = this.props.themeSwitcher;

        const styleButton = {background: themeSwitcher.sidebarTheme.buttonColor};

        return (
            <ThemeSwitcherStyle
                className={themeSwitcher.isActivated ? 'isoThemeSwitcher active' : 'isoThemeSwitcher'}
            >
                <div className="componentTitleWrapper" style={styleButton}>
                    <h3 className="componentTitle">
                        <IntlMessages id="themeSwitcher.settings"/>
                    </h3>
                </div>

                <div className="SwitcherBlockWrapper">
                    {/*<Switcher
                     config={Themes.changeThemes}
                     changeTheme={changeTheme}
                     selectedId={changeThemes.themeName}
                     />*/}
                    <Switcher
                        config={Themes.sidebarTheme}
                        changeTheme={themeSwitcher.changeTheme}
                        selectedId={themeSwitcher.sidebarTheme.themeName}
                    />

                    <Switcher
                        config={Themes.topbarTheme}
                        changeTheme={themeSwitcher.changeTheme}
                        selectedId={themeSwitcher.topbarTheme.themeName}
                    />

                    <Switcher
                        config={Themes.layoutTheme}
                        changeTheme={themeSwitcher.changeTheme}
                        selectedId={themeSwitcher.layoutTheme.themeName}
                    />
                    <LanguageSwitcher />
                </div>

                <div className="purchaseBtnWrapper">
                    <a
                        href="https://themeforest.net/item/isomorphic-react-redux-admin-dashboard/20262330?ref=redqteam"
                        className="purchaseBtn"
                        style={styleButton}
                    >
                        <IntlMessages id="themeSwitcher.purchase"/>
                    </a>
                </div>

                <button
                    type="primary"
                    className="switcherToggleBtn"
                    style={styleButton}
                    onClick={() => {
                        themeSwitcher.switchActivation();
                    }}
                >
                    <img src={process.env.PUBLIC_URL + bucketSVG} alt="bucket"/>
                </button>
            </ThemeSwitcherStyle>
        );
    }
}
