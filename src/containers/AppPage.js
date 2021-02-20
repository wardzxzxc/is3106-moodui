import React, { Component } from "react";
import ProfileMenu from "../components/ProfileMenu";
import AppCards from "../components/AppCards";
import * as ApiManager from "../services/ApiManager.js";
import renderIf from "../lib/renderIf";
import LandingPageMenu from "../components/LandingPageMenu";
import EmptyMoodboard from "../components/EmptyMoodboard";
import MoodBoard from "../components/MoodBoard";
import StichedBox from "../components/StichedBox";
import MoodBoardCreateForm from "../components/MoodBoardCreateForm";


class AppPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      appId: "",
      description: "",
      dateCreated: "",
      screenshots: [],
      posterUsername: "",
      posterId: "",
      appName: "",
      dpLoaded: false,
      dpPath: "",
      logo: "",
      comments: [],
      moodboards: [],
      newComment: "",
    };

    this.refresh = this.refresh.bind(this)
  }

  componentDidMount = () => {
    this.refresh();
  };

  refresh = () => {
    this.fetchApp();
    this.fetchUserProfile(this.prepareUserProfile);
    this.fetchUserMoodboards();
  }

//FETCH APP
  fetchApp = () => {
    ApiManager.fetchApp().
    then(result => this.prepareApp(result));
  };

  prepareApp = (result) => {
    if (result.status === 200) {
      console.log(result);
      this.setState({
        appId: result.data.appId,
        description: result.data.description,
        dateCreated: result.data.dateCreated,
        screenshots: result.data.screenshots,
        posterUsername: result.data.poster.username,
        posterId: result.data.poster.userId,
        appName: result.data.name,
        logo: result.data.logo,
        comments: result.data.comments,
        isLoaded: true,
        newComment: "",
      }, () => {
          console.log()
        });
    }
  };
  //FETCHAPP


//FETCHUSERPROFILE
  fetchUserProfile = prepareUserProfile => {
    ApiManager.fetchUserDetails()
      .then(result => {
        prepareUserProfile(result);
      });
  };

  prepareUserProfile = result => {
    if (result.status === 200) {
      this.setState({
        dpPath: result.data.dpPath,
        pathLoaded: true

      });
    }
    console.log("here")
    console.log(this.state.dpPath)
  };
  //FETCH USER PROFILE

//CREATE COMMENT
  createComment = (form, appId, commentType) => {
    ApiManager.createComment(form, appId, commentType)
    .then(result => {
      this.refresh();
    })
}
//CREATE COMMENT

// DRAG AND DROP
  handleDrop = (mId, ssId) => {
    ApiManager.addScreenshotToMoodboard(mId, ssId)
      .then(result => {
        this.refresh();
      })
  }
  onHide = () => {
    this.setState({ show: false });
  }

  onShow = () => {
    this.setState({ show: true }, () => console.log(this.state.show));
  }
  fetchUserMoodboards = () => {
    ApiManager.fetchUserMoodboards(sessionStorage.getItem("userId"))
      .then(result => {
        this.setState({
          moodboards: result.data
        })
      })
  }
  renderMoodBoards = () => {
    const allMoodboards = this.state.moodboards;
    var render = []
    if (allMoodboards.length !== 0) {
      allMoodboards.map(moodboard => {
        if (moodboard.screenshots.length !== 0) {
          let lastIndex = moodboard.screenshots.length - 1;
          render.push(<MoodBoard key={moodboard.moodboardId} moodboard={moodboard} screenshot={moodboard.screenshots[lastIndex].photo} appName={moodboard.screenshots[lastIndex].appName} />)
        } else {
          render.push(<EmptyMoodboard key={moodboard.moodboardId} moodboard={moodboard} />)
        }
      }
      )
    }
    return render;
  }
  //DRAG AND DROP

  render() {
    return (
      <div>
        {renderIf(sessionStorage.getItem("userId") == null)(<LandingPageMenu />)}
        {renderIf(this.state.pathLoaded)(<ProfileMenu path={this.state.dpPath} />)}
        {renderIf(this.state.isLoaded)(<AppCards {...this.state} handleDrop={this.handleDrop} refresh={this.refresh} createComment={this.createComment}/>)}
        <div className="rightsideMenuWrapper" style={{ 'text-align': "center" }}>
          <StichedBox onShow={this.onShow} />
          {this.renderMoodBoards()}
        </div>
        <MoodBoardCreateForm {...this.state} onHide={this.onHide} refresh={this.refresh} />
      </div>
    );
  }
}

export default AppPage;
