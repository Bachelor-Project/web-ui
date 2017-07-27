import React, {Component} from 'react';
import AceEditor from 'react-ace';
import {Panel, FormGroup, FormControl, Button} from 'react-bootstrap';
import java from 'brace/mode/java';
import python from 'brace/mode/python';
import c_cpp from 'brace/mode/c_cpp';

import 'brace/theme/chrome'; import 'brace/theme/clouds'; import 'brace/theme/dreamweaver'; import 'brace/theme/eclipse';
import 'brace/theme/github'; import 'brace/theme/kuroir'; import 'brace/theme/monokai'; import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light' ; import 'brace/theme/terminal'; import 'brace/theme/textmate';
import 'brace/theme/tomorrow'; import 'brace/theme/twilight'; import 'brace/theme/xcode';

import $ from 'jquery';



const labels = {
	resultPanelHeader: "შედეგი",
	compileButton: "კომპილაცია",
	runButton: "გაშვება",
	language: "ენა"
}

const allThemes = ["chrome", "clouds", "dreamweaver", "eclipse", "github", "kuroir", "monokai", "solarized_dark",
					"solarized_light", "terminal", "textmate", "tomorrow", "twilight", "xcode"];


class TaskSolution extends Component {

	constructor(props) {
		super(props);

		this.state = {
			editorValue: '',
			editorMode: '',
			editorTheme: '',
			compileSuccess: false,
			defaultLan: 'Java'
		}
	}

	onCompileClick = () => {
		var data = {};
  		data['user'] = window.localStorage.user;
  		data['taskName'] = this.props.taskName;
  		data['lang'] = this.state.defaultLan;
  		data['code'] = this.state.editorValue;

		$.ajax({
			url: '/compile',
            method: 'put',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: (data) => {
            	alert(data);
            }
		});

		// this.setState({ compileSuccess: true });
	}

	onRunClick = () => {
		alert("RUN");
	}

	onEditorLoad = (editor) => {
		if (this.props.taskLanguages.length > 0) {
			this.setState({ editorValue: this.props.taskLanguages[0].code, 
							editorMode: this.props.taskLanguages[0].name.toLowerCase() });	
		}
	} 

	onEditorValueChange = (newValue, event) => {
		this.setState({ editorValue: newValue });
	}

	onLanguageChange = (event) => {
		const selectedOptionName = event.target.value
		this.setState({ defaultLan: selectedOptionName });
		const languages = this.props.taskLanguages.filter( (lang) => {
			return lang.name == selectedOptionName;
		});
		if (languages.length > 0){
			const language = languages[0];
			const mode = language.name.toLowerCase();
			this.setState({ editorValue: language.code, editorMode: mode });
		}
		
	}

	onThemeChange = (event) => {
		this.setState({ editorTheme: event.target.value });
	}

	render (){
		const isSigned = window.localStorage.getItem("token") !== null;

		const languages = this.props.taskLanguages.map((lang) => {
							return (<option key={lang.id} value={lang.name} id={'lang-' + lang.id} >{lang.descrip}</option>);
						});
		const themes = allThemes.map((theme, i) => {
						return (<option key={i} value={theme} id={'theme-' + i}>{theme}</option>);
					});
		const disabledRun = !this.state.compileSuccess;
		return (
			<div>
				<div style={{position: 'relative'}} >
					<Button onClick={this.onCompileClick} style={{margin: "8px"}} disabled={!isSigned} >
								{labels.compileButton}</Button>
					<Button onClick={this.onRunClick} style={{margin: "8px"}} disabled={disabledRun} >
								{labels.runButton}</Button>

					<FormGroup style={{width: "16%", position: 'absolute', top: '8px', right: 'calc(16% + 20px)'}} controlId="solutionLangsSelected" >
						<FormControl id="langSelector" componentClass="select" value={this.state.defaultLan} placeholder={labels.language} onChange={this.onLanguageChange} >
							{languages}
						</FormControl>
					</FormGroup>
					<FormGroup style={{width: "16%", position: 'absolute', top: '8px', right: '10px'}} controlId="solutionThemeSelected" >
						<FormControl componentClass="select" placeholder={labels.language} onChange={this.onThemeChange} >
							{themes}
						</FormControl>
					</FormGroup>
				</div>
				<AceEditor 
					mode={this.state.editorMode}
				    theme={this.state.editorTheme}
				    onLoad={this.onEditorLoad}
				    onChange={this.onEditorValueChange}
				    name="solutionEditor"
				    editorProps={{$blockScrolling: true}}
				    width="100%"
				    height="400px"
				    value={this.state.editorValue}
				    setOptions={{
					  enableBasicAutocompletion: true,
					  enableLiveAutocompletion: true,
					  enableSnippets: false,
					  showLineNumbers: true,
					  tabSize: 4,
					  }}
				/>
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