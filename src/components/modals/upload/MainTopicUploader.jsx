import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

export default class MainTopicUploader extends Component {

	constructor(props) {
		super(props);

		this.state = {
			main_topic_name: ''
		}
	}

	nameFieldChange = (e) => {
		this.setState({main_topic_name: e.target.value});
	}

	resetState = () => {
		this.setState({ main_topic_name: '' });
		this.props.onHide();
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.resetState}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="/upload_main_topic" method="post" encType="multipart/form-data">
					   	<input type="text" name="main_topic_name" placeholder="დასახელება" onChange={this.nameFieldChange} /><br /><br />
					   	
					   	{this.state.main_topic_name && <input type="submit" value="ატვირთვა" /> }
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}