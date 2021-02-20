import React, { Component } from "react";
import "./styles/CategoryBar.css";
import AppHolder from "./AppHolder";
import axios from "axios";

import {
  Alert,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Image,
  Navbar,
  p
} from "react-bootstrap";

class CategoryBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: this.props.categories
    };
  }

  componentDidMount() {
    console.log(this.props.categories);
  }

  render() {
    return (
      <div className="cat-box">
        <Grid fluid={true}>
          {this.state.categoryList.map(category => (
            <Col xs={12} sm={6} md={4} lg={3}>
              <a
                key={category.categoryId}
                value={category.name}
                onClick={() =>
                  this.props.onSelected(category.categoryId, category.name)
                }
              >
                {category.name}
              </a>
            </Col>
          ))}
        </Grid>
      </div>
    );
  }
}

export default CategoryBar;
