import React, { Component } from "react";
import ProfileMenu from "../components/ProfileMenu";
import CategoryBar from "../components/CategoryBar";
import CategoryResult from "../components/CategoryResult";
import * as ApiManager from "../services/ApiManager.js";
import renderIf from "../lib/renderIf";
import "./styles/CategoryPage.css"
import EmptyMoodboard from "../components/EmptyMoodboard";
import MoodBoard from "../components/MoodBoard";
import MoodBoardCreateForm from "../components/MoodBoardCreateForm";
import StichedBox from "../components/StichedBox";
import LandingPageMenu from "../components/LandingPageMenu";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      categories: [],
      categoryName: "",
      categoryApps: [],
      isLoaded: false,
      userLoaded: false,
      moodboards: [],

    };

    this.handleViewMore = this.handleViewMore.bind(this);
  }

  handleSelect = (id, name) => {
    console.log("id", id);
    console.log("name", name);

    this.setState({
      selected: true,
      categoryName: name
    });
    this.fetchCategoryApps(id);
  };

  handleViewMore = id => {
    console.log("selectedAppId", id);
    sessionStorage.setItem("selectedAppId", id);
  };

  fetchCategoryApps = id => {
    ApiManager.fetchCategoryApps(id).then(result => {
      this.setState({
        categoryApps: result.data
      });
      console.log(this.state.categoryApps);
    });
  };

  fetchCategories = () => {
    ApiManager.fetchCategories().then(result => {
      this.setState({
        categories: result.data,
        isLoaded: true
      });
      console.log(result.data);
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

  componentDidMount = () => {
    this.fetchCategories();
    this.fetchUserDetails(this.prepareUserDetails);
    this.fetchUserMoodboards();

  };

  prepareUserDetails = (result) => {
    if (result.status === 200) {
      this.setState({
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        phoneNumber: result.data.phoneNumber,
        dateJoined: result.data.dateJoined,
        username: result.data.username,
        password: result.data.password,
        bio: result.data.bio,
        dpPath: result.data.dpPath,

        userLoaded: true,

      });
      console.log(result);

    } else {
      //catch error from fetch user
    }
  }


  fetchUserDetails = (prepareUserDetails) => {
    ApiManager.fetchUserDetails()
      .then(result => prepareUserDetails(result));
  }

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

  handleDrop = (mId, ssId) => {
    ApiManager.addScreenshotToMoodboard(mId, ssId)
      .then(result => {
        this.refresh();
      })
  }

  refresh = () => {
    this.fetchUserMoodboards();
    this.setState({
      isLoaded: true
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





  //for CategoryResult, not sure if need renderIf, it is working without it
  render() {
    return (
      <div>
        {renderIf(this.state.userLoaded)(
          <div role="navigation" className="navigation">
            <ProfileMenu path={this.state.dpPath} username={this.state.username} firstName={this.state.firstName} />
          </div>
        )}
        {renderIf(!this.state.userLoaded)(
          <div role="navigation" className="navigation">
            <LandingPageMenu />
          </div>
        )}
        <div className="category-content">
          {renderIf(this.state.isLoaded)(
            <CategoryBar
              onSelected={this.handleSelect}
              categories={this.state.categories}
            />
          )}

          {renderIf(this.state.selected)(
            <CategoryResult {...this.state} onViewMore={this.handleViewMore} handleDrop={this.handleDrop} />
          )}

          {renderIf(!this.state.selected)(
            <h3 style={{ paddingLeft: "20px" }}>
              Please choose a category to begin!
            </h3>
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

export default CategoryPage;
