import React, { Component } from "react";
import AppHolder from "./AppHolder";
import axios from "axios";
import "./styles/Holder.css";
import AppCards from "./AppCards";
import AlbumCards from "./AlbumCards";

class CategoryResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryApps: this.props.categoryApps,
      categoryName: this.props.categoryName
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryApps: nextProps.categoryApps,
      categoryName: nextProps.categoryName
    });
    console.log(nextProps.categoryApps);
  }

  render() {
    return (
      <div>
        <h3 style={{ paddingLeft: "20px" }}>
          Category: {this.state.categoryName}{" "}
        </h3>

        <AlbumCards
          apps={this.state.categoryApps}
          onSelect={this.props.onViewMore}
          handleDrop={this.props.handleDrop}
        />
      </div>
    );
  }
}

export default CategoryResult;
