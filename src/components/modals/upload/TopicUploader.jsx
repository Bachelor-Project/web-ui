import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

import {FieldGroup, Selector} from '../../generals/helpers/Components';


export default class TopicUploadModal extends Component {

	render (){
		// const types = this.props.types.map((type) => {
		// 	return (<option value={type.name} key={type.id} >{type.name}</option>);
		// });

		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title >{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="/bp_apigatway/api/upload" method="post" encType="multipart/form-data">
				        თემა: <input type="file" name="file" /> <br />
					   	<input type="text" placeholder="ახალი მთავარი თემა" /><br />
					   	მთავარი თემა: <select name="mainTopic" >{this.props.mainTopics}</select><br />
					   	<input type="number" name="priority" placeholder="პრიორიტეტი" /><br />
					   	<input type="submit" value="Upload It" />
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}


// <form>
// 				//<FieldGroup id="name" type="text" placeholder="თემის დასახელება" />
// 				<FieldGroup id="file" label="აირჩიეთ თემის ფაილი" type="file" />
// 				<Selector title="მთავარი თემა" selectorData={topics} isMultiple={false} searchable={true} />
// 				<FieldGroup id="type" type="text" placeholder="ტიპი" />
// 				<FieldGroup id="priority" type="number" placeholder="პრიორიტეტი" />
// 			</form>
