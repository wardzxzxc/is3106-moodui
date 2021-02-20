import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import "./styles/ProfileMenu.css";
import { Link, Redirect } from "react-router-dom";
import DefaultProfilePic from "../images/DefaultProfilePic.jpg";
import renderIf from "../lib/renderIf";

class ProfileMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }
  }

  handleLogout = () => {
    sessionStorage.removeItem("userId");
    console.log(sessionStorage.getItem("userId"));
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/loginsignup" />;
    }
  };

  render() {
    console.log("path", this.props.path);
    return (
      <div className="profile-menu">
        <ul className="list-unstyled">
          <a id="left-menu-brand" href="/">
            <Image width="100" height="100" src="/images/logoPng.png" />
          </a>
          <div className="profile">
            {renderIf(this.props.path === null)(
              <Image id="profilePic" src={DefaultProfilePic} circle />
            )}

            {renderIf(this.props.path !== null)(
              <Image
                id="profilePic"
                src={
                  "http://localhost:8080/Moodui/Profile_Pictures/" +
                  this.props.path
                }
                circle
              />
            )}
            <a id="left-menu-username" href="/profile">
              {this.props.username}
            </a>
            {this.renderRedirect()}
            <Button
              bsClass="custom-btn"
              type="submit"
              onClick={this.handleLogout}
            >
              Log Out
            </Button>
          </div>
          <ul className="left-sidebar-nav list-unstyled">
            <Link to="/">
              <li>
                <a>Browse</a>
              </li>
            </Link>
            <Link to="/category">
              <li>
                <a>Categories</a>
              </li>
            </Link>
            <Link to="/profile">
              <li>
                <a>My Profile</a>
              </li>
            </Link>
            <Link to="/editprofile">
              <li>
                <a>Edit Profile</a>
              </li>
            </Link>
            <Link to="/createapp">
              <li>
                <a>Create App</a>
              </li>
            </Link>
          </ul>
        </ul>
      </div>
    );
  }
}

export default ProfileMenu;