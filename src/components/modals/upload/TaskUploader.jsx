import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

import {FormSelector} from '../../generals/helpers/Components';


export default class TaskUploadModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedMainTopic: '',
			selectedMainTopicID: 0
		}
	}


	onUploadClick = (e) => {
		// var fileInLength = 0;
		// if (this.fileInput.files.length === fileInLength || 
		// 	!this.timeInput.value || !this.memoryInput.value || 
		// 	!(this.state.mainTopicSelected && this.state.selectedMainTopicID > 0)){
		// 		alert("შეავსეთ ყველა ველი");
		// 		e.preventDefault();
		// }
	}

	onSelectedNew = (name) => {
		this.setState({ selectedMainTopic: name });
	}

	onSelectedExisted = (id) => {
		this.setState({ selectedMainTopicID: id });
	}


	render(){
		const levels = this.props.levels.map((level) => {
			return (<option key={level.id} value={level.descrip} >{level.descrip}</option>);
		});

		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="/files_data/api/uploadTask" method="post" encType="multipart/form-data">
				        ამოცანის მონაცემების არქივი: <input style={{display: 'inline'}} type="file" name="file" ref={input => this.fileInput = input } /> <br /><br />
					   	<input type="number" name="time_lm" placeholder="დროის ლიმიტი (წმ.)" ref={input => this.timeInput = input} />
					   	<input type="number" name="memory_lm" placeholder="მეხსიერების ლიმიტი (მბ.)" ref={input => this.memoryInput = input} /><br/><br/>
					   	<FormSelector options={this.props.mainTopics} onSelectedNew={this.onSelectedNew} onSelectedExisted={this.onSelectedExisted}/><br />
					   	დონე: <select name="level">{levels}</select><br /><br />
					   	
					   	<input type="submit" value="ატვირთვა" onClick={this.onUploadClick}/>
					</form>
				</Modal.Body>
			</Modal>
			
		);
	}
}


// <FieldGroup id="tests-file" label="აირჩიეთ ტესტების ფაილის არქივი" type="file" />
// <FieldGroup id="hinter-file" label="აირჩიეთ მითითებების ფაილი" type="file" />


// <form >
// 	<FieldGroup id="task-file" label="აირჩიეთ ამოცანის მონაცემების არქივი" type="file" />
// 	<FieldGroup id="time-limit" label="დროის ლიმიტი (წმ)" type="number" />
// 	<FieldGroup id="time-limit" label="მეხსიერების ლიმიტი (მგ)" type="number" />
// 	<Selector title="შეიძლება დაიწეროს:" selectorData={languages} isMultiple={true} searchable={true} 
// 				controlId="task-upload-supported-languages" />
// 	<Selector title="თემა" selectorData={this.props.mainTopics} isMultiple={true} searchable={true} 
// 				controlId="task-upload-associated-topic" />
// 	<Selector title="დონე" selectorData={this.props.levels} isMultiple={false} searchable={false} 
// 				controlId="task-upload-levels" />
// </form>
