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
	{
		id: 4,
		descrip: 'Pascal'
	}
];


const topics = [
	"გრაფი",
	"ალგებრა",
	"გეომეტრია",
	"N*Log(N)"
];


export default class TaskUploadModal extends Component {

	constructor(props) {
		super(props);

	}

	onUploadClick = () => {
		alert("Upload");

		var data = new FormData();
		// for (var i = 0; i < 3; i++){
		// 	$.each($(':file')[i].files, function(i, file) {
		// 		alert("aq ??" + file.name);
		// 	    data.append('file-'+i, file);
		// 	});
		// }

		data.append('file', $(':file')[0].files[0]);

		// $.post('/task/api/upload', data, (response) => {
		// 	alert(response);
		// }, 'text');

		$.ajax({
	        url: '/task/api/upload',
	        method: 'post',
	        data: data,
	        processData: false,
	        contentType: 'multipart/form-data',
	        dataType: 'text',
	        success: function (data, textStatus, xhr) {
	            alert(data);
	        }
    	});
	}




	render(){
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form >
						<FieldGroup id="conditionFormGr" label="აირჩიეთ ამოცანის ფაილი" type="file" />
						<FieldGroup id="testFormGr" label="აირჩიეთ ტესტების ფაილის არქივი" type="file" />
						<FieldGroup id="hinterFormGr" label="აირჩიეთ მითითებების ფაილი" type="file" />
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

