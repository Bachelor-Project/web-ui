import React, {Component} from 'react';
import {Button, Panel} from 'react-bootstrap';
import ControlledTabs from '../ControlledTabs';


// labels:
const HinterPanelTitle = (<h3>მითითება</h3>);
const hinterTabContainerID = "controlled-hintersTab";


class Hinter extends Component {


	render (){
		var hinterElements = [];
		var tabs = [];
		if (this.props.hinters !== undefined) {
			this.props.hinters.forEach( function(hinter, i) {
				if (hinter.code) {
					hinter.htmlID = "codeTab" + hinter.title;
					tabs.push(hinter);
				}
				else {
					hinterElements.push(<HinterElement key={i} title={hinter.title} content={hinter.content} />);
				}
			}); 
		}
		return (
			<Panel id={this.props.id} header={HinterPanelTitle} >
				<div>
					{hinterElements}
				</div>
				<div>
					{tabs.length > 0 && <ControlledTabs tabs={tabs} id={hinterTabContainerID} />}
				</div>
			</Panel>
		);
	}
}

export default Hinter;



class HinterElement extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false
		}
	}

	onHinterClick = () => {
		this.setState({ open: !this.state.open });
	}

	render () {
		return (
			<div>
				<Button onClick={this.onHinterClick} >
					{this.props.title}
		        </Button>
		        <Panel collapsible expanded={this.state.open}>
		        	{this.props.content}
		        </Panel>
			</div>
		);
	}
}