import React, { Component } from 'react';

class FileUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            selectedFileURI: null

        }
    }   

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            selectedFileURI: URL.createObjectURL(event.target.files[0])
        })
        console.log(this.state.selectedFileURI);

    }

    fileUploadHandler = () => {
        let reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile);
        reader.onload = () => {
            console.log(reader.result);
        };
        reader.onerror = (error) => {
            console.log(error);
        }

    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler}>Upload</button>
                <img src={this.state.selectedFileURI}></img>
            </div>
        )
    }
}

export default FileUpload;