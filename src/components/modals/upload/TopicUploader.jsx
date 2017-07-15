import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

import {FormSelector} from '../../generals/helpers/Components';


export default class TopicUploadModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			mainTopicSelected: false,
		}
	}

	onMainTopicSelected = (value) => {
		this.setState({ mainTopicSelected: value.length !== 0 });
	}

	onUploadClick = (e) => {
		if (this.fileInput.files.length == 0 || !this.state.mainTopicSelected || !this.priorityInput.value){
			alert("შეავსეთ ყველა ველი");
			e.preventDefault();
		}
	}

	render (){
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="/bp_apigatway/api/uploadTopic" method="post" encType="multipart/form-data">
				        თემა: <input style={{display: 'inline'}} type="file" name="file" ref={input => this.fileInput = input} /> <br /><br />
					   	<FormSelector options={this.props.mainTopics} onSelected={this.onMainTopicSelected} /><br />
					   	<input type="number" name="priority" placeholder="პრიორიტეტი" ref={input => this.priorityInput = input} /><br /><br />
					   	<input type="submit" value="ატვირთვა" onClick={this.onUploadClick} />
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}