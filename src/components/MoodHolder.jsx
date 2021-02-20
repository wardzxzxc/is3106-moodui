import React, { Component } from "react";
import { Col, Image } from "react-bootstrap";
import "./styles/Holder.css";
import { Link } from "react-router-dom";


class MoodHolder extends Component {

  renderMoodboardScreenshots = (moodboard) => {
    if (moodboard.screenshots.length === 0) {
      console.log('test')
      return <Image width="200" height="200" src="/images/logoMoodboard.png" />
    } else {
      console.log( moodboard.screenshots[0].appName)
      console.log(moodboard.screenshots[0].photo)
      return <Image
        width="100"
        height="200"
        key={moodboard.screenshots[0].screenshotId}
        src={
          "http://localhost:8080/Moodui/" +
          moodboard.screenshots[0].appName +
          "/" +
          moodboard.screenshots[0].photo
        } />
    }
  }
  render() {
    return (
      <div>
        {this.props.moodboards.map(moodboard => {
          return (
            <Col lg={3} className="holder" key={moodboard.moodboardId}>
              {this.renderMoodboardScreenshots(moodboard)}
              {/* <Image width="200" height="200" src="/images/logoMoodboard.png" /> */}

              <Link to="/moodboards/">
                <h4
                  className="link-color"
                  onClick={() => this.props.onSelect(moodboard.moodboardId)}
                >
                  {moodboard.name}
                </h4>
              </Link>
              <h5>{moodboard.dateCreated}</h5>
              <a onClick={() => this.props.onDelete(moodboard.moodboardId)}>
                <Image width="20" height="20" src="/images/trashbin.png" />
              </a>
            </Col>
          );
        })}
      </div>
    );
  }
}

export default MoodHolder;