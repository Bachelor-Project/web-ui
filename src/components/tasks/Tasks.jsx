import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import GeneralTable from '../generals/table/GeneralTable';
import TaskDep from '../departments/task/TaskDep';
import $ from 'jquery';


const headers = ['N', 'ამოცანის თემა', 'რაოდენობა'];

const tasks = [
	{
		id: 1,
		name: 'გრაფი',
		number: '10'
	},
	{
		id: 2,
		name: 'გეომეტრია',
		number: '15'
	},
	{
		id: 3,
		name: 'ალგებრა',
		number: '9'
	}
];

class Tasks extends Component {

	constructor(props){
		super(props);

		this.state = {
			mainTopics: []
		}
	}

	componentDidMount() {
		this.fetchMainTopicsWithCount();
	}

	fetchMainTopicsWithCount = () => {
		$.ajax({
            url: '/tasks_counting_main_topics',
            type: 'GET',
            success: (data) => {
            			var mainTopicsData = data.map((elem) => {
            				return {id: elem.mainTopic.id, name: elem.mainTopic.descrip, number: elem.count};
            			});
                        this.setState({ mainTopics: mainTopicsData });
                    },
            dataType: 'json',
            cache: false
        });
	}

	render (){
		const taskPath = this.props.path;

		return (
			<Switch>
				<Route exact path={taskPath} render={() => (<GeneralTable path={taskPath} pageTitle="ამოცანები" headData={headers} 
																			bodyData={this.state.mainTopics} />)} />
				<Route path={taskPath + '/:mainTopicId'} component={TaskDep} />
			</Switch>
		);
	}
}

export default Tasks;