import React, { Component } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles/Holder.css";
import { Link } from "react-router-dom";

class AppHolder extends Component {
  render() {
    return (
      <div>
        <Link to="/createapp/">
          <h4 style={{ paddingLeft: "15px" }} className="link-color">
            Create New App
          </h4>
        </Link>
        {this.props.apps.map(app => {
          return (
            <Col lg={3} className="holder" key={app.appId}>
              <Image
                width="100"
                height="200"
                key={app.screenshots[0].screenshotId}
                src={
                  "http://localhost:8080/Moodui/" +
                  app.name +
                  "/" +
                  app.screenshots[0].photo
                }
              />
              <Image
                width="100"
                height="200"
                key={app.screenshots[1].screenshotId}
                src={
                  "http://localhost:8080/Moodui/" +
                  app.name +
                  "/" +
                  app.screenshots[1].photo
                }
              />
              <Link to="/app/">
                <h4 className="link-color" 
                    onClick={() => this.props.onSelect(app.appId)}>
                  {app.name}
                </h4>
              </Link>
              <h5>{app.dateCreated}</h5>
              <a onClick={() => this.props.onDelete(app.appId)}>
                <Image width="20" height="20" src="/images/trashbin.png" />
              </a>
            </Col>
          );
        })}
      </div>
    );
  }
}

export default AppHolder;
