import {
    Button,
    Modal,
    Form,
    FormGroup,
    FormControl,
    Col
} from "react-bootstrap";
import React, { Component } from "react";
import * as ApiManager from "../services/ApiManager.js";

class MoodBoardCreateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moodboardname: "",
            description: "",
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        }, () => console.log(this.state))
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const mbForm = {
            "name": this.state.moodboardname,
            "description": this.state.description,
        }

        ApiManager.createMoodboard(mbForm)
        .then(result => {
            this.props.onHide();
            this.props.refresh();
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Create New Moodboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal onSubmit={this.handleSubmit} className="signup-form-wrapper">
                        <FormGroup controlId="moodboardname" onChange={this.handleChange}>
                            <Col sm={10}>
                                <FormControl type="moodboardname" placeholder="MoodBoard Name" bsClass="signup-input" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="description" onChange={this.handleChange}>
                            <Col sm={10}>
                                <FormControl type="description" placeholder="Description" bsClass="signup-input" />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={0} sm={10} lg={10}>
                                <Button bsClass="signup-custom-btn" type="submit">CREATE</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default MoodBoardCreateForm;