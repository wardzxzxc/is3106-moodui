import React, { Component } from 'react';
import {
    Col, Form, FormGroup, ControlLabel,
    FormControl, Button
} from 'react-bootstrap';
import './styles/SignUpForm.css';
import 'react-toastify/dist/ReactToastify.css';
import * as Notification from '../services/NotificationManager';
import FormValidator from "../FormValidator";

class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.validator = new FormValidator([
            {
                field: 'signUpFirstName',
                method: 'isEmpty',
                validWhen: false,
                message: 'First Name is required.'
            },
            {
                field: 'signUpLastName',
                method: 'isEmpty',
                validWhen: false,
                message: 'Last Name is required.'
            },
            {
                field: 'signUpEmail',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email is required.'
            },
            {
                field: 'signUpUsername',
                method: 'isEmpty',
                validWhen: false,
                message: 'Username is required.'
            },
            {
                field: 'signUpPassword',
                method: 'isEmpty',
                validWhen: false,
                message: 'Password is required.'
            },
            {
                field: 'signUpPhoneNum',
                method: 'isEmpty',
                validWhen: false,
                message: 'Phone Number is required.'
            },
            {
                field: 'signUpPhoneNum',
                method: 'isNumeric',
                validWhen: true,
                message: 'Please enter an appropriate phone number.'
            },
            {
                field: "confirmPassword",
                method: "isEmpty",
                validWhen: false,
                message: "Confirm new password."
            },
            {
                field: "confirmPassword",
                method: this.passwordMatch,
                validWhen: true,
                message: "Password and password confirmation do not match."
            },
        ]);

        this.state = {
            signUpFirstName: "",
            signUpLastName: "",
            signUpEmail: "",
            signUpUsername: "",
            signUpPassword: "",
            confirmPassword: "",
            signUpPhoneNum: "",

            validation: this.validator.valid(),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

      //Function to test whether signUpPassword and confirmPassword match. To be passed to the rules above.
  passwordMatch = (confirmation, state) => this.state.signUpPassword === confirmation;

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmitResult = (result) => {

        if (result.status === 200) {
            Notification.notifySuccess("Sign up successful!");
            this.setState({
                signUpFirstName: "",
                signUpLastName: "",
                signUpEmail: "",
                signUpUsername: "",
                signUpPassword: "",
                confirmPassword: "",
                signUpPhoneNum: "",
            });
        } else {
            Notification.notifyError(result.response.data.error);
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });

        if (validation.isValid) {
            const signUpForm = {
                "firstName": this.state.signUpFirstName,
                "lastName": this.state.signUpLastName,
                "email": this.state.signUpEmail,
                "username": this.state.signUpUsername,
                "password": this.state.signUpPassword,
                "phoneNumber": this.state.signUpPhoneNum
            };
            this.props.signUp(signUpForm, this.handleSubmitResult);
        }
    };

    render() {
        let validation =  this.state.validation; 
        return (

            <Col>
                <div className="signup-header-wrapper">
                    <h3>SIGN UP</h3>
                </div>
                <Form horizontal onSubmit={this.handleSubmit} className="signup-form-wrapper">

                    <div className={validation.signUpFirstName.isInvalid && 'has-error'}>
                        <FormGroup controlId="signUpFirstName" onChange={this.handleChange}>
                            <Col sm={10}>
                                <FormControl type="firstName" placeholder="First Name" bsClass="signup-input" />
                            </Col>
                        </FormGroup>
                        <span className="help-block">{validation.signUpFirstName.message}</span>
                    </div>

                    <div className={validation.signUpLastName.isInvalid && 'has-error'}>
                        <FormGroup controlId="signUpLastName" onChange={this.handleChange}>
                            <Col sm={10}>
                                <FormControl type="lastName" placeholder="Last Name" bsClass="signup-input" />
                            </Col>
                        </FormGroup>
                        <span className="help-block">{validation.signUpLastName.message}</span>
                    </div>

                    <div className={validation.signUpEmail.isInvalid && 'has-error'}>
                        <FormGroup controlId="signUpEmail" onChange={this.handleChange}>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Email" bsClass="signup-input" />
                            </Col>
                        </FormGroup>
                        <span className="help-block">{validation.signUpEmail.message}</span>
                    </div>

                    <div className={validation.signUpPhoneNum.isInvalid && 'has-error'}>
                        <FormGroup controlId="signUpPhoneNum" onChange={this.handleChange}>
                            <Col sm={10}>
                                <FormControl type="phoneNumber" placeholder="Phone Number" bsClass="signup-input" />
                            </Col>
                        </FormGroup>
                        <span className="help-block">{validation.signUpPhoneNum.message}</span>
                    </div>

                    <div className={validation.signUpUsername.isInvalid && 'has-error'}>
                        <FormGroup controlId="signUpUsername" onChange={this.handleChange}>
                            <Col sm={10}>
                                <FormControl type="username" placeholder="Username" bsClass="signup-input" />
                            </Col>
                        </FormGroup>
                        <span className="help-block">{validation.signUpUsername.message}</span>
                    </div>

                    <div className={validation.signUpPassword.isInvalid && 'has-error'}>
                        <FormGroup controlId="signUpPassword" onChange={this.handleChange}>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Password" bsClass="signup-input" />
                            </Col>
                        </FormGroup>
                        <span className="help-block">{validation.signUpPassword.message}</span>
                    </div>

            <div className={validation.confirmPassword.isInvalid && "has-error"}>
                  <FormGroup controlId="confirmPassword" onChange={this.handleChange}>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Confirm Password" bsClass="signup-input" />
                    </Col>
                  </FormGroup>
                  <span className="help-block" >{validation.confirmPassword.message} </span>
                </div>

                    <FormGroup>
                        <Col smOffset={0} sm={10} lg={10}>
                            <Button bsClass="signup-custom-btn" type="submit">SIGN UP</Button>
                        </Col>
                    </FormGroup>

                </Form>
            </Col>
        )
    }
}
export default SignUpForm;