import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Grid, Row, Col, FormGroup, Image, Button } from "react-bootstrap";
import "./styles/Profile.css";

class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <Col lg={3}>
              <FormGroup bsClass="profile-title-wrapper">
                <Image
                  width="200"
                  height="200"
                  src={
                    "http://localhost:8080/Moodui/Profile_Pictures/" +
                    this.props.dpPath
                  }
                  circle
                />
              </FormGroup>
            </Col>
            <Col lg={9}>
              <Row>
                <div className="header-wrapper">
                  <Col lg={4}>
                    <h2>
                      {this.props.firstName} {this.props.lastName}
                    </h2>
                    <p>{this.props.bio}</p>
                    <Link style={{ color: "white" }} to="/editprofile/">
                      <Button bsClass="btn-edit-profile" type="submit">
                        Edit Profile
                      </Button>
                    </Link>
                  </Col>
                  <br />
                </div>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ProfileHeader;