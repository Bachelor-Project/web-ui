import React, {Component} from 'react';
import {FieldGroup, Selector} from '../../generals/helpers/Components';


const topics = [
	"გრაფი",
	"ალგებრა",
	"გეომეტრია",
	"N*Log(N)"
];


export default class TopicUploadModal extends Component {

	render (){
		return (
			<form>
				<FieldGroup id="name" type="text" placeholder="თემის დასახელება" />
				<FieldGroup id="file" label="აირჩიეთ თემის ფაილი" type="file" />
				<Selector title="მთავარი თემა" selectorData={topics} isMultiple={false} searchable={true} />
				<FieldGroup id="type" type="text" placeholder="ტიპი" />
				<FieldGroup id="priority" type="number" placeholder="პრიორიტეტი" />
			</form>
		);
	}
}


