import React, { Component } from 'react';
import Styles from './styles/SingleComment.css';
import {
    Grid,
    Row,
    Col,
    Form,
    Image,
    Button
} from "react-bootstrap";
import { FaHeart, FaRegCaretSquareLeft } from 'react-icons/fa'
import * as ApiManager from "../services/ApiManager.js";

class SingleComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posterUsername: "",
            posterUserId:"",
            posterDpPath: "",
        };
      }

      componentDidMount = () => {
        this.fetchComment();
    
      };



    fetchComment = () => {
        ApiManager.fetchComment(this.props.comment.commentId).
        then(result => this.prepareComment(result));
      };

      prepareComment = (result) => {
        if (result.status === 200) {
          console.log(result);
          this.setState({
            posterUsername: result.data.poster.username,
            posterUserId: result.data.poster.userId,
            posterDpPath: result.data.poster.dpPath,
          }, () => {
              console.log("in SingleComment" + result.data)
            });
        }
      };

    render() {
        return (
            <Grid fluid={true}>
                <Row className="single-comment-wrapper">
                    <Row className="single-comment-header">
                        <Col lg={1} sm={1} xs={2}>
                        <Image className="user-picture" src={ "http://localhost:8080/Moodui/Profile_Pictures/" + this.state.posterDpPath } circle />
                            {/* <Image className="user-picture" src="images/Chrome-logo.jpg" circle /> */}
                        </Col>
                        <Col lg={11} sm={11} xs={10}className="user-and-details">
                            <Row>
                                <a className="user-username" href="#">@{this.state.posterUsername}</a>
                            </Row>
                            <Row >
                                <p className="comment-timestamp">{this.props.comment.timePosted} </p>
                            </Row>
                        </Col>

                    </Row>
                    <Row className="single-comment-body">
                        <Row>
                            <p className="comment-content">{this.props.comment.text}</p>
                        </Row>
                        <Row className="comment-actions">
                            <Col className="comment-likes">
                            <a href="#" className="like-button" type="submit"><FaHeart/></a>
                            </Col>
                        </Row>
                    </Row>
                </Row>

            </Grid>
        )
    }
}
export default SingleComment;