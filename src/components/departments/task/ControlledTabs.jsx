import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';


class ControlledTabs extends Component {

	constructor(props) {
		super(props);

		this.state = {
			key: 1
		}
	}

	onTabSelect = (key) => {
		this.setState({key});
	}

	render() {
		const childrenTabs = this.props.tabs.map((tab) => {
			return (<Tab eventKey={tab.id} key={tab.id} title={tab.title} >{tab.content}</Tab>);
		});

		return (
			<Tabs activeKey={this.state.key} onSelect={this.onTabSelect} id={this.props.id} >
				{childrenTabs}
			</Tabs>
		);
	}
}

export default ControlledTabs;