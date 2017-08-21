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
			priorities: [],
			mainTopics: [],
			topicPriority: ''

			// selectedMainTopicID: 0,

			// selectNew: false,
			// selectExisted: false,

		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.mainTopics.length > 0){
			this.setState({mainTopics: nextProps.mainTopics});
		}
	}


	onUploadClick = (e) => {
		var fileInLength = 0;
		if (this.fileInput.files.length === fileInLength){
					alert("აირჩიეთ ფაილი");
					e.preventDefault();
		}
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

    selectorChange = (e) => {
    	this.setState({ selectedMainTopic: e.target.value });
    	const appropMainTopic = this.state.mainTopics.find((elem) => {
    		return elem.descrip === e.target.value;
    	});
    	if (appropMainTopic !== undefined){
	    	this.fetchPrioritiesFor(appropMainTopic.id);
    	}
    }

    priorityValueChange = (e) => {
    	this.setState({ topicPriority: e.target.value });
    }

    resetState = () => {
    	this.setState({selectedMainTopic: '', topicPriority: '', priorities: []});
    	this.props.onHide();
    }

	render (){
		var mainTopics = [];
		mainTopics.push(<option key={0} value={0} ></option>);
		if (this.props.mainTopics !== undefined ){
			this.props.mainTopics.forEach((elem) => {
				mainTopics.push(<option key={elem.id} value={elem.descrip} >{elem.descrip}</option>);
			});
		}

		const uploadShow = this.state.selectedMainTopic && this.state.topicPriority;

		return (
			<Modal show={this.props.show} onHide={this.resetState}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="/uploadTopic" method="post" encType="multipart/form-data" acceptCharset="UTF-8">
				        თემა: <input style={{display: 'inline'}} type="file" name="file" ref={input => this.fileInput = input} /> <br /><br />
					   	არსებული "მთავარი თემები": <select name="mainTopic" onChange={this.selectorChange} >{mainTopics}</select><br /><br />
					   	<input type="number" name="priority" placeholder="პრიორიტეტი" onChange={this.priorityValueChange} />
					   	<TopicsPrioritySelector data={this.state.priorities} /><br /><br />
					   	{uploadShow && <input type="submit" value="ატვირთვა" onClick={this.onUploadClick} />}
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}

// action="/files_data/api/uploadTopic"

// onClick={this.onUploadClick}

// <FormSelector options={this.props.mainTopics} onSelectedNew={this.onSelectedNew} onSelectedExisted={this.onSelectedExisted} 
					   					// selectNewHandler={this.selectNew} selectExistedHandler={this.selectExisted} /><br />
