import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Image,
  Button
} from "react-bootstrap";
import renderIf from "../lib/renderIf";
import DefaultProfilePic from "../images/DefaultProfilePic.jpg";
import * as Notification from '../services/NotificationManager';
import FormValidator from "../FormValidator";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: "firstName",
        method: 'isEmpty',
        validWhen: false,
        message: 'First Name is required.'
      },
      {
        field: "lastName",
        method: 'isEmpty',
        validWhen: false,
        message: 'Last Name is required.'
      },
      {
        field: "email",
        method: 'isEmpty',
        validWhen: false,
        message: 'Email is required.'
      },
      {
        field: "username",
        method: 'isEmpty',
        validWhen: false,
        message: 'Username is required.'
      },
      {
        field: "password",
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required.'
      },
      {
        field: "phoneNumber",
        method: 'isEmpty',
        validWhen: false,
        message: 'Phone Number is required.'
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
      path: this.props.dpPath,

      selectedFile: null,
      selectedFileURL: null,

      validation: this.validator.valid(),
    };
  }

  componentDidMount = () => {
    console.log(this.props);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleUpdateResult = (result) => {
    if (result.status === 204 || result.status === 200) {
      Notification.notifySuccess("Profile updated successfully!");
    } else {
      // Notification.notifyError(result.response.data.error);
      Notification.notifyError(result.response.data.error);
    }
  };

  profileUpdate = (event) => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    if (validation.isValid) {
      const editForm = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        dateJoined: this.state.dateJoined,
        username: this.state.username,
        password: this.state.password,
        bio: this.state.bio
      };
      this.props.updateProfile(editForm, this.handleUpdateResult);
    }
  };

  picSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileURL: URL.createObjectURL(event.target.files[0])
    });
  };

  handleUploadResponse = (result) => {
    if (result.status === 200) {
      Notification.notifySuccess("Image uploaded successfully!");
    } else {
      // Notification.notifyError(result.response.data.error);
      Notification.notifyError("Image not uploaded!");
    }
  };

  picUploadHandler = () => {
    let reader = new FileReader();
    reader.readAsDataURL(this.state.selectedFile);
    reader.onload = () => {
      this.setState({
        path: reader.result.split(",")[1]
      });
      const base64String = {
        dpPath: this.state.path
      };
      this.props.uploadProfilePic(base64String, this.handleUploadResponse);
    };
    reader.onerror = error => {
      Notification.notifyError(error.response.data.error);
    };
  };

  render() {
    let validation = this.state.validation;
    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <Col lg={12}>
              <div className="header-wrapper">
                <h3>MY PROFILE</h3>
              </div>
              <FormGroup bsClass="image-wrapper" style={{ marginLeft: '12.5em' }} >
                {renderIf(
                  this.state.path === null &&
                  this.state.selectedFile === null
                )(
                  <Image
                    width="200"
                    height="200"
                    src={DefaultProfilePic}
                    circle
                  />
                )}
                {renderIf(
                  this.state.path !== null &&
                  this.state.selectedFile === null
                )(
                  <Image
                    width="200"
                    height="200"
                    src={
                      "http://localhost:8080/Moodui/Profile_Pictures/" +
                      this.state.path
                    }
                    circle
                  />
                )}
                {renderIf(
                  (this.state.path === undefined) |
                  (this.state.path !== undefined) &&
                  this.state.selectedFile != null
                )(
                  <Image
                    width="200"
                    height="200"
                    src={this.state.selectedFileURL}
                    circle
                  />
                )}
              </FormGroup>
              <Row>
              <FormGroup bsClass="title-wrapper">
                <Col lg={12}>
                {renderIf(
                      this.state.selectedFile === null
                    )
                    (
                      <div>
                      <label htmlFor="file-upload" className="custom-file-upload">
                      EDIT IMAGE
                    </label>
                    <input
                      style={{ display: "none" }}
                      id="file-upload"
                      type="file"
                      onChange={this.picSelectedHandler}
                    />
                      </div>
                    )}

                </Col>
                <Col lg={12} >
                  {
                    renderIf(
                      this.state.selectedFile != null
                    )(
                      <Button bsClass="btn-edit" onClick={this.picUploadHandler}>
                        SAVE
                  </Button>
                    )
                  }
                </Col>
              </FormGroup>
              </Row>
             
              <Form horizontal onSubmit={this.profileUpdate}>

  

                <Col lg={6} style={{marginLeft:'0.4em'}}>
                  <div className={validation.firstName.isInvalid && 'has-error'}>
                    <FormGroup
                      bsClass="title-wrapper"
                      controlId="firstName"
                      onChange={this.handleChange}
                    >
                      <FormControl
                        lg={12}
                        type="firstName"
                        placeholder="First Name"
                        bsClass="input"
                        defaultValue={this.state.firstName}
                      />
                    </FormGroup>

                    <span className="help-block" style={{ marginLeft: '1em' }}>{validation.firstName.message}</span>
                  </div>
                </Col>




                <Col lg={5} style={{marginLeft:'0.4em'}}>
                  <div className={validation.lastName.isInvalid && 'has-error'}>
                    <FormGroup
                      controlId="lastName"
                      onChange={this.handleChange}
                    >
                      <FormControl
                        lg={12}
                        type="lastName"
                        placeholder="Last Name"
                        bsClass="input"
                        defaultValue={this.state.lastName}
                      />
                    </FormGroup>
                    <span className="help-block" style={{ marginLeft: '1.5em' }}  >{validation.lastName.message}</span>
                  </div>
                </Col>


                <div className={validation.email.isInvalid && 'has-error'}>
                  <FormGroup
                    bsClass="title-wrapper"
                    controlId="email"
                    onChange={this.handleChange}
                  >
                    <FormControl
                      lg={12}
                      type="email"
                      placeholder="Email"
                      bsClass="input"
                      defaultValue={this.state.email}
                    />
                  </FormGroup>
                  <span className="help-block" style={{ marginLeft: '2.5em' }}>{validation.email.message}</span>
                </div>
                <div className={validation.phoneNumber.isInvalid && 'has-error'}>
                  <FormGroup
                    bsClass="title-wrapper"
                    controlId="phoneNumber"
                    onChange={this.handleChange}
                  >
                    <FormControl
                      lg={12}
                      type="phoneNumber"
                      placeholder="Phone Number"
                      bsClass="input"
                      defaultValue={this.state.phoneNumber}
                    />
                  </FormGroup>
                  <span className="help-block" style={{ marginLeft: '2.5em' }}>{validation.phoneNumber.message}</span>
                </div>


                <FormGroup
                  bsClass="title-wrapper"
                  controlId="bio"
                  onChange={this.handleChange}
                >
                  <FormControl
                    lg={12}
                    type="bio"
                    placeholder="Bio"
                    bsClass="input"
                    componentClass="textarea"
                    defaultValue={this.state.bio}
                  />
                </FormGroup>
                <FormGroup bsClass="title-wrapper">
                  <Button bsClass="btn-edit" type="submit">
                    Update My Profile
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

export default UpdateProfile;
