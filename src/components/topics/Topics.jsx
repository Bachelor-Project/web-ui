import React,{Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import GeneralTable from '../generals/table/GeneralTable';
import TopicDep from '../departments/topic/TopicDep';



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
		const topicsPath = this.props.path;
		return (
			<Switch>
				<Route exact path={topicsPath} render={() => (<GeneralTable path={topicsPath} pageTitle="თეორია" headData={headers} 
																						bodyData={topics} />)} />
				<Route path={topicsPath + '/:topicId'} component={TopicDep} />
			</Switch>
			
		);
	}
}

export default Topics;