import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./styles/ProfileMenu.css";
import { Link } from "react-router-dom";

class LandingPageMenu extends Component {
  render() {
    return (
      <div className="profile-menu">
        <ul className="list-unstyled">
          <a id="left-menu-brand" href="#">
            Moodui
          </a>
          <div className="profile">
            <Link to="/loginsignup">
              <Button bsClass="custom-btn" type="submit">
                LOG IN
              </Button>
            </Link>
          </div>
          <ul className="left-sidebar-nav list-unstyled">
          <Link to="/">
            <li>
              <a href="#">Browse</a>
            </li>
            </Link>
            <Link to="/category">
            <li>
              <a>Categories</a>
            </li>
            </Link>
          </ul>
        </ul>
      </div>
    );
  }
}
export default LandingPageMenu;
