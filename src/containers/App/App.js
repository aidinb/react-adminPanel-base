import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Layout, LocaleProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import {Debounce} from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import {ThemeProvider} from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import ThemeSwitcher from '../../containers/ThemeSwitcher';
import AppRouter from './AppRouter';
import {siteConfig} from '../../config.js';
import {AppLocale} from '../../dashApp';
import themes from '../../config/themes';
import AppHolder from './commonStyle';
import './global.css';

const {Content, Footer} = Layout;

@inject('languageSwitcher','themeSwitcher','app', 'routing')
@observer
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {url} = this.props.match;
        const languageSwitcher = this.props.languageSwitcher;
        const themeSwitcher = this.props.themeSwitcher;
        const app = this.props.app;
        const currentAppLocale = AppLocale[languageSwitcher.language.locale];
        return (
            <LocaleProvider locale={currentAppLocale.antd}>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}>
                    <ThemeProvider theme={themes[themeSwitcher.changeThemes.themeName]}>
                        <AppHolder>
                            <Layout style={{height: '100vh'}}>
                                <Debounce time="1000" handler="onResize">
                                    <WindowResizeListener
                                        onResize={windowSize =>
                                            app.toggleAll(
                                                windowSize.windowWidth,
                                                windowSize.windowHeight
                                            )}
                                    />
                                </Debounce>
                                <Topbar url={url}/>
                                <Layout style={{flexDirection: 'row', overflowX: 'hidden'}}>
                                    <Sidebar url={url}/>
                                    <Layout
                                        className="isoContentMainLayout"
                                        style={{
                                            height: '100vh',
                                        }}>
                                        <Content
                                            className="isomorphicContent"
                                            style={{
                                                padding: '70px 0 0',
                                                flexShrink: '0',
                                                background: '#f1f3f6',
                                            }}>
                                            <AppRouter url={url}/>
                                        </Content>
                                        <Footer
                                            style={{
                                                background: '#ffffff',
                                                textAlign: 'center',
                                                borderTop: '1px solid #ededed',
                                            }}>
                                            {siteConfig.footerText}
                                        </Footer>
                                    </Layout>
                                </Layout>
                                <ThemeSwitcher />
                            </Layout>
                        </AppHolder>
                    </ThemeProvider>
                </IntlProvider>
            </LocaleProvider>
        );
    }
}