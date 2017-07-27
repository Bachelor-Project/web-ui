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
				if (hinter.isCode) {
					hinter.htmlID = "codeTab" + hinter.title;
					var slices = hinter.content.split('\n\n');
					var entries = slices.map((line, i) => {
						return (<p key={i} style={{fontSize: '16px'}}>{line}</p>);
					});
					var newHinter = {};
					newHinter['id'] = hinter.id;
					newHinter['isCode'] = hinter.isCode;
					newHinter['title'] = hinter.title;
					newHinter['content'] = entries;
					tabs.push(newHinter);
				}
				else {
					hinterElements.push(<HinterElement key={i} title={hinter.title} content={hinter.content} />);
				}
			}); 
		}
		return (
			<Panel id={this.props.id} header={HinterPanelTitle} style={{marginTop: "16px"}} >
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