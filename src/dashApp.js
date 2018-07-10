import React from 'react';
import {Provider} from 'mobx-react';
import {rehydrate, hotRehydrate} from 'rfx-core';
import {isProduction} from './utils/constants';
import PublicRoutes from './router';
import {ThemeProvider} from 'styled-components';
import {LocaleProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import themes from './config/themes';
import AppLocale from './languageProvider';
import * as stores from './stores/stores';

import config, {
    getCurrentLanguage
} from './containers/LanguageSwitcher/config';

import {themeConfig} from './config';
import DashAppHolder from './dashAppStyle';
// import 'antd/dist/antd.css';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';


const currentAppLocale =
    AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];

const browserHistory = createBrowserHistory();
const routeStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routeStore);

const DashApp = () => (
    <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
        >
            <ThemeProvider theme={themes[themeConfig.theme]}>
                <DashAppHolder>
                    <Provider {...stores} routing={routeStore}>
                        <PublicRoutes history={history}/>
                    </Provider>
                </DashAppHolder>
            </ThemeProvider>
        </IntlProvider>
    </LocaleProvider>
);

export default DashApp;
export {AppLocale};
