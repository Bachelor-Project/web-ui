import React, {Component} from 'react';
import {FieldGroup, Selector} from '../../generals/helpers/Components';
import {Modal, Button} from 'react-bootstrap';
import $ from 'jquery';


const languages = [
	{
		id: 0,
		descrip: 'ყველა'
	},
	{
		id: 1,
		descrip: 'Java 1.8'
	},
	{
		id: 2,
		descrip: 'GNU c++'
	},
	{
		id: 3,
		descrip: 'Python 2.7' 
	},
];



export default class TaskUploadModal extends Component {


	onUploadClick = () => {
		alert("Upload");

		var data = new FormData();

		data.append('file', $(':file')[0].files[0]);

		$.ajax({
	        url: '/task/api/upload',
	        type: 'POST',
	        data: data,
	        processData: false,
	        // contentType: false,
	        dataType: 'text/plain',
	        success: function (data, textStatus, xhr) {
			            alert(data);
			        }
		});

		// $("#task-file").fileUpload({
		// 	url: '/task/api/upload',
		// 	type: 'post', // unda ?
		// 	dataType: 'text',
		// 	done: (e, data) => {
		// 			alert(data);
		// 		}
		// });
	}




	render(){
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form >
						<FieldGroup id="task-file" label="აირჩიეთ ამოცანის მონაცემების არქივი" type="file" />
						<Selector title="შეიძლება დაიწეროს:" selectorData={languages} isMultiple={true} searchable={true} 
									controlId="task-upload-supported-languages" />
						<Selector title="თემა" selectorData={this.props.mainTopics} isMultiple={true} searchable={true} 
									controlId="task-upload-associated-topic" />
						<Selector title="დონე" selectorData={this.props.levels} isMultiple={false} searchable={false} 
									controlId="task-upload-levels" />
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
					<Button onClick={this.onUploadClick} type="submit">Upload</Button>
				</Modal.Footer>
			</Modal>
			
		);
	}
}


// <FieldGroup id="tests-file" label="აირჩიეთ ტესტების ფაილის არქივი" type="file" />
// <FieldGroup id="hinter-file" label="აირჩიეთ მითითებების ფაილი" type="file" />

