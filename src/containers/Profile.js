import React, { Component } from "react";

import { Grid, Row, Col } from "react-bootstrap";
import "../components/styles/Profile.css";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs";
import ProfileMenu from "../components/ProfileMenu";
import * as ApiManager from "../services/ApiManager.js";
import renderIf from "../lib/renderIf";
import EmptyMoodboard from "../components/EmptyMoodboard";
import MoodBoard from "../components/MoodBoard";
import MoodBoardCreateForm from "../components/MoodBoardCreateForm";
import StichedBox from "../components/StichedBox";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      bio: null,
      apps: [],
      moodboards: [],
      isLoaded: false,
      dpPath: null,
      username: null,
      show: false
    };
  }

  componentDidMount = () => {
    this.fetchUserProfile(this.prepareUserProfile);
    this.refresh();
  };

  refresh = () => {
    this.fetchUserApps();
    this.fetchUserMoodboards();
    this.setState({
      isLoaded: true
    });
  };

  fetchUserMoodboards = () => {
    ApiManager.fetchUserMoodboards(sessionStorage.getItem("userId")).then(
      result => {
        this.setState({
          moodboards: result.data
        });

        console.log(result.data);
      }
    );
  };

  prepareUserProfile = result => {
    if (result.status === 200) {
      this.setState({
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        bio: result.data.bio,
        dpPath: result.data.dpPath,
        username: result.data.username
      });
    } else {
      //catch error
    }
  };

  prepareUpdatedUser = result => {
    if (result.status === 204) {
      this.fetchUserProfile(this.prepareUserProfile);
    }
  };

  fetchUserProfile = prepareUserProfile => {
    ApiManager.fetchUserDetails().then(result => {
      prepareUserProfile(result);
    });
  };

  fetchUserApps = () => {
    ApiManager.fetchUserApps(sessionStorage.getItem("userId")).then(result =>
      this.setState({
        apps: result.data
      })
    );
  };

  handleMoodboardDelete = id => {
    this.deleteMoodboard(id, this.prepareUpdatedUser);
  };

  deleteMoodboard = (id, prepareUpdatedUser) => {
    ApiManager.deleteMoodboard(id, prepareUpdatedUser).then(result => {
      ApiManager.fetchUserMoodboards(sessionStorage.getItem("userId")).then(
        result =>
          this.setState({
            moodboards: result.data
          })
      );
    });
  };

  handleAppDelete = id => {
    this.deleteApp(id, this.prepareUpdatedUser);
  };

  handleSelect = id => {
    sessionStorage.setItem("selectedAppId", id);
  };

  handleMoodboardSelect = id => {
    sessionStorage.setItem("selectedMoodboardId", id);
    console.log(id);
  };

  onHide = () => {
    this.setState({ show: false });
  };

  onShow = () => {
    this.setState({ show: true });
  };

  deleteApp = (id, prepareUpdatedUser) => {
    ApiManager.deleteApp(id, prepareUpdatedUser).then(result => {
      ApiManager.fetchUserApps(sessionStorage.getItem("userId")).then(result =>
        this.setState({
          apps: result.data
        })
      );
    });
  };

  renderMoodBoards = () => {
    const allMoodboards = this.state.moodboards;
    var render = [];
    if (allMoodboards.length !== 0) {
      allMoodboards.map(moodboard => {
        if (moodboard.screenshots.length !== 0) {
          let lastIndex = moodboard.screenshots.length - 1;
          render.push(
            <MoodBoard
              key={moodboard.moodboardId}
              moodboard={moodboard}
              screenshot={moodboard.screenshots[lastIndex].photo}
              appName={moodboard.screenshots[lastIndex].appName}
            />
          );
        } else {
          render.push(
            <EmptyMoodboard key={moodboard.moodboardId} moodboard={moodboard} />
          );
        }
      });
    }
    return render;
  };

  render() {
    if (sessionStorage.getItem("userId") === null) {
      return <Redirect to="/loginsignup" />;
    }
    return (
      <div>
        <div className="left-sidebar-wrapper">
          {renderIf(this.state.isLoaded)(
            <ProfileMenu
              path={this.state.dpPath}
              username={this.state.username}
            />
          )}
        </div>
        <div className="profile-content">
          {renderIf(this.state.isLoaded)(<ProfileHeader {...this.state} />)}
          {renderIf(this.state.isLoaded)(
            <ProfileTabs
              {...this.state}
              fetchUserApps={this.fetchUserApps}
              onAppDelete={this.handleAppDelete}
              onMoodboardDelete={this.handleMoodboardDelete}
              onAppSelect={this.handleSelect}
              onMoodboardSelect={this.handleMoodboardSelect}
            />
          )}
        </div>
        <div
          className="rightsideMenuWrapper"
          style={{ "text-align": "center" }}
        >
            {renderIf(sessionStorage.getItem("userId") !== null)(
          <div
            className="rightsideMenuWrapper"
            style={{ "text-align": "center" }}
          >
            <StichedBox onShow={this.onShow} />
            {this.renderMoodBoards()}
          </div>
        )}
       
        <MoodBoardCreateForm
          {...this.state}
          onHide={this.onHide}
          refresh={this.refresh}
        />
        </div>
      </div>
    );
  }
}

export default Profile;
