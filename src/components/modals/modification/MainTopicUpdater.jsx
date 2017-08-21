import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

export default class MainTopicUpdater extends Component {

	constructor(props) {
		super(props);

		this.state = {
			main_topic_name: ''
		}
	}

	newNameFieldChange = (e) => {
		this.setState({main_topic_name: e.target.value});
	}

	resetState = () => {
		this.setState({ main_topic_name: '' });
		this.props.onHide();
	}

	render() {
		const mainTopics = this.props.mainTopics.map((elem) => {
			return (<option key={elem.id} value={elem.id} >{elem.descrip}</option>);
		});

		return (
			<Modal show={this.props.show} onHide={this.resetState}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="/update_main_topic" method="post" encType="multipart/form-data">
					   	არსებული "მთავარი თემები": <select name="main_topic_id">{mainTopics}</select><br /><br />
					   	<input type="text" name="main_topic_new_name" placeholder="ახალი დასახელება" onChange={this.newNameFieldChange} /><br /><br />
					   	
					   	{this.state.main_topic_name && <input type="submit" value="ცვლილება" /> }
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}