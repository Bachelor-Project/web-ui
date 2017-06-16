import React, {Component} from 'react';
import {FieldGroup, Selector} from '../../generals/helpers/Components';


export default class TaskUploadModal extends Component {

	constructor(props) {
		super(props);

		
	}

	onUploadClick = () => {
		alert("Upload");
	}


	render(){
		return (
			<form>
				<FieldGroup id="conditionFormGr" label="აირჩიეთ ამოცანის ფაილი" type="file" />
				<FieldGroup id="testFormGr" label="აირჩიეთ ტესტების ფაილის არქივი" type="file" />
				<FieldGroup id="hinterFormGr" label="აირჩიეთ მითითებების ფაილი" type="file" />
				<Selector title="შეიძლება დაიწეროს:" selectorData={languages} isMultiple={true} searchable={true} />
				<Selector title="თემა" selectorData={topics} isMultiple={true} searchable={true} />
				<Selector title="დონე" selectorData={levels} isMultiple={false} searchable={false} />
			</form>
		);
	}
}


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