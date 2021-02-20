import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";

import "../components/styles/Profile.css";
import UpdateProfile from "../components/UpdateProfile";
import ChangePassword from "../components/ChangePassword";
import ProfileMenu from "../components/ProfileMenu";
import * as ApiManager from '../services/ApiManager.js';
import renderIf from "../lib/renderIf";
import { Redirect } from "react-router-dom";

class EditProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      dateJoined: null,
      password: null,
      username: null,
      bio: null,
      dpPath: null,

      isLoaded: false,
    }
  }


  prepareUserDetails = (result) => {
    if (result.status === 200) {
      this.setState({
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        phoneNumber: result.data.phoneNumber,
        dateJoined: result.data.dateJoined,
        username: result.data.username,
        password: result.data.password,
        bio: result.data.bio,
        dpPath: result.data.dpPath,

        isLoaded: true,

      });
      console.log(result);

    } else {
      //catch error from fetch user
    }
  }

  uploadProfilePic = (base64String, callback) => {
    ApiManager.uploadDisplayPic(base64String)
      .then(result => {
        callback(result);
        this.fetchUserDetails(this.prepareUserDetails);
      })
  }

  fetchUserDetails = (prepareUserDetails) => {
    ApiManager.fetchUserDetails()
      .then(result => prepareUserDetails(result));
  }

  updateProfile = (updateProfileForm, callback) => {
    ApiManager.updateUser(updateProfileForm, callback)
      .then(result => {
        callback(result);
        this.fetchUserDetails(this.prepareUserDetails);
      })
  }

  componentDidMount = () => {
    this.fetchUserDetails(this.prepareUserDetails);
  }


  render() {
    if (sessionStorage.getItem("userId") === null) {
      return <Redirect to="/loginsignup" />
    }
    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <Col lg={2}>
              {renderIf(this.state.isLoaded)(
                <ProfileMenu path={this.state.dpPath} username={this.state.username} firstName={this.state.firstName} />
              )}
            </Col>
            <Col className="form-wrapper" lg={5}>
              {renderIf(this.state.isLoaded)(
                <UpdateProfile {...this.state} updateProfile={this.updateProfile} uploadProfilePic={this.uploadProfilePic} />
              )}
            </Col>
            <Col lg={5}>
              {renderIf(this.state.isLoaded)(
                <ChangePassword {...this.state} updateProfile={this.updateProfile} />
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EditProfile;
