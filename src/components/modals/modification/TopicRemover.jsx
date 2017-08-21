import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import $ from 'jquery';

export default class TopicRemover extends Component {

	constructor(props) {
		super(props);

		this.state = {
			topic: '',
		}
	}

	selectorChange = (e) => {
		this.setState({topic: e.target.value});
	}

	onDeleteClick = () => {
		const topicName = this.state.topic;
		$.ajax({
            // url: '/files_data/api/delete_topic/' + topicName,
            url: '/delete_topic/' + topicName,
            type: 'DELETE',
            dataType: 'text',
            cache: false,
            success: (data) => {
            			this.resetState();
    				}
        });
	}

	resetState = () => {
		this.setState({ topic: '' });
		this.props.onHide();
	}

	render() {
		var topics = [];
		topics.push(<option key={0} value="" ></option>);
		if (this.props.topics !== undefined ){
			this.props.topics.forEach((elem) => {
				topics.push(<option key={elem.id} value={elem.name} >{elem.name}</option>);
			});
		}


		return (
			<Modal show={this.props.show} onHide={this.resetState}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				   	არსებული "თეორიები": <select name="topics" onChange={this.selectorChange} >{topics}</select><br /><br />
				   	
				   	{this.state.topic && <Button bsStyle="danger" onClick={this.onDeleteClick} >წაშლა</Button>}
				</Modal.Body>
			</Modal>
		);
	}
}