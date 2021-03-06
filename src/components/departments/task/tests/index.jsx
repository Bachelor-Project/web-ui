import React, {Component} from 'react';
import {Table, Checkbox} from 'react-bootstrap';
import $ from 'jquery';


class TaskTests extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: 0,
			selectedTestsCount: 0,
			selectedTestsNames: [],

			allEnableTest: this.props.tests.length,
			selectedAllTest: false,
			changeByChild: false
		}
	}

	onAllTestClick = (event) => {
		const checked = event.target.checked;

		this.setState({
			value: (checked) ? 1 : 0,
			selectedTestsCount: (checked) ? this.state.allEnableTest : 0,
			selectedTestsNames: (checked) ? this.props.tests.map(t => t.name) : [],
			selectedAllTest: checked
		});
	}

	// -----
	handleChildSelectChange = (checked, testName) => {
		alert(checked);

		if (!checked && this.state.selectedAllTest){
			let newTestsCount = this.state.testsCount - 1;
			var zero = 0;
			const newValueChange = newTestsCount === zero ? 0 : 2;
			let newSelected = this.state.selectedTestsNames.slice().push(testName);
			this.setState({ 
							testsCount: newTestsCount,
							selectedTestsNames: newSelected,
							selectedAllTest: false, 
							changeByChild: true, 
							value: newValueChange 
						});
		}
		if (checked) {
			let newTestsCount = this.state.testsCount + 1;
			const sizeIsFill = (newTestsCount === this.state.allEnableTest);
			const newValueChange = sizeIsFill ? 1 : this.state.value;

			let newSelected = this.state.selectedTestsNames.filter(name => name !== testName);

			this.setState({ 
							testsCount: newTestsCount, 
							selectedTestsNames: newSelected,
							selectedAllTest: sizeIsFill,
							value: newValueChange
						});
		}
		
	}


	render() {
		const testsResultJSON = this.props.testsResult;
		var isSelectedAll = this.state.selectedAllTest;
		var testElements = [];
		
		const greenColor = {color: 'green'};
		const redColor = {color: 'red'};
		const defaultColor = {color: 'black'};


		if (this.props.tests !== undefined){
			this.props.tests.forEach( function(testData){
				var bgc = null;
				var resultText = '';

				if (testsResultJSON.length != 0){
					const appropTest = testsResultJSON.find((elem) => {return elem.name === testData.name});
					bgc = appropTest.passed;
					resultText = appropTest.error;
				}
				
				testElements.push(<TestElement key={testData.name} 
												data={testData} 
												result={resultText}
												isDisabled={isSelectedAll}
												isSelected={isSelectedAll}
												style={bgc === null ? defaultColor : bgc ? greenColor : redColor}
												/>);
			});
		}

		return (
			<div style={{marginTop: '8px'}} >
				<Table responsive > 
					<thead>
						<tr style={{backgroundColor: '#e1eaea', height: '10px'}} >
							<th>
								<Checkbox onClick={this.onAllTestClick} checked={this.state.selectedAllTest} 
											style={{margin: '0px'}} ></Checkbox>
							</th>
							<th style={{paddingBottom: '10px'}} >ტესტი</th>
							<th style={{paddingBottom: '10px'}} >Input</th>
							<th style={{paddingBottom: '10px'}} >Output</th>
							<th style={{paddingBottom: '10px'}} >შედეგი</th>
						</tr>
					</thead>
					<tbody>
						{testElements}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default TaskTests;


class TestElement extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isSelected: this.props.isSelected
		}
	}

	onTestClick = (event) => {
		this.setState({ isSelected : event.target.checked });
	}

	getSlices(symbol, data) {
		return  data.split(symbol).map(function(elem, i){
					return (<span key={i} style={{fonstSize: '16px'}} >{elem}<br /></span>);
				});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ isSelected: nextProps.isSelected });
	}

	render() {
		const inputs = this.getSlices('\n', this.props.data.input);
		const outputs = this.getSlices('\n', this.props.data.output);
		const result = this.props.result;

		return (
			<tr> 
				<td>
					<Checkbox disabled={this.props.isDisabled} 
								onClick={this.onTestClick}
								checked={this.state.isSelected}></Checkbox>
				</td>
				<td style={{fontSize: '16px', paddingTop: '20px'}, this.props.style}>
					{this.props.data.name}
				</td>
				<td style={{display: 'block', height: '100px', overflow: 'auto'}} >{inputs}</td>
				<td style={{height: '100px', overflow: 'auto'}} >{outputs}</td>
				<td style={{height: '100px', overflow: 'auto'}} >{result}</td>
			</tr>
		);
	}
}
