import React, { Component } from "react";
import {
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
  Grid,
  Row,
  Image,
  Checkbox,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import renderIf from "../lib/renderIf";
import "./styles/CreateAppForm.css";
import * as Notification from "../services/NotificationManager";
import FormValidator from "../FormValidator";
import { Redirect } from "react-router-dom";

class CreateAppForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: "Name is required."
      },
      {
        field: "description",
        method: "isEmpty",
        validWhen: false,
        message: "Description is required."
      },
      {
        field: "logoUpload",
        method: "isEmpty",
        validWhen: false,
        message: "Logo is required."
      }
    ]);

    this.state = {
      name: this.props.name,
      description: this.props.description,
      isPublic: this.props.isPublic,

      errorMsg: null,
      hasError: null,

      logoUpload: this.props.logo,
      logoUploadURL: null,

      ssUploads: [],
      ssUploadURLs: [],

      category: [],
      title: "Select a Category",
      categoryLoaded: true,
      categorySelected: true,
      cId: null,

      redirect: false,

      validation: this.validator.valid()
    };
  }

  readUploadedFile = file => {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  createApp = async () => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (this.state.category.length === 0) {
      this.setState({
        categorySelected: false
      });
    }

    if (validation.isValid && this.state.category.length !== 0) {
      const logo64 = await this.readUploadedFile(this.state.logoUpload);
      const createAppForm = {
        name: this.state.name,
        description: this.state.description,
        isPublic: this.state.isPublic,
        logo: logo64.split(",")[1]
      };

      let allSS64 = [];

      if (this.state.ssUploads.length >= 5) {
        this.state.ssUploads.forEach(async screenshot => {
          const ss64 = await this.readUploadedFile(screenshot);
          allSS64.push(ss64.split(",")[1]);
        });
        const screenshots = {
          screenshots: allSS64
        };

        this.props.createApp(this.state.cId, createAppForm, screenshots);
        this.state.redirect = true;
      } else {
        Notification.notifyError(
          "App not created: Please upload at least five screenshots to create an app!"
        );
      }
    }
  };

  handleCreateAppResponse = result => {
    if (result.status === 200) {
      this.setState({
        ssUploads: [],
        ssUploadURLs: []
      });
    } else {
      this.setState({
        errorMsg: result.response.data.error,
        hasError: true
      });
    }
  };

  picSelectedHandler = event => {
    let ssUploads = [];
    let ssUploadURLs = [];
    for (var i = 0; i < event.target.files.length; i++) {
      ssUploads[i] = event.target.files[i];
      ssUploadURLs[i] = URL.createObjectURL(event.target.files[i]);
    }
    //to allow those that uploaded once and want to upload even more
    let finalSSUploads = [...this.state.ssUploads, ...ssUploads];
    let finalSSUploadsURLs = [...this.state.ssUploadURLs, ...ssUploadURLs];
    this.setState({
      ssUploads: finalSSUploads,
      ssUploadURLs: finalSSUploadsURLs
    });
  };

  logoSelectedHandler = event => {
    let logoUpload = event.target.files[0];
    let logoUploadURL = URL.createObjectURL(event.target.files[0]);
    this.setState({
      logoUpload,
      logoUploadURL
    });
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.id]: event.target.value
      },
      () => {
        this.props.handleParentChange();
      }
    );
  };

  handleDropdown = eventKey => {
    console.log(eventKey);

    this.setState({
      category: eventKey,
      title: eventKey.name,
      categorySelected: true,
      cId: eventKey.categoryId
    });
  };

  handleCheckBox = event => {
    this.setState({
      isPublic: event.target.checked
    });
  };

  renderImages = () => {
    let images = [];
    for (var i = 0; i < this.state.ssUploads.length; i++) {
      images.push(
        <div className="screenshot-wrapper">
          <Image
            className="screenshot"
            width="252.5px"
            height="523.44px"
            src={this.state.ssUploadURLs[i]}
            rounded
          />
        </div>
      );
    }

    return images;
  };

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;

    return (
      <div className="content-wrapper">
        <Grid fluid={true}>
          <Col style={{ marginBottom: "30px", marginTop: "30px" }}>
            <div>
              <p className="createAppTitle">Create New App</p>
            </div>

            <p className="createAppSubtitle">Add to your portfolio</p>
          </Col>
          <Row className="app-form-row">
            <Form horizontal>
              <Col lg={5} className="left-col">
                <div className={validation.name.isInvalid && "has-error"}>
                  <FormGroup controlId="name" onChange={this.handleChange}>
                    <Row>
                      <p className="create-app-form-label">Name</p>
                    </Row>
                    <Row>
                      <FormControl
                        bsClass="create-app-input"
                        type="name"
                        placeholder="Name of your app"
                      />
                      <span className="help-block">
                        {validation.name.message}
                      </span>
                    </Row>
                  </FormGroup>
                </div>

                <div
                  className={validation.description.isInvalid && "has-error"}
                >
                  <FormGroup
                    controlId="description"
                    onChange={this.handleChange}
                  >
                    <Row>
                      <p className="create-app-form-label">Description</p>
                    </Row>
                    <Row>
                      <FormControl
                        bsClass="create-app-input"
                        type="description"
                        placeholder="Description of the app"
                      />
                      <span className="help-block">
                        {validation.description.message}
                      </span>
                    </Row>
                  </FormGroup>
                </div>

                <FormGroup controlId="category" onChange={this.handleChange}>
                  <Row>
                    <p className="create-app-form-label">Category</p>
                  </Row>
                  <Row>
                    {renderIf(this.state.categoryLoaded)(
                      <DropdownButton
                        onSelect={eventKey => this.handleDropdown(eventKey)}
                        title={this.state.title}
                        id="category"
                      >
                        {this.props.categories.map(category => (
                          <MenuItem eventKey={category}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </DropdownButton>
                    )}
                    {renderIf(!this.state.categorySelected)(
                      <div className="has-error">
                        <span className="help-block">
                          Category is required.
                        </span>
                      </div>
                    )}
                  </Row>
                </FormGroup>

                <FormGroup controlId="formHorizontalPublic">
                  <Row>
                    <p className="create-app-form-label">Make Public</p>

                    <Checkbox
                      checked={this.state.isPublic}
                      onChange={this.handleCheckBox}
                    />
                  </Row>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <div className={validation.logoUpload.isInvalid && "has-error"}>
                  <FormGroup controlId="formHorizontalLogo">
                    <Row style={{ marginLeft: "40%", marginBottom: "6%" }}>
                      <p className="create-app-form-label">App Logo</p>
                    </Row>

                    <Image
                      style={{ marginLeft: "40%" }}
                      width="100"
                      height="100"
                      src={this.state.logoUploadURL}
                      rounded
                    />
                    <span
                      className="help-block"
                      style={{ textAlign: "center" }}
                    >
                      {validation.logoUpload.message}
                    </span>

                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload"
                      style={{ width: "60%", marginLeft: "20%" }}
                    >
                      Choose File
                    </label>

                    <input
                      id="file-upload"
                      style={{ display: "none" }}
                      type="file"
                      onChange={this.logoSelectedHandler}
                    />
                  </FormGroup>
                </div>
              </Col>
            </Form>
          </Row>
        </Grid>

        <div className="screenshots">
          <Col className="screenshot-wrapper" lg={12}>
            <Col lg={3} className="screenshot-box">
              <p className="create-app-form-label">
                Upload your screenshots here!
              </p>
              <label
                htmlFor="screenshot-file-upload"
                className="choose-file-btn"
              >
                Choose Files
              </label>
              <input
                id="screenshot-file-upload"
                style={{ display: "none" }}
                type="file"
                onChange={this.picSelectedHandler}
                multiple
              />
            </Col>
            {renderIf(this.state.ssUploads.length !== 0)(
              <Row>
                {this.state.ssUploadURLs.map((screenshot, index) => (
                  <Image
                    className="screenshot"
                    width="252.5px"
                    height="523.44px"
                    src={screenshot}
                    key={index}
                    rounded
                  />
                ))}
              </Row>
            )}
          </Col>
        </div>
        <Button
          bsClass="choose-file-btn"
          bsSize="large"
          onClick={this.createApp}
          block
        >
          Create App
        </Button>
        {renderIf(this.state.redirect)(<Redirect to="/profile" />)}
      </div>
    );
  }
}

export default CreateAppForm;