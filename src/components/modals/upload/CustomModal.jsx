import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class CustomUploadModal extends Component {

	constructor(props) {
		super(props);
	}

	onUploadClick = () => {
		alert("Upload");
	}

	render() {
		return(
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.props.body}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
					<Button onClick={this.onUploadClick} type="submit">Upload</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default CustomUploadModal;