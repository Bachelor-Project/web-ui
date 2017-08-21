import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import $ from 'jquery';

export default class MainTopicRemover extends Component {

	constructor(props) {
		super(props);

		this.state = {
			main_topic_id: 0,
		}
	}

	selectorChange = (e) => {
		this.setState({main_topic_id: e.target.value});
	}

	onDeleteClick = () => {
		const mt_ID = this.state.main_topic_id;
		$.ajax({
            // url: '/files_data/api/delete_main_topic/' + mt_ID,
            url: '/delete_main_topic/' + mt_ID,
            type: 'DELETE',
            dataType: 'text',
            cache: false,
            success: (data) => {
            			this.resetState();
    				}
        });
	}

	resetState = () => {
		this.setState({ main_topic_id: 0 });
		this.props.onHide();
	}

	render() {
		var mainTopics = [];
		mainTopics.push(<option key={0} value={0} ></option>);
		if (this.props.mainTopics !== undefined ){
			this.props.mainTopics.forEach((elem) => {
				mainTopics.push(<option key={elem.id} value={elem.id} >{elem.descrip}</option>);
			});
		}


		return (
			<Modal show={this.props.show} onHide={this.resetState}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				   	არსებული "მთავარი თემები": <select name="main_topic_id" onChange={this.selectorChange} >{mainTopics}</select><br /><br />
				   	
				   	{this.state.main_topic_id > 0 && <Button bsStyle="danger" onClick={this.onDeleteClick} >წაშლა</Button>}
				</Modal.Body>
			</Modal>
		);
	}
}