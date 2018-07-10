import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link, Redirect} from 'react-router-dom';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import Auth0 from '../../helpers/auth0';
import Firebase from '../../helpers/firebase';
import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import skygear from '../../server';

@inject('auth', 'routing')
@observer
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            username: "",
            password: "",
        };
    }

    componentWillReceiveProps(nextProps) {
        const auth = this.props.auth;

        if (
            auth.authenticated !== nextProps.authenticated &&
            nextProps.authenticated === true
        ) {
            this.setState({redirectToReferrer: true});
        }
    }

    handleLogin = () => {
        const auth = this.props.auth;
        const {location, push, goBack} = this.props.routing;
        if (this.state.password.length > 2 && this.state.username.length > 2) {
            skygear.auth.loginWithUsername(this.state.username, this.state.password).then((user) => {
                console.log(user.access.roles);
                auth.authenticated = true;
                push('/dashboard');
            }, (error) => {
                console.log(error);
                auth.authenticated = false;
                if (error.error.code === skygear.ErrorCodes.ResourceNotFound) {
                    this.errorModalShow = true;
                    this.errorMessage = "خطا در نام کاربری یا رمز عبور. نام کاربری یا رمز عبور وارد شده اشتباه است."
                    // the username has already existed
                } else {
                    // other kinds of error
                }
            });
        }
    };

    render() {
        const from = {pathname: '/dashboard'};
        const {redirectToReferrer} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }
        return (
            <SignInStyleWrapper className="isoSignInPage">
                <div className="isoLoginContentWrapper">
                    <div className="isoLoginContent">
                        <div className="isoLogoWrapper">
                            <Link to="/dashboard">
                                <IntlMessages id="page.signInTitle"/>
                            </Link>
                        </div>

                        <div className="isoSignInForm">
                            <div className="isoInputWrapper">
                                <Input size="large" placeholder="نام کاربری"
                                       value={this.state.username}
                                       onChange={e => this.setState({username: e.target.value})}
                                />
                            </div>

                            <div className="isoInputWrapper">
                                <Input size="large" type="password" placeholder="رمز عبور"
                                       value={this.state.password}
                                       onChange={e => this.setState({password: e.target.value})}
                                />
                            </div>

                            <div className="isoInputWrapper isoLeftRightComponent">
                                <Checkbox>
                                    <IntlMessages id="page.signInRememberMe"/>
                                </Checkbox>
                                <Button type="primary" onClick={this.handleLogin}>
                                    <IntlMessages id="page.signInButton"/>
                                </Button>
                            </div>

                            <p className="isoHelperText">
                                <IntlMessages id="page.signInPreview"/>
                            </p>

                            <div className="isoInputWrapper isoOtherLogin">
                                <Button onClick={this.handleLogin} type="primary btnFacebook">
                                    <IntlMessages id="page.signInFacebook"/>
                                </Button>
                                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                                    <IntlMessages id="page.signInGooglePlus"/>
                                </Button>

                                {Auth0.isValid &&
                                <Button
                                    onClick={() => {
                                        Auth0.login(this.handleLogin);
                                    }}
                                    type="primary btnAuthZero"
                                >
                                    <IntlMessages id="page.signInAuth0"/>
                                </Button>}

                                {Firebase.isValid && <FirebaseLogin login={this.handleLogin}/>}
                            </div>
                            <div className="isoCenterComponent isoHelperWrapper">
                                <Link to="/forgotpassword" className="isoForgotPass">
                                    <IntlMessages id="page.signInForgotPass"/>
                                </Link>
                                <Link to="/signup">
                                    <IntlMessages id="page.signInCreateAccount"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SignInStyleWrapper>
        );
    }
}