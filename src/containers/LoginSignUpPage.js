import React, { Component } from "react";
import "./styles/LoginSignUpPage.css";
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Button,
  Image
} from "react-bootstrap";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import bg from "../images/bg14.jpg";
import * as ApiManager from "../services/ApiManager.js";
import renderIf from "../lib/renderIf";

class LoginSignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true
    };
  }

  login = (form, callback) => {
    ApiManager.login(form, callback);
  };

  signUp = (form, callback) => {
    ApiManager.signUp(form, callback);
  };

  changePage = event => {
    if (this.state.isLogin === true) {
      this.setState({
        isLogin: false
      });
    } else if (this.state.isLogin === false) {
      this.setState({
        isLogin: true
      });
    }
  };

  render() {
    return (
      <Grid
        fluid={true}
        className="noPadding"
        style={{ backgroundColor: "whitesmoke" }}
      >
        <a id="left-menu-brand" href="/">
          <header className="noMargin">
            {/* <Row className="top"> */}
            <Col lg={6} xs={12}>
              {/* <Row className="top">
                    <Image src={ logo }  height="12%" width="30%"  margin-bottom="50%" ></Image>
                    </Row> */}
              <Row className="leftContainer">
                <Image
                  src={bg}
                  className="login-image"
                  width="100%"
                  height="720px"
                />
                <p className="overlay">Moodui.io</p>
                <p className="subtitle-overlay">find your inspiration.</p>
              </Row>
            </Col>
            {/* </Row> */}
          </header>
        </a>
        <Col lg={6} className="noMargin">
          {/* <SignUpForm signUp = { this.signUp }/> */}

          {renderIf(this.state.isLogin === true)(
            <Col>
              <Row height="100px" style={{ marginTop: "2%" }}>
                <LoginForm login={this.login} />
              </Row>
              <Row height="30px">
                <a className="signup-link" onClick={this.changePage}>
                  Don't have an account? Sign up here
                </a>
              </Row>
            </Col>
          )}
          {renderIf(this.state.isLogin === false)(
            <Col>
              <Row height="120px">
                <SignUpForm signUp={this.signUp} />
              </Row>

              <Row height="30px">
                <a className="signup-link" onClick={this.changePage}>
                  Already have an account? Log in here
                </a>
              </Row>
            </Col>
          )}
        </Col>
      </Grid>
    );
  }
}

export default LoginSignUpPage;