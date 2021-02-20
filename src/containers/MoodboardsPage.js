import React, { Component } from 'react';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, 
        FormControl, Checkbox, Button} from 'react-bootstrap';
import ProfileMenu from '../components/ProfileMenu';
import MoodboardCards from '../components/MoodboardCards';
import AppCards from "../components/AppCards";
import * as ApiManager from "../services/ApiManager.js";
import renderIf from "../lib/renderIf";
import LandingPageMenu from "../components/LandingPageMenu";
import EmptyMoodboard from "../components/EmptyMoodboard";
import MoodBoard from "../components/MoodBoard";
import StichedBox from "../components/StichedBox";
import MoodBoardCreateForm from "../components/MoodBoardCreateForm";


class MoodboardsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          appId: "",
          description: "",
          dateCreated: "",
          screenshots: [],
          posterUsername: "",
          name: "",
          dpLoaded: false,
          dpPath: "",
          logo: "",
          moodboards: []
    
        };
      }
    
      componentDidMount = () => {
        this.fetchMoodboard();
        this.refresh()
      };
    

      fetchMoodboard = () => {
          ApiManager.fetchMoodboard().then(result => this.prepareMoodboard(result))
      }
    
      refresh = () => {
        this.fetchUserProfile(this.prepareUserProfile);
        this.fetchUserMoodboards();
      }
    
      fetchUserMoodboards = () => {
        ApiManager.fetchUserMoodboards(sessionStorage.getItem("userId"))
          .then(result => {
            this.setState({
              moodboards: result.data
            })
          })
      }

      prepareMoodboard = result => {
        if (result.status === 200) {
            this.setState({
              isLoaded: true,
              description: result.data.description,
              dateCreated: result.data.dateCreated,
              screenshots: result.data.screenshots,
              name: result.data.name,
      
            });
          }
          console.log(result.data)
          console.log(result.data.screenshots)
          
      };
    
      prepareApp = result => {
        if (result.status === 200) {
          this.setState({
            isLoaded: true,
            appId: result.data.appId,
            description: result.data.description,
            dateCreated: result.data.dateCreated,
            screenshots: result.data.screenshots,
            posterUsername: result.data.poster.username,
            appName: result.data.name,
            logo: result.data.logo
    
          });
        }
        console.log(result.data)
        console.log(result.data.screenshots)
    
      };
    
      prepareUserProfile = result => {
        if (result.status === 200) {
          this.setState({
            dpPath: result.data.dpPath,
            pathLoaded: true
          });
        }
      }
    
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
    
      fetchUserProfile = prepareUserProfile => {
        ApiManager.fetchUserDetails()
          .then(result => {
            prepareUserProfile(result);
          });
      };
    
      handleDrop = (mId, ssId) => {
        ApiManager.addScreenshotToMoodboard(mId, ssId)
          .then(result => {
            this.refresh();
          })
      }
    
      render() {
        return (
          <div>
            {renderIf(sessionStorage.getItem("userId") == null)(<LandingPageMenu />)}
            {renderIf(this.state.pathLoaded)(<ProfileMenu path={this.state.dpPath} />)}
            {renderIf(this.state.isLoaded)(<MoodboardCards {...this.state} handleDrop={this.handleDrop}/>)}
            <div className="rightsideMenuWrapper" style={{ 'text-align': "center" }}>
              <StichedBox onShow={this.onShow} />
              {this.renderMoodBoards()}
            </div>
            <MoodBoardCreateForm {...this.state} onHide={this.onHide} refresh={this.refresh} />
          </div>
        );
      }
    }


export default MoodboardsPage;