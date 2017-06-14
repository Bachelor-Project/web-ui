import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Topics from '../topics/Topics';
import Tasks from '../tasks/Tasks';


class RouterMain extends Component {

	render (){
		return (
			<main>
				<Switch >
					<RouteComponent exact path={this.props.topicsPath} component={Topics} />
					<RouteComponent path={this.props.tasksPath} component={Tasks} />
				</Switch>
			</main>
		);
	}
}

export default RouterMain;


function RouteComponent({...properties}) {
	return (<Route {...properties} />);
}