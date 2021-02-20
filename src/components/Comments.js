import React, { Component } from 'react';
import Styles from './styles/Comments.css';
import {
    Grid,
    Row,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Image,
    Button
} from "react-bootstrap";
import SingleComment from './SingleComment';
import renderIf from "../lib/renderIf";
import FormValidator from "../FormValidator";

class Comments extends Component {
    constructor(props) {
        super(props);

        this.validator = new FormValidator([
            {
              field: "newComment",
              method: 'isEmpty',
              validWhen: false,
              message: 'PLease enter a comment.'
            }
        ])
        this.state = {
            shown: true,
            newComment: "",
            appId: this.props.appId,
            commentType: this.props.commentType,

            validation: this.validator.valid(),
        };
    }

    initialComments = () => {
        let comments = []
        console.log(this.state.comments);
        if (this.props.comments.length !== 0) {
            for (let i = 0; i < 1; i++) {
                comments.push(<SingleComment comment={this.props.comments[i]} />) 
            }
        } else {
            return
        }
        return comments

    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
    
        if (validation.isValid) {

          const createCommentForm = {          
            text: this.state.newComment
          };
          this.props.createComment(createCommentForm, this.state.appId, this.state.commentType)
        }
      };

      handleUpdateResult = (result) => {
        if (result.status === 204 || result.status === 200) {
          Notification.notifySuccess("Comments submitted successfully!");
        } else {
          // Notification.notifyError(result.response.data.error);
          Notification.notifyError(result.response.data.error);
        }
      };

    toggle() {
        this.setState({
            shown: !this.state.shown
        });
    }

    render() {
        let validation = this.state.validation;
        var shown = {
            display: this.state.shown ? "block" : "none"
        };

        var hidden = {
            display: this.state.shown ? "none" : "block"
        }
        return (


            <div className="comments-content-wrapper">
                <Row className="comment-input">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup className="comment-text-area" controlId="newComment" onChange={this.handleChange}>
                            <ControlLabel>Comments</ControlLabel>
                            <FormControl type="newComment" componentClass="textarea" placeholder="Type your comment here" />
                            
                            <Button type="submit" bsClass="comment-button">Submit comment</Button>
                            <span className="help-block">{validation.newComment.message}</span>
                        </FormGroup>
                    </Form>
                </Row>


                {renderIf(
                    this.state.shown === false
                )(
                    <div>
                    
                        <button className="show-hide-button" onClick={this.toggle.bind(this)}>Show More Comments</button>
                    </div>



                )}

                {renderIf(
                    this.state.shown === true
                )(
                    <div>
                        {this.props.comments.reverse().map(comment => (
                            <SingleComment comment={comment} />
                        ))}
                        <button className="show-hide-button" onClick={this.toggle.bind(this)}>Hide Comments</button>
                    </div>

                )

                }

            </div>
        )
    }
}

export default Comments;