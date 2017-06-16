import React, {Component} from 'react';
import {FieldGroup, Selector} from '../../generals/helpers/Components';
import {Modal, Button} from 'react-bootstrap';
import jQuery from 'jquery';


const languages = [
	"ყველა",
	"Java",
	"c++",
	"Python",
	"Pascal"
];

const topics = [
	"გრაფი",
	"ალგებრა",
	"გეომეტრია",
	"N*Log(N)"
];

const levels = [
	"მარტივი",
	"საშუალო",
	"რთული"
];


export default class TaskUploadModal extends Component {

	onUploadClick = () => {
		alert("Upload");

		var data = new FormData();
		for (var i = 0; i < 3; i++){
			jQuery.each(jQuery(':file')[i].files, function(i, file) {
				alert("aq ??" + file.name);
			    data.append('file-'+i, file);
			});
		}
	}


	render(){
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSumbit={this.onUploadClick} >
						<FieldGroup id="conditionFormGr" label="აირჩიეთ ამოცანის ფაილი" type="file" />
						<FieldGroup id="testFormGr" label="აირჩიეთ ტესტების ფაილის არქივი" type="file" />
						<FieldGroup id="hinterFormGr" label="აირჩიეთ მითითებების ფაილი" type="file" />
						<Selector title="შეიძლება დაიწეროს:" selectorData={languages} isMultiple={true} searchable={true} 
									controlId="task-upload-supported-languages" />
						<Selector title="თემა" selectorData={topics} isMultiple={true} searchable={true} 
									controlId="task-upload-associated-topic" />
						<Selector title="დონე" selectorData={levels} isMultiple={false} searchable={false} 
									controlId="task-upload-level" />
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

