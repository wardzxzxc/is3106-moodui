import React, { Component } from 'react';
import './styles/BrowsingPage.css';
import ProfileMenu from '../components/ProfileMenu';
import CreateAppForm from '../components/CreateAppForm';
import MoodBoard from '../components/MoodBoard';
import * as ApiManager from '../services/ApiManager.js'
import renderIf from "../lib/renderIf";
import * as Notification from "../services/NotificationManager";
import { Redirect } from "react-router-dom";
import MoodBoardCreateForm from "../components/MoodBoardCreateForm";
import StichedBox from "../components/StichedBox";
import EmptyMoodboard from "../components/EmptyMoodboard";

class CreateApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: null,
            username: null,

            name: "",
            description: "",
            isPublic: true,
            logo: "",
            category: [],

            isLoaded: false,

            categories: [],
            categoriesLoaded: false,

            moodboards: [],
            show: false,
        };
    }

    prepareUserDetails = (result) => {
        if (result.status === 200) {
            this.setState({
                username: result.data.username,
                path: result.data.dpPath,

                isLoaded: true
            });
        } else {

        }
    }

    handleChange = (state, value) => {
        this.setState({
            [state]: value
        })
    }

    fetchUserDetails = (prepareUserDetails) => {
        ApiManager.fetchUserDetails()
            .then(result => prepareUserDetails(result));
    }

    fetchCategories = () => {
        ApiManager.fetchCategories().then(result => {
            this.setState({
                categories: result.data,
                categoriesLoaded: true
            });
            console.log(result.data)
        });
    }

    fetchUserMoodboards = () => {
        ApiManager.fetchUserMoodboards(sessionStorage.getItem("userId")).then(
            result => {
                this.setState({
                    moodboards: result.data
                });
            }
        );
    };


    componentDidMount = () => {
        this.fetchUserDetails(this.prepareUserDetails)
        this.fetchCategories()
        this.fetchUserMoodboards()
    }

    createApp = (cId, createAppForm, screenshots) => {
        console.log(createAppForm);
        ApiManager.createApp(cId, createAppForm)
            .then(result => {
                if (result.status === 400) {
                    console.error(result)
                }
                ApiManager.createScreenshots(screenshots, result.data.id)
                    .then(result => {
                        this.setState({
                            name: null,
                            description: null,
                            isPublic: true,
                            logo: null,
                        })
                        Notification.notifySuccess("App has been created sucessfully")
                    }
                    )
                    .catch(error => {
                        Notification.notifyError(error.response.data.error)
                    })
            })
            .catch(error => {
                Notification.notifyError(error.response.data.error)
            })
    }

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

    onHide = () => {
        this.setState({ show: false });
    };

    onShow = () => {
        this.setState({ show: true }, () => console.log(this.state.show));
    };



    render() {
        if (sessionStorage.getItem("userId") === null) {
            return <Redirect to="/loginsignup" />
        }
        return (

            <div>
                {renderIf(this.state.isLoaded)(
                    <ProfileMenu path={this.state.path} username={this.state.username} />
                )}
                {renderIf(this.state.categoriesLoaded)(
                    <CreateAppForm handleParentChange={this.handleChange} createApp={this.createApp} {...this.state} />
                )}
                {/* <MoodBoard /> */}
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
        )
    }
}

export default CreateApp;
