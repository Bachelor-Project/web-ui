import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

import {FieldGroup, Selector, FormSelector} from '../../generals/helpers/Components';
import $ from 'jquery';
import Multipart from 'multi-part';
import http from 'http';
import httpRequest from 'http_request';


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

		// var data = new Multipart();

		// data.append('file', $(':file')[0].files[0]);
		// alert($(':file')[0].files.length);
		// // data.append();
		// // url: '/file_upload/rest/files/upload',

		// httpRequest.request('http://localhost:8080/bp_apigatway/api/upload', {
		// 	method: 'POST',
		// 	body: data,
		// 	headers: data.getHeaders(),
		// 	dataType: 'text/plain'		
		// }).then(function(response) {
		// 	// get the response body
		// 	response.getBody();
			
		// 	// get the response headers
		// 	response.getHeaders();
			
		// 	// get specific response header
		// 	response.getHeader('Accept');
			
		// 	// get the code
		// 	response.getCode();

		// 	alert("rame");
		// });

		// data.stream().pipe(http.request({ headers: data.getHeaders(), hostname: '127.0.0.1', port: 3000, method: 'POST' }));

		// $.ajax({
	 //        url: '/bp_apigatway/api/upload',
	 //        type: 'POST',
	 //        data: data,
	 //        processData: false,
	 //        contentType: 'multipart/form-data',
	 //        dataType: 'text/plain',
	 //        success: function (data, textStatus, xhr) {
		// 	            alert(data);
		// 	        }
		// });


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
		const levels = this.props.levels.map((level, index) => {
			return (<option key={index} value={level} >{level}</option>);
		});

		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="/bp_apigatway/api/uploadTask" method="post" encType="multipart/form-data">
				        ამოცანის მონაცემების არქივი: <input style={{display: 'inline'}} type="file" name="file" ref={input => this.fileInput = input} /> <br /><br />
					   	<input type="number" placeholder="დროის ლიმიტი (წმ.)" />
					   	<input type="number" placeholder="მეხსიერების ლიმიტი (მბ.)" /><br/><br/>
					   	<FormSelector options={this.props.mainTopics} onSelected={this.onMainTopicSelected} /><br />
					   	დონე: <select>{levels}</select><br /><br />
					   	
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
