import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

import {FormSelector} from '../../generals/helpers/Components';


export default class TaskUploadModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedMainTopic: '',
			timeLimit: '',
			memLimit: ''
		}
	}


	onUploadClick = (e) => {
		var fileInLength = 0;
		if (this.fileInput.files.length === fileInLength){
				alert("ფაილი არ არის არჩეული");
				e.preventDefault();
		}
	}

	selectorChange = (e) => {
		this.setState({ selectedMainTopic: e.target.value });
	}

	timeLimitChange = (e) => {
		this.setState({ timeLimit: e.target.value });
	}

	memoryLimitChange = (e) => {
		this.setState({ memLimit: e.target.value });
	}

	resetState = () => {
    	this.setState({selectedMainTopic: '', timeLimit: '', memLimit: ''});
    	this.props.onHide();
    }

	render(){
		var mainTopics = [];
		mainTopics.push(<option key={0} value="" ></option>);
		if (this.props.mainTopics !== undefined ){
			this.props.mainTopics.forEach((elem) => {
				mainTopics.push(<option key={elem.id} value={elem.descrip} >{elem.descrip}</option>);
			});
		}

		const levels = this.props.levels.map((level) => {
			return (<option key={level.id} value={level.descrip} >{level.descrip}</option>);
		});

		const uploadShow = this.state.selectedMainTopic && this.state.timeLimit && this.state.memLimit;

		return (
			<Modal show={this.props.show} onHide={this.resetState}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="/uploadTask" method="post" encType="multipart/form-data">
				        ამოცანის მონაცემების არქივი: <input style={{display: 'inline'}} type="file" name="file" ref={input => this.fileInput = input } /> <br /><br />
					   	<input type="number" name="time_lm" placeholder="დროის ლიმიტი (წმ.)" onChange={this.timeLimitChange} />
					   	<input type="number" name="memory_lm" placeholder="მეხსიერების ლიმიტი (მბ.)" onChange={this.memoryLimitChange} /><br/><br/>
					   	არსებული "მთავარი თემები": <select name="mainTopic" onChange={this.selectorChange} >{mainTopics}</select><br /><br />
					   	დონე: <select name="level">{levels}</select><br /><br />
					   	
					   	{uploadShow && <input type="submit" value="ატვირთვა" onClick={this.onUploadClick}/>}
					</form>
				</Modal.Body>
			</Modal>
			
		);
	}
}
