import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';

import {FormSelector} from '../../generals/helpers/Components';


function TopicsPrioritySelector(props) {
	var options = props.data.map((elem) => {
		return (<option key={elem.id} value={elem.value} >{elem.value}</option>);
	});
	return (<select>
				{options}
			</select>);
}


export default class TopicUploadModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedMainTopic: '',
			selectedMainTopicID: 0,
			priorities: [],

			selectNew: false,
			selectExisted: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.mainTopics.length > 0){
			this.setState({selectedMainTopicID: nextProps.mainTopics[0].id});
		}
	}


	onUploadClick = (e) => {
		var fileInLength = 0;
		if (this.fileInput.files.length === fileInLength || 
			!(this.state.selectedMainTopic || this.state.selectedMainTopicID > 0) || 
			!this.priorityInput.value){
					alert("შეავსეთ ყველა ველი");
					e.preventDefault();
		}
		if (!(this.state.selectedNew || this.state.selectedExisted)){
			alert("მონიშნეთ \"ახალი\" და \"არსებული\" ველებიდან ერთ-ერთი.");
			e.preventDefault();
		}
	}

	onSelectedNew = (name) => {
		this.setState({ selectedMainTopic: name });
	}
	selectNew = () => {
		this.setState({selectNew: true});
		alert("selectNew: " + this.state.selectNew);
	}

	onSelectedExisted = (id) => {
		this.setState({ selectedMainTopicID: id });
		this.fetchPrioritiesFor(id);
	}
	selectExisted = () => {
		this.setState({selectExisted: true});
		alert("selectExisted: " + this.state.selectExisted);
	}


	fetchPrioritiesFor = (mainTopicID) => {
        $.ajax({
            // url: '/files_data/api/priorities',
            url: '/priorities',
            type: 'GET',
            data: {
                main_topic: mainTopicID,
            },
            success: (data) => {
                        var prioritiesData = data.map((elem) => {
                                                var value = elem.descrip + " " + elem.priority;
                                                return {'id': elem.id, 'value': value};
                                            });
                        this.setState({ priorities: prioritiesData });
                    },
            dataType: 'json',
            cache: false
        });
    }

	render (){
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="/uploadTopic" method="post" encType="multipart/form-data" acceptCharset="UTF-8">
				        თემა: <input style={{display: 'inline'}} type="file" name="file" ref={input => this.fileInput = input} /> <br /><br />
					   	<FormSelector options={this.props.mainTopics} onSelectedNew={this.onSelectedNew} onSelectedExisted={this.onSelectedExisted} 
					   					selectNewHandler={this.selectNew} selectExistedHandler={this.selectExisted} /><br />
					   	<input type="number" name="priority" placeholder="პრიორიტეტი" ref={input => this.priorityInput = input} />
					   	<TopicsPrioritySelector data={this.state.priorities} /><br /><br />
					   	<input type="submit" value="ატვირთვა" onClick={this.onUploadClick} />
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}

// action="/files_data/api/uploadTopic"
