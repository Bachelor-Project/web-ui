import React, {Component} from 'react';
import GeneralTable from '../generals/table/GeneralTable';

const headers = ['N', 'ამოცანის თემა', 'აღწერა', 'რაოდენობა'];

const tasks = [
	{
		id: 1,
		name: 'გრაფი',
		descrip: 'აქ თქვენ ნახავთ ამოცანებს გრფზე',
		number: '10'
	},
	{
		id: 2,
		name: 'გეომეტრია',
		descrip: 'აქ თქვენ ნახავთ ამოცანებს გეომეტრიაზე',
		number: '15'
	},
	{
		id: 3,
		name: 'ალგებრა',
		descrip: 'აქ თქვენ ნახავთ ამოცანებს ალგებრაზე',
		number: '9'
	}
];

class Tasks extends Component {

	render (){
		return (
			<GeneralTable headData={headers} bodyData={tasks} />
		);
	}
}

export default Tasks;