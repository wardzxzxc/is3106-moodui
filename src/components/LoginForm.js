import React, { Component } from "react";
import Styles from "./styles/LoginForm.css";
import { Col, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import * as Notification from "../services/NotificationManager";
import FormValidator from "../FormValidator";
import { Redirect } from "react-router-dom";
import renderIf from "../lib/renderIf";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "loginUsername",
        method: "isEmpty",
        validWhen: false,
        message: "Username is required."
      },
      {
        field: "loginPassword",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required."
      }
    ]);

    this.state = {
      loginUsername: "",
      loginPassword: "",
      isLoggedIn: false,

      validation: this.validator.valid()
    };

    this.submitted = false;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleLoginResult = result => {
    this.setState({
      username: "",
      password: ""
    });
    if (result.status === 200) {
      Notification.notifySuccess("Login successful!");
      this.setState({
        isLoggedIn: true
      });
    } else {
      Notification.notifyError(result.response.data.error);
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      // handle actual form submission here
      const loginForm = {
        username: this.state.loginUsername,
        password: this.state.loginPassword
      };
      this.props.login(loginForm, this.handleLoginResult);
    }
  };

  render() {
    let validation = this.submitted ?       // if the form has been submitted at least once
    this.validator.validate(this.state) :   // then check validity every time we render
    this.state.validation                   // otherwise just use what's in state

    return (
      <Col>
        <div className="login-header-wrapper">
          <h3>LOGIN</h3>
        </div>
        <Form
          horizontal
          onSubmit={this.handleSubmit}
          className="login-form-wrapper"
        >
          <div className={validation.loginUsername.isInvalid && "has-error"}>
            <FormGroup controlId="loginUsername" onChange={this.handleChange}>
              <Col sm={10}>
                <FormControl
                  type="username"
                  placeholder="Username"
                  bsClass="login-input"
                />
              </Col>
            </FormGroup>
            <span className="help-block">
              {validation.loginUsername.message}
            </span>
          </div>

          <div className={validation.loginPassword.isInvalid && "has-error"}>
            <FormGroup controlId="loginPassword" onChange={this.handleChange}>
              <Col sm={10}>
                <FormControl
                  type="password"
                  placeholder="Password"
                  bsClass="login-input"
                />
              </Col>
            </FormGroup>
            <span className="help-block">
              {validation.loginPassword.message}
            </span>
          </div>

          <FormGroup>
            <Col smOffset={0} sm={10} lg={10}>
              <Button bsClass="login-custom-btn" type="submit">
                LOGIN
              </Button>
              {renderIf(this.state.isLoggedIn)(<Redirect to="/" />)}
            </Col>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}

export default LoginForm;