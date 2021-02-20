import React, { Component } from "react";
import AppHolder from "../components/AppHolder";
import MoodHolder from "../components/MoodHolder";

import {
  Grid,
  Tabs,
  Tab
} from "react-bootstrap";
import "./styles/Profile.css";

class ProfileTabs extends Component {
  
  render() {
    return (
      <div>
        <Grid>
          <Tabs defaultActiveKey={1}>
            <Tab eventKey={1} title="My Apps">
              <AppHolder apps={this.props.apps} onDelete={this.props.onAppDelete} onSelect={this.props.onAppSelect} />
            </Tab>
            <Tab eventKey={2} title="My Moodboard">
              <MoodHolder moodboards={this.props.moodboards} onDelete={this.props.onMoodboardDelete} onSelect={this.props.onMoodboardSelect}/>
            </Tab>
          </Tabs>
        </Grid>
      </div>
    );
  }
}

export default ProfileTabs;
