import React, { Component } from 'react';
import {
    Image
} from 'react-bootstrap';
import './styles/MoodBoard.css';
import { DropTarget } from "react-dnd";

const moodboardSource = {
    drop(props, monitor, component) {
        return props.moodboard
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem(),
    }
}

class MoodBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { connectDropTarget, hovered, moodboard, screenshot, appName } = this.props 
        return connectDropTarget(
            <div  style={{ 'text-align': "center" }}>
                <Image style={{ width: "90%", height: "100%" }} src={"http://localhost:8080/Moodui/" + appName + "/" + screenshot} rounded />
                <p>{moodboard.name}</p>
            </div>
        )
    }
}

export default DropTarget('image', moodboardSource, collect)(MoodBoard);