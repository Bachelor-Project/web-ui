import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Topics from '../topics/Topics';
import Tasks from '../tasks/Tasks';


class RouterMain extends Component {

	render (){
		const topicsPath = this.props.topicsPath;
		const tasksPath = this.props.tasksPath;

		return (
			<main>
				<Switch >
					<RouteComponent exact path={this.props.homePath} component={Home} />
					<RouteComponent path={topicsPath} render={() => (<Topics path={topicsPath} />) } />
					<RouteComponent path={tasksPath} render={() => (<Tasks path={tasksPath} />)} />
				</Switch>
			</main>
		);
	}
}

export default RouterMain;


function RouteComponent({...properties}) {
	return (<Route {...properties} />);
}