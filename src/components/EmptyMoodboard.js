import React, { Component } from "react";
import "./styles/StichedBox.css";
import { DropTarget } from "react-dnd";

const emptyMoodboardSource = {
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

class EmptyMoodboard extends Component {
    render() {
        const { connectDropTarget, hovered, moodboard } = this.props
        return connectDropTarget(
            <div  style={{ 'text-align': "center" }}>
                <div className="stiched-box">
                    Drop Your Screenshots Here
                </div>
                <p>{moodboard.name}</p>
            </div>
        )
    }
}

export default DropTarget('image', emptyMoodboardSource, collect)(EmptyMoodboard);
