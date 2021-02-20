import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button
} from "react-bootstrap";
import * as Notification from "../services/NotificationManager";
import FormValidator from "../FormValidator";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "currentPw",
        method: "isEmpty",
        validWhen: false,
        message: "Current password is required."
      },
      {
        field: "newPw",
        method: "isEmpty",
        validWhen: false,
        message: "New password is required."
      },
      {
        field: "confirmPw",
        method: "isEmpty",
        validWhen: false,
        message: "Confirm new password."
      },
      {
        field: "currentPw",
        method: this.passwordValidation,
        validWhen: true,
        message: "Password does not match your current password."
      },
      {
        field: "confirmPw",
        method: this.passwordMatch,
        validWhen: true,
        message: "New password and password confirmation do not match."
      }
    ]);

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber,
      dateJoined: this.props.dateJoined,
      password: this.props.password,
      username: this.props.username,
      bio: this.props.bio,
      path: this.props.path,

      currentPw: "",
      newPw: "",
      confirmPw: "",

      validation: this.validator.valid()
    };
  }

  //Function to test whether curentPw is correct. To be passed to the rules above.
  passwordValidation = (current, state) => this.state.password === current;
  //Function to test whether newPw and confirmPw match. To be passed to the rules above.
  passwordMatch = (confirmation, state) => this.state.newPw === confirmation;

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handlePasswordUpdateResult = result => {
    if (result.status === 204 || result.status === 200) {
      Notification.notifySuccess("Password successfully updated!");
    } else {
      Notification.notifyError(result.response.data.error);
    }
  };

  handlePasswordUpdate = event => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    // this.submitted = true;

    if (validation.isValid) {
      const editForm = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        dateJoined: this.state.dateJoined,
        username: this.state.username,
        password: this.state.newPw,
        bio: this.state.bio
      };

      this.props.updateProfile(editForm, this.handlePasswordUpdateResult);
    }
  };

  render() {
    let validation =  this.state.validation; 
    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <Col lg={12}>
              <div className="header-wrapper">
                <h3>CHANGE PASSWORD</h3>
              </div>
              <Form horizontal onSubmit={this.handlePasswordUpdate}>
                <div className={validation.currentPw.isInvalid && "has-error"}>
                  <FormGroup
                    bsClass="title-wrapper"
                    controlId="currentPw"
                    onChange={this.handleChange}
                  >
                    <FormControl
                      lg={12}
                      type="password"
                      placeholder="Current Password"
                      bsClass="input"
                    />
                  </FormGroup>
                  <span className="help-block title-wrapper">
                    {validation.currentPw.message}
                  </span>
                </div>
                <div className={validation.newPw.isInvalid && "has-error"}>
                  <FormGroup
                    bsClass="title-wrapper"
                    controlId="newPw"
                    onChange={this.handleChange}
                  >
                    <FormControl
                      lg={12}
                      type="password"
                      placeholder="New Password"
                      bsClass="input"
                    />
                  </FormGroup>
                  <span className="help-block title-wrapper">{validation.newPw.message}</span>
                </div>

                <div className={validation.confirmPw.isInvalid && "has-error"}>
                  <FormGroup
                    bsClass="title-wrapper"
                    controlId="confirmPw"
                    onChange={this.handleChange}
                  >
                    <FormControl
                      lg={12}
                      type="password"
                      placeholder="Confirm Password"
                      bsClass="input"
                    />
                  </FormGroup>
                  <span className="help-block title-wrapper" > {validation.confirmPw.message} </span>
                </div>

                <FormGroup bsClass="title-wrapper">
                  <Button bsClass="btn-edit" type="submit">
                    Change Password
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ChangePassword;
