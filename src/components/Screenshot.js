import React, { Component } from "react";
import "./styles/AlbumCards.css";
import { Image } from "react-bootstrap";
import { DragSource } from 'react-dnd';


const screenshotSource = {
    beginDrag(props) {
        console.log(props);
        return props.screenshot;
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
        const mId = monitor.getDropResult().moodboardId;
        const sId = props.screenshot.screenshotId;
        return props.handleDrop(mId, sId);
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }

}
class Screenshot extends Component {

    render() {
        const { isDragging, connectDragSource, appName, screenshot } = this.props;
        return connectDragSource(
            <div style={{"display": "inline"}}>
                <Image className="imageSize" src={"http://localhost:8080/Moodui/" + appName + "/" + screenshot.photo} rounded />
            </div>
        );
    }
}
export default DragSource('image', screenshotSource, collect)(Screenshot);