import React,{Component} from 'react';
import GeneralTable from '../generals/table/GeneralTable';


const headers = ['N', 'თემის დასახელება', 'აღწერა', 'რაოდენობა'];

const topics = [
	{
		id: 1,
		name: 'გრაფი',
		descrip: 'bla bla',
		number: '30'
	},
	{
		id: 2,
		name: 'გეომეტრია',
		descrip: 'blu blu',
		number: '35'
	},
	{
		id: 3,
		name: 'ალგებრა',
		descrip: 'ble ble',
		number: '50'
	}
];

class Topics extends Component {
	render (){
		return (
			<GeneralTable headData={headers} bodyData={topics} />
		);
	}
}

export default Topics;