import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';


function AspectRatioDivs(props) {
	return (<div style={{position: 'relative', width: '100%', paddingTop: '30%'}} >
				<div style={{position: 'absolute', top: '0', right: '0', bottom: '0', left: '0', overflow: 'auto'}} >
					{props.content}
				</div>
			</div>);
}


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
		const hasAspectRatioHeight = this.props.hasAspectRatioHeight;
		const childrenTabs = this.props.tabs.map((tab) => {
			return (<Tab eventKey={tab.id} key={tab.id} title={tab.title} >
						{hasAspectRatioHeight 	? <AspectRatioDivs content={tab.content} />
												: tab.content
						}
					</Tab>);
		});

		return (
			<Tabs activeKey={this.state.key} onSelect={this.onTabSelect} id={this.props.id} >
				{childrenTabs}
			</Tabs>
		);
	}
}

export default ControlledTabs;


