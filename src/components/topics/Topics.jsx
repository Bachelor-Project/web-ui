import React,{Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import GeneralTable from '../generals/table/GeneralTable';
import TopicDep from '../departments/topic/TopicDep';
import $ from 'jquery';



const headers = ['N', 'თემის დასახელება', 'რაოდენობა'];


class Topics extends Component {

	constructor(props){
		super(props);

		this.state = {
			topics: []
		}
	}

	componentDidMount() {
		this.fetchMainTopicsWithCount();
	}

	fetchMainTopicsWithCount = () => {
		$.ajax({
            url: '/files_data/api/counting_main_topics',
            type: 'GET',
            success: (data) => {
            			var mainTopicsData = data.map((elem) => {
            				return {id: elem.mainTopic.id, name: elem.mainTopic.descrip, number: elem.count};
            			});
                        this.setState({ topics: mainTopicsData });
                    },
            dataType: 'json',
            cache: false
        });
	}

	getTopicName(id) {
		return this.state.topics.find(elem => elem.id === id);
	}

	render (){
		const topicsPath = this.props.path;
		return (
			<Switch>
				<Route exact path={topicsPath} render={() => (<GeneralTable path={topicsPath} pageTitle="თეორია" headData={headers} 
																			bodyData={this.state.topics} />)} />
				<Route path={topicsPath + '/:mainTopicId'} component={TopicDep} />
			</Switch>
			
		);
	}
}

export default Topics;