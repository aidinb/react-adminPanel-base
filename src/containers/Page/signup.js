import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import Auth0 from '../../helpers/auth0/index';
import Firebase from '../../helpers/firebase';
import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';


@inject('auth', 'routing')
@observer
export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false,
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
        auth.login();
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <SignUpStyleWrapper className="isoSignUpPage">
                <div className="isoSignUpContentWrapper">
                    <div className="isoSignUpContent">
                        <div className="isoLogoWrapper">
                            <Link to="/dashboard">
                                <IntlMessages id="page.signUpTitle"/>
                            </Link>
                        </div>

                        <div className="isoSignUpForm">
                            <div className="isoInputWrapper isoLeftRightComponent">
                                <Input size="large" placeholder="First name"/>
                                <Input size="large" placeholder="Last name"/>
                            </div>

                            <div className="isoInputWrapper">
                                <Input size="large" placeholder="Username"/>
                            </div>

                            <div className="isoInputWrapper">
                                <Input size="large" placeholder="Email"/>
                            </div>

                            <div className="isoInputWrapper">
                                <Input size="large" type="password" placeholder="Password"/>
                            </div>

                            <div className="isoInputWrapper">
                                <Input
                                    size="large"
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <div className="isoInputWrapper" style={{marginBottom: '50px'}}>
                                <Checkbox>
                                    <IntlMessages id="page.signUpTermsConditions"/>
                                </Checkbox>
                            </div>

                            <div className="isoInputWrapper">
                                <Button type="primary">
                                    <IntlMessages id="page.signUpButton"/>
                                </Button>
                            </div>
                            <div className="isoInputWrapper isoOtherLogin">
                                <Button onClick={this.handleLogin} type="primary btnFacebook">
                                    <IntlMessages id="page.signUpFacebook"/>
                                </Button>
                                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                                    <IntlMessages id="page.signUpGooglePlus"/>
                                </Button>
                                {Auth0.isValid &&
                                <Button
                                    onClick={() => {
                                        Auth0.login(this.handleLogin);
                                    }}
                                    type="primary btnAuthZero"
                                >
                                    <IntlMessages id="page.signUpAuth0"/>
                                </Button>}

                                {Firebase.isValid &&
                                <FirebaseLogin signup={true} login={this.handleLogin}/>}
                            </div>
                            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                                <Link to="/signin">
                                    <IntlMessages id="page.signUpAlreadyAccount"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SignUpStyleWrapper>
        );
    }
}