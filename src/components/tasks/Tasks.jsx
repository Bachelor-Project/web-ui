import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import GeneralTable from '../generals/table/GeneralTable';
import TaskDep from '../departments/task/TaskDep';


const headers = ['N', 'ამოცანის თემა', 'აღწერა', 'რაოდენობა'];

const tasks = [
	{
		id: 1,
		name: 'გრაფი',
		descrip: 'აქ თქვენ ნახავთ ამოცანებს გრაფზე',
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
		const taskPath = this.props.path;

		return (
			<Switch>
				<Route exact path={taskPath} render={() => (<GeneralTable path={taskPath} headData={headers} bodyData={tasks} />)} />
				<Route path={taskPath + '/:taskId'} component={TaskDep} />
			</Switch>
		);
	}
}

export default Tasks;