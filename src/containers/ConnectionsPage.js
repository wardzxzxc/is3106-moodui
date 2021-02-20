import React, { Component } from 'react';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, 
        FormControl, Checkbox, Button} from 'react-bootstrap';
import ProfileMenu from '../components/ProfileMenu';
import MoodBoard from '../components/MoodBoard';
import ConnectionsAlbum from '../components/ConnectionsAlbum';
import SearchByUserHeader from '../components/SearchByUserHeader';
import  './styles/ConnectionsPage.css';


class ConnectionsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ProfileMenu/>

                <SearchByUserHeader />
                <ConnectionsAlbum/>

                <MoodBoard/>
            </div>
        )
    }
}

export default ConnectionsPage;
