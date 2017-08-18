import React, {Component} from 'react';
import AceEditor from 'react-ace';
import {Panel, FormGroup, FormControl} from 'react-bootstrap';
import java from 'brace/mode/java';
import python from 'brace/mode/python';
import c_cpp from 'brace/mode/c_cpp';

import 'brace/theme/chrome'; import 'brace/theme/clouds'; import 'brace/theme/dreamweaver'; import 'brace/theme/eclipse';
import 'brace/theme/github'; import 'brace/theme/kuroir'; import 'brace/theme/monokai'; import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light' ; import 'brace/theme/terminal'; import 'brace/theme/textmate';
import 'brace/theme/tomorrow'; import 'brace/theme/twilight'; import 'brace/theme/xcode';

import $ from 'jquery';

import ProgressButton, {STATE} from 'react-progress-button';
import styles from './progress_button.css';


const labels = {
	resultPanelHeader: "შედეგი",
	compileButton: "კომპილაცია",
	runButton: "გაშვება",
	language: "ენა",
	exeResult: "შედეგებისთვის იხილეთ ტესტების განყოფილება."
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
			defaultLan: 'Java',

			execResult: '',
			execState: '',
			execPanelStyle: 'default',

			comButtonState: STATE.NOTHING,
			runButtonState: STATE.NOTHING,
		}
	}

	onCompileClick = () => {
		this.setState({comButtonState: 'loading'});

		var data = {};
  		data['user'] = window.localStorage.user;
  		data['taskName'] = this.props.taskName;
  		data['lang'] = this.state.defaultLan;
  		data['code'] = this.state.editorValue;

		$.ajax({
			// url: '/execution/api/compile',
			url: '/compile',
            method: 'put',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: (data) => {
            	this.setState({ compileSuccess: true, execResult : "წარმატებით დაკომპილირდა", 
            					execState: 'success', execPanelStyle: 'success', comButtonState: STATE.SUCCESS });
            },
            error: (data) => {
            	const compileErrorText = $.parseJSON(data.responseText).reduce((accumulator, currentValue) => {
            		return accumulator + "\n" + "line: \t" + currentValue.line + "\n" + 
        										"error: \t" + currentValue.errorText + "\n" + 
        										"code: \t" + currentValue.code;
            	}, "");
            	this.setState({ compileSuccess: false, execResult : compileErrorText, 
            		execState: 'error', execPanelStyle: 'danger', comButtonState: STATE.ERROR });
            }
		});

		// this.setState({ compileSuccess: true });
	}

	processComeErrors = (errorJsonArr) => {
		var chain = '';
		errorJsonArr.forEach((error) => {
			chain = chain + JSON.stringify(error) + '\n';
		});
	}

	onRunClick = (e) => {
		// this.setState({compileSuccess: false});
		this.setState({runButtonState: 'loading'});

		var dataJson = {};
		dataJson["lang"] = this.state.defaultLan;
		dataJson["username"] = window.localStorage.getItem("user");
		dataJson["taskId"] = this.props.taskId;
		dataJson["compiled"] = this.state.compileSuccess;

		$.ajax({
			// url: '/files_data/api/run_code',
			url: '/run_code',
			method: 'POST',
			contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dataJson),

            success: (data) => {
            	// 1. panel unda sheecvalos peri
            	// 2. loading button unda sheecvalos feri
            	// 3. testebis table-shi testebs udna sheecvalos feri
            	var defaultPanelStyle = 'success';
            	var defaultRunButtonState = STATE.SUCCESS;
            	data.forEach((testResult) => {
            		if (testResult.exType !== 'NoError'){
            			if (this.state.execStyle !== 'danger') {
            				defaultPanelStyle = 'danger';
            			}
            			if (this.state.runButtonState !== STATE.ERROR) {
            				defaultRunButtonState = STATE.ERROR;
            			}
            			
            		}
            	});
            	this.props.testsResultHandler(data);
            	this.setState({ execResult : labels.exeResult, 
        						execPanelStyle: defaultPanelStyle,
            					runButtonState: defaultRunButtonState});
            },
            error: (data) => {
            	this.setState({ execResult : JSON.stringify(data), runButtonState: STATE.ERROR});
            	alert(JSON.stringify(data));
            }
		});
		e.preventDefault();
	}


	onEditorLoad = (editor) => {
		if (this.props.taskLanguages.length > 0) {
			var code = this.props.taskLanguages[0].code;
			if (this.props.taskLanguages[0].name.toLowerCase() === 'java'){
				code = this.props.taskLanguages[0].code.replace('Solution', this.props.taskName);
			}
			this.setState({ editorValue: code, 
							editorMode: this.props.taskLanguages[0].name.toLowerCase() });	
		}
	} 

	onEditorValueChange = (newValue, event) => {
		this.setState({ compileSuccess: false, editorValue: newValue, runButtonState: STATE.NOTHING });
	}

	onLanguageChange = (event) => {
		const selectedOptionName = event.target.value
		this.setState({ defaultLan: selectedOptionName });

		const languages = this.props.taskLanguages.filter( (lang) => {
			return lang.name === selectedOptionName;
		});
		if (languages.length > 0){
			const language = languages[0];
			const mode = language.name.toLowerCase();
			if (mode === 'java') {
				var newCode = language.code.replace('Solution', this.props.taskName);
				language.code = newCode;
			}
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
		const showRunButton = this.state.compileSuccess;
		return (
			<div>
				<div style={{position: 'relative'}} >
					{isSigned && <ProgressButton onClick={this.onCompileClick} state={this.state.comButtonState} 
												style={styles, {margin: "8px"}} >
			      					{labels.compileButton}
			    				</ProgressButton>}
    				{showRunButton && <ProgressButton onClick={this.onRunClick} state={this.state.runButtonState} 
													style={styles, {margin: "8px"}} >
				      					{labels.runButton}
				    				</ProgressButton>}

					<FormGroup style={{width: "16%", position: 'absolute', top: '8px', right: 'calc(16% + 20px)'}} >
						<FormControl id="langSelector" componentClass="select" value={this.state.defaultLan} placeholder={labels.language} onChange={this.onLanguageChange} >
							{languages}
						</FormControl>
					</FormGroup>
					<FormGroup style={{width: "16%", position: 'absolute', top: '8px', right: '10px'}} >
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
				<Panel header={labels.resultPanelHeader}  bsStyle={this.state.execPanelStyle} >
					<FormGroup controlId="solutionResultGroup" >
				    	<FormControl componentClass="textarea" value={this.state.execResult} style={{height: '150px'}} />
				    </FormGroup>
				</Panel>
			</div>
		);
	}
}

export default TaskSolution;