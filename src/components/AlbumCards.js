import React, { Component } from "react";
import "./styles/AlbumCards.css";
import {
  Grid,
  Row,
  Col,
  Image,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Screenshot from "../components/Screenshot";

class AlbumCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      searchDescription: "",
      filteredApps: [],

      isName: true,
      isUsername: false,
      isDescription: false,
      title: "Name"
    };
  }

  handleDropdown = eventKey => {
    if (eventKey === "Description") {
      this.setState({
        title: eventKey,
        isName: false,
        isDescription: true,
        isUsername: false
      });
    } else if (eventKey === "Username") {
      this.setState({
        title: eventKey,
        isName: false,
        isUsername: true,
        isDescription: false
      })
    } else {
      this.setState({
        title: eventKey,
        isName: true,
        isDescription: false,
        isUsername: false
      });
    }
  };

  updateSearch(event) {
    this.setState({
      searchName: event.target.value.substr(0, 20)
    });
  }

  renderApps() {
    let apps = [];
    this.state.filteredApps.map(app => {
      apps.push(
        <div>
          <Row className="first-row">
            <Col lg={1} sm={12}>
              <Image
                className="logoSize"
                src={
                  "http://localhost:8080/Moodui/" + app.name + "/" + app.logo
                }
                rounded
              />
            </Col>
            <Col lg={9} sm={12}>
              <div className="app-name"> {app.name} </div>
              <div className="description">{app.description}</div>
              <div className="description">
                {app.poster.username} | {app.category.name}{" "}
              </div>
            </Col>
            <Col lg={2} sm={12}>
              <Link to="/app/">
                <a
                  className="link"
                  onClick={() => this.props.onSelect(app.appId)}
                >
                  View More >
                </a>
              </Link>
            </Col>
          </Row>
          <Row className="second-row">
            <Screenshot
              appName={app.name}
              screenshot={app.screenshots[0]}
              handleDrop={this.props.handleDrop}
            />
            <Screenshot
              appName={app.name}
              screenshot={app.screenshots[1]}
              handleDrop={this.props.handleDrop}
            />
            <Screenshot
              appName={app.name}
              screenshot={app.screenshots[2]}
              handleDrop={this.props.handleDrop}
            />
            <Screenshot
              appName={app.name}
              screenshot={app.screenshots[3]}
              handleDrop={this.props.handleDrop}
            />
            <Screenshot
              appName={app.name}
              screenshot={app.screenshots[4]}
              handleDrop={this.props.handleDrop}
            />
          </Row>
        </div>
      );
    });
    return apps;
  }

  render() {
    {
      if (this.state.isName)
        this.state.filteredApps = this.props.apps.filter(app => {
          return (
            app.name
              .toLowerCase()
              .indexOf(this.state.searchName.toLowerCase()) !== -1
          );
        });
    }

    {
      if (this.state.isDescription)
        this.state.filteredApps = this.props.apps.filter(app => {
          return (
            app.description
              .toLowerCase()
              .indexOf(this.state.searchName.toLowerCase()) !== -1
          );
        });
    }

    {
      if (this.state.isUsername)
        this.state.filteredApps = this.props.apps.filter(app => {
          return (
            app.poster.username
              .toLowerCase()
              .indexOf(this.state.searchName.toLowerCase()) !== -1
          );
        });
    }

    return (
      <Grid fluid={true}>
        <div>
          <Row className="search-row">
            <Col lg={3}>
              <input
                class="search-input"
                type="text"
                value={this.state.searchName}
                onChange={this.updateSearch.bind(this)}
                placeholder="Search..."
              />
            </Col>
            <Col lg={1}>
              <DropdownButton
                onSelect={eventKey => this.handleDropdown(eventKey)}
                title={this.state.title}
                id="filterSearch"
              >
                <MenuItem eventKey="Name">Name</MenuItem>
                <MenuItem eventKey="Description">Description</MenuItem>
                <MenuItem eventKey="Username">Username</MenuItem>
              </DropdownButton>
            </Col>
          </Row>
        </div>
        {this.renderApps()}
      </Grid>
    );
  }
}
export default AlbumCards;