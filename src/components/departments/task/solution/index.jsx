import React, {Component} from 'react';
import AceEditor from 'react-ace';
import {Panel, FormGroup, FormControl, Form, Button} from 'react-bootstrap';
import java from 'brace/mode/java';
import python from 'brace/mode/python';
import c_cpp from 'brace/mode/c_cpp';

// import 'brace/theme/twilight'
import 'brace/theme/eclipse'


const labels = {
	resultPanelHeader: "შედეგი",
	compileButton: "კომპილაცია",
	runButton: "გაშვება",
	language: "ენა"
}


class TaskSolution extends Component {

	constructor(props) {
		super(props);

		this.state = {
			editorValue: '',
			editorMode: ''
		}
	}

	onCompileClick = () => {
		alert("COMPILE");
	}

	onRunClick = () => {
		alert("RUN");
	}

	onEditorValueChange = (newValue) => {
		
	}

	onLanguageChange = (event) => {
		const selectedOptionID = event.target.value
		const languages = this.props.taskLanguages.filter( (lang) => {
			return lang.id == selectedOptionID
		});
		if (languages.length > 0){
			const language = languages[0];
			const mode = language.name.toLowerCase();
			this.setState({ editorValue: language.code, editorMode: mode });
		}
		
	}

	onThemeChange = (event) => {
		alert("theme");
	}

	render (){
		const languages = this.props.taskLanguages.map((lang) => {
							return (<option key={lang.id} value={lang.id} id={lang.id} >{lang.descrip}</option>);
						});

		return (
			<div>
				<div>
					<div >
						<Button onClick={this.onCompileClick} style={{margin: "8px"}}>{labels.compileButton}</Button>
						<Button onClick={this.onRunClick} style={{margin: "8px"}}>{labels.runButton}</Button>
						<FormGroup style={{width: "30%"}} controlId="solutionLangsSelected" >
							<FormControl componentClass="select" placeholder={labels.language} onChange={this.onLanguageChange} >
								{languages}
							</FormControl>
						</FormGroup>
					</div>
					<AceEditor 
						mode={this.state.editorMode}
					    theme="textmate"
					    onChange={this.onEditorValueChange}
					    name="solutionEditor"
					    editorProps={{$blockScrolling: true}}
					    width="100%"
					    value={this.state.editorValue}
					/>
				</div>
				<Panel header={labels.resultPanelHeader} bsStyle={this.props.result.panelStyle} >
					<FormGroup controlId="solutionResultGroup" validationState={this.props.result.textareaStyle} >
				    	<FormControl componentClass="textarea" />
				    </FormGroup>
				</Panel>
			</div>
		);
	}
}

export default TaskSolution;