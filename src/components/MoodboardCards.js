import React, { Component } from "react";
import "./styles/MoodboardCards.css";
import { Grid, Row, Col, Form, Image, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Screenshot from "../components/Screenshot";

class MoodboardCards extends Component {
  state = {};
  render() {
    return (
      <div className="content">
        <Grid fluid={true}>
          <Row className="first-row">
            <Col lg={12} sm={12}>
              
              <text className="title"> {this.props.name} </text>

        
              <div>
                <text className="appDescription">
                  Date Created: {this.props.dateCreated}
                </text>
              </div>
              <div>
                <text className="appDescription">
                  Description: {this.props.description}
                </text>
              </div>
            </Col>
          </Row>
          <Row className="last-row">
            {this.props.screenshots.map(screenshot => (
              <Screenshot appName={screenshot.appName} screenshot={screenshot} handleDrop={this.props.handleDrop} />
            ))}
          </Row>
        </Grid>
      </div>
    );
  }
}
export default MoodboardCards;
