import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import $ from 'jquery';

export default class TaskRemover extends Component {

	constructor(props) {
		super(props);

		this.state = {
			task: '',
		}
	}

	selectorChange = (e) => {
		this.setState({task: e.target.value});
	}

	onDeleteClick = () => {
		const taskName = this.state.task;
		$.ajax({
            // url: '/files_data/api/delete_task/' + taskName,
            url: '/delete_task/' + taskName,
            type: 'DELETE',
            dataType: 'text',
            cache: false,
            success: (data) => {
            			this.resetState();
    				}
        });
	}

	resetState = () => {
		this.setState({ task: '' });
		this.props.onHide();
	}

	render() {
		var tasks = [];
		tasks.push(<option key={0} value="" ></option>);
		if (this.props.tasks !== undefined ){
			this.props.tasks.forEach((elem) => {
				tasks.push(<option key={elem.id} value={elem.name} >{elem.name}</option>);
			});
		}


		return (
			<Modal show={this.props.show} onHide={this.resetState}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				   	არსებული "ამოცანები": <select name="tasks" onChange={this.selectorChange} >{tasks}</select><br /><br />
				   	
				   	{this.state.task && <Button bsStyle="danger" onClick={this.onDeleteClick} >წაშლა</Button>}
				</Modal.Body>
			</Modal>
		);
	}
}