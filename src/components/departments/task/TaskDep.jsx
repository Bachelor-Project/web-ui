import React, {Component} from 'react';

import TaskTests from './tests';
import TaskSolution from './solution';
import TaskAnalyzer from './analyse';
import ControlledTabs from './ControlledTabs';
import Hinter from './hint';
import {ToggleMenu} from '../../generals/helpers/Components';
import $ from 'jquery';


const languages = [
	{
		id: 1,
		name: "Java",
		descrip: "Java 1.8",
		code: "\npublic class Solution {\n\n" + 
					"\tpublic static void main(String[] args){\n\n" + 
						"\t}\n" +
				"}\n"
	},
	{
		id: 2,
		name: "Python",
		descrip: "Python 2.7",
		code: "\nif __name__==\"__main__\":\n\n"
	},
	{
		id: 3,
		name: "c_cpp",
		descrip: "GNU C++",
		code: "\nint main(int argc, const char * argv[]) {\n\n" +
					"\treturn 0;\n" + 
				"}\n"
	}
];


function TaskContent(props) {
	var entries = [];
	var slices = props.text.split('\n');
	slices.forEach((line, i) => {
		entries.push(<p key={i} style={{fontSize: '16px'}}>{line}</p>);
	});
	return (
		<div>
			<h3>{props.title}</h3>
			<p style={{fontWeight: 'bold', fontSize: '16px'}} >{props.limits}</p>
			{entries}
		</div>
	);
}

// const res = {
// 	panelStyle: "success",
// 	textareaStyle: "success"
// }


const treeData = {
	name: '',
	toggled: true,
	children: 	[
					{
						levelId: 1,
						name: 'მარტივი',
						toggled: true,
						children: 	[]
					},
					{
						levelId: 2,
						name: 'საშუალო',
						toggled: false,
						children: 	[]
					},
					{
						levelId: 3,
						name: 'რთული',
						toggled: false,
						children: 	[]
					}
				]
}

const taskDataTabID = "uncontrolled-taskData";
const solutionDataTabID = "uncontrolled-solutoinData";
const hinterID = "hinter";


class TaskDep extends Component {

	constructor(props) {
		super(props);

		this.state = {
			headerTarget: taskDataTabID,

			taskId: 0,
			taskContent: 'Task Content',
			loader: true,
			hinters: [],
			taskContentText: '',
			tests: [],

			taskTabs: [],
			solutionTabs: [],
			solutionResult: '',

			task_name: ''
		}
	}

	componentWillUnmount(){
		treeData.children.forEach((child) => {
			child.children = [];
		});
	}

	// Navigatoin task parts:
	handleCondition = () => {
		this.setState({ headerTarget: taskDataTabID });
	}
	handleSolution = () => {
		this.setState({ headerTarget: solutionDataTabID });
	}
	handleHinter = () => {
		this.setState({ headerTarget: hinterID });
	}

	componentWillMount(){
		$.ajax({
			url: '/tasks_min_data/' + this.props.match.params.mainTopicId,
			method: 'GET',
			success: (data) => {
				data.forEach((task_min) => {
					var mtInTree = treeData.children.find((mt) => {return mt.levelId === task_min.level_id});
					mtInTree.children.push(task_min);
				});
				
				this.fetchTaskById(data[0].id); // fetch the first task.
			},
			dataType: 'json',
            cache: false
		});

		var mainTopicID = this.props.match.params.mainTopicId;
		this.fetchMainTopicName(mainTopicID);
	}

	fetchMainTopicName = (mainTopicID) => {
		$.ajax({
            url: '/name_main_topic',
            type: 'GET',
            data: {
                id: mainTopicID,
            },
            success: (data) => {
                        treeData.name = data;
                    },
            dataType: 'text',
            cache: false
        });
	}

	fetchTaskById = (taskID) => {
		$.ajax({
			url: '/task_full_data/' + taskID,
			method: 'GET',
			success: (data) => {
				const tmLimit = "დროის ლიმიტი: " + data.task.timeLimit + " წმ.; ";
				const memLimit = "მეხსიერების ლიმიტი: " + data.task.memoryLimit + " მბ."

				const sortedTests = data.tests.sort((e1, e2) => {
					if (e1.name < e2.name) return -1;
					if (e1.name > e2.name) return 1;
					return 0;
				});
				var upTabs = [	
								{
									id: 1,
									htmlID: "conditionTab",
									title: "პირობა",
									content: <TaskContent title={data.task.name} limits={tmLimit + memLimit} 
														text={data.taskContent} />
								},
								{
									id: 2,
									htmlID: "testsTab",
									title: "ტესტები",
									content: <TaskTests tests={sortedTests} />
								}
							];
				var bottomTabs = [
									{
										id: 1,
										htmlID: "solutionTab",
										title: "ამოხსნა",
										content: <TaskSolution taskLanguages={languages} 
												result={this.state.solutionResult} taskName={data.task.name} />
									},
									{
										id: 2,
										htmlID: "analyzeTab",
										title: "ანალიზი",
										content: <TaskAnalyzer taskID={taskID} />
									}
								];
				this.setState({ taskTabs : upTabs, solutionTabs: bottomTabs, hinters: data.hints, task_name: data.task.name });
			},
			dataType: 'json',
            cache: false
		});
	}

	getAllTaskCallback = (data, status) => {

	}


	// Change task from left menu:
	handleTaskChange = (node) => {
		this.fetchTaskById(node.id);
		this.setState({ taskId: node.id});
	}


	render (){
		const isSigned = window.localStorage.getItem("token") !== null;
		return (
			<div style={{marginTop: '4%'}} id="outer-container" >
				<ToggleMenu treeData={treeData} nodeChangeHandler={this.handleTaskChange} />
				
				<div className="container" id="page-wrap">
					<ControlledTabs id={taskDataTabID} tabs={this.state.taskTabs} hasAspectRatioHeight={true} />
					<div className="divider" style={{height: '20px', borderTop: '2px solid #e0ebeb'}} ></div>
					<ControlledTabs id={solutionDataTabID} tabs={this.state.solutionTabs} hasAspectRatioHeight={false} />
					{isSigned && <Hinter id={hinterID} hinters={this.state.hinters} />}
				</div>
			</div>
		);
	}
}

export default TaskDep;


// <HeaderNavBar target={this.state.headerTarget} onConditionClick={this.handleCondition}
// 									onSolutionClick={this.handleSolution} onHinterClick={this.handleHinter} />