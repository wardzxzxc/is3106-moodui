import React, { Component } from "react";
import "./styles/StichedBox.css";
import {
  Button
} from "react-bootstrap";


class LandingPageMoodBoard extends Component {
  render() {
    var customButton = {
      background: "#8ccdc2",
      color: "#fff",
      border: "2px solid #8ccdc2",
      "border-radius": "3px",
      padding: "5px 10px",
      width: "80%",
      margin:'5%'
    }
    return(
        <Button style={customButton} bsSize="small" onClick={this.props.onShow}>
          Create New MoodBoard
        </Button>
    );
  }
}

export default (LandingPageMoodBoard);
