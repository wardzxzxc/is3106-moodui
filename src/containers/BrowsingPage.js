import React, { Component } from "react";
import "./styles/BrowsingPage.css";
import ProfileMenu from "../components/ProfileMenu";
import MoodBoardCreateForm from "../components/MoodBoardCreateForm";
import MoodBoard from "../components/MoodBoard";
import AlbumCards from "../components/AlbumCards";
import * as ApiManager from "../services/ApiManager.js";
import LandingPageMenu from "../components/LandingPageMenu";
import renderIf from "../lib/renderIf";
import StichedBox from "../components/StichedBox";
import EmptyMoodboard from "../components/EmptyMoodboard";

class BrowsingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      path: null,
      apps: [],
      moodboards: [],

      show: false,
      isLoaded: false
    };
  }

  componentDidMount = () => {
    this.refresh();
    this.fetchAllApps(this.prepareAllApps);
    if (sessionStorage.getItem("userId") != null) {
      this.refresh();
    }
  }

  refresh = () => {
    this.fetchUserDetails();
    this.fetchUserMoodboards();
  }

  fetchUserDetails = () => {
    ApiManager.fetchUserDetails().then(result => {
      this.setState({
        username: result.data.username,
        path: result.data.dpPath,
        isLoaded: true
      }, () => {
        console.log(this.state.path)
      });
    });
  };

  fetchUserMoodboards = () => {
    ApiManager.fetchUserMoodboards(sessionStorage.getItem("userId")).then(
      result => {
        this.setState({
          moodboards: result.data
        });
      }
    );
  };

  fetchAllApps = () => {
    ApiManager.fetchAllApps().then(result => {
      this.setState({
        apps: result.data
      });
    });
  };

  handleSelect = id => {
    sessionStorage.setItem("selectedAppId", id);
  };

  handleDrop = (mId, ssId) => {
    ApiManager.addScreenshotToMoodboard(mId, ssId).then(result => {
      this.refresh();
    });
  };

  onHide = () => {
    this.setState({ show: false });
  };

  onShow = () => {
    this.setState({ show: true }, () => console.log(this.state.show));
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
  }

  render() {
    console.log(this.state.apps);
    return (
      <div>
        {renderIf(sessionStorage.getItem("userId") !== null)(<ProfileMenu {...this.state} />)}
        {renderIf(sessionStorage.getItem("userId") === null)(
          <LandingPageMenu />
        )}

        <div className="content">
          <AlbumCards
            {...this.state}
            onSelect={this.handleSelect}
            handleDrop={this.handleDrop}
          />
        </div>
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
    );
  }
}

export default BrowsingPage;
