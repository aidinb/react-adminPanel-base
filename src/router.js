import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Router} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';

const RestrictedRoute = ({component: Component, isLoggedIn, ...rest}) => (
    <Route
        {...rest}
        render={props => isLoggedIn
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: '/',
                    state: {from: props.location},
                }}
            />}
    />
);

@inject('auth', 'routing')
@observer
export default class router extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            authenticated,
        } = this.props.auth;

        return (
            <Router history={this.props.history}>
                <div>
                    <Route
                        exact
                        path={'/'}
                        component={asyncComponent(() =>
                            import('./containers/Page/signin'))}
                    />

                    <Route
                        exact
                        path={'/signup'}
                        component={asyncComponent(() =>
                            import('./containers/Page/signup'))}
                    />
                    <Route
                        exact
                        path={'/forgotpassword'}
                        component={asyncComponent(() =>
                            import('./containers/Page/forgotPassword'))}
                    />
                    <Route
                        exact
                        path={'/resetpassword'}
                        component={asyncComponent(() =>
                            import('./containers/Page/resetPassword'))}
                    />
                    <Route
                        exact
                        path={'/404'}
                        component={asyncComponent(() =>
                            import('./containers/Page/404'))}
                    />
                    <Route
                        exact
                        path={'/500'}
                        component={asyncComponent(() =>
                            import('./containers/Page/500'))}
                    />

                    <RestrictedRoute
                        path="/dashboard"
                        component={App}
                        isLoggedIn={authenticated}
                    />
                </div>
            </Router>
        );
    }
}
