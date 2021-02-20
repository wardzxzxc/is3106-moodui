import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginSignUpPage from "./LoginSignUpPage";
import BrowsingPage from "./BrowsingPage";
import EditProfile from "./EditProfile";
import Profile from "./Profile";
import CategoryPage from "./CategoryPage";
import CreateApp from './CreateApp';
import ConnectionsPage from "./ConnectionsPage";
import MoodboardsPage from "./MoodboardsPage";
import AppPage from "./AppPage";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={BrowsingPage} exact />
          <Route path="/loginsignup" component={LoginSignUpPage} />
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/profile" component={Profile} />
          <Route path="/category" component={CategoryPage} />
          <Route path="/createapp" component={CreateApp} />
          <Route path="/connections" component={ConnectionsPage} />
          <Route path="/moodboards" component={MoodboardsPage} />
          <Route path="/app" component={AppPage} />
          <ToastContainer autoClose={8000} />
        </div>
      </BrowserRouter>

    );
  }
}

export default DragDropContext(HTML5Backend)(App);
