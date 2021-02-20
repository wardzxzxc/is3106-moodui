import React, { Component } from "react";
import "./styles/AppCards.css";
import { Grid, Row, Col, Image } from "react-bootstrap";
import Screenshot from "../components/Screenshot";
import Comments from '../components/Comments';

class AppCards extends Component {

  constructor(props) {
    super(props);
    console.log("in appcards: " + this.props.comments);
    this.state = {
      appId: this.props.appId,
      description: this.props.description,
      dateCreated: this.props.dateCreated,
      screenshots: this.props.screenshots,
      posterUsername: this.props.posterUsername,
      posterId: this.props.posterId,
      appName: this.props.appName,
      dpLoaded: this.props.dpLoaded,
      dpPath: this.props.dpPath,
      logo: this.props.logo,
      comments: this.props.comments,
      commentType: "APP",
    };
  }

  render() {
    return (
      <div className="content">
        <Grid fluid={true}>
          <Row className="first-row">
            <Col lg={12} sm={12}>
              <Image
                className="logoSize"
                src={
                  "http://localhost:8080/Moodui/" + this.props.appName + "/" + this.props.logo
                }
                rounded
              />
              <text className="title"> {this.props.appName} </text>

              <div>
                <text className="appDescription">
                  By: {this.props.posterUsername}
                </text>
              </div>
              <div>
                <text className="appDescription">
                  Date Created: {this.props.dateCreated}
                </text>
              </div>
              <div>
                <text className="appDescription">
                  Description: {this.props.description}
                </text>

              </div>

            </Col>
          </Row>

          <Row className="last-row">
            {this.props.screenshots.map(screenshot => (
              <Screenshot appName={this.props.appName} screenshot={screenshot} handleDrop={this.props.handleDrop} />
            ))}
          </Row>
          <div>
            <Comments newComment={this.props.newComment} comments={this.props.comments} appId={this.state.appId} commentType={this.state.commentType} createComment={this.props.createComment} refresh={this.props.refresh}/>
          </div>
        </Grid>
      </div>
    );
  }
}
export default AppCards;
