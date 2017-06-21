import './TaskDepStyle.css';

import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu';
import {Treebeard} from 'react-treebeard';

import TaskTests from './tests';
import TaskSolution from './solution';
import TaskAnalyzer from './analyse';
import ControlledTabs from './ControlledTabs';
import Hinter from './hint';


// -----------------------------------  Start Variables -----------------------------------

const SideContent = [
	{
		icon: '',
        label: 'Level 1',
        content: [
            {
                icon: '',
                label: 'task 1',
            },
			{
				icon: '',
                label: 'task 2'
			}
		]      
	},
	{
		icon: '',
        label: 'Level 2',
        content: [
            {
                icon: '',
                label: 'task 1',
            },
			{
				icon: '',
                label: 'task 2'
			}
		]           
	}
];

const tests = [
	{
		name: '01',
		input: '5 5 1 999\n3 2 4',
		output: '3 3 4'
	},
	{
		name: '02',
		input: '5 5 2 1000\n1 1 1\n4 4 3',
		output: '1 1 1\n4 4 3'
	},
	{
		name: '03',
		input: '5 5 2 1000\n1 1 1\n4 4 3',
		output: '1 1 1\n4 4 3'
	},
	{
		name: '04',
		input: '5 5 2 1000\n1 1 1\n4 4 3',
		output: '1 1 1\n4 4 3'
	},
	{
		name: '05',
		input: '5 5 2 1000\n1 1 1\n4 4 3',
		output: '1 1 1\n4 4 3'
	},
	{
		name: '06',
		input: '5 5 2 1000\n1 1 1\n4 4 3',
		output: '1 1 1\n4 4 3'
	}
];

const taskContentText = ("ამოცანა B. ლამაზი მწკრივი \n" +
					" შემავალი ფაილი: b.in გამომავალი ფაილი: b.out\n" +
					"დროის ლიმიტი: 3 წამი\n" +
					"მეხსიერების ლიმიტი: 256 მბ\n" +
		"ალი-ამირმა ამოწერა N ცალი რიცხვი ერთ მწკრივში. მწკრივი ითვლება ლამაზად, თუ მასში შემავალი ნებისმიერი ორი მეზობელი  წევრის ორობით ან სამობით ჩანაწერში ტოლი რაოდენობის 1-იანია. ალი-ამირს აინტერესებს, რამდენი განსხვავებული ვარიანტი არსებობს ისეთი ლამაზი მწკრივის მისაღებად, რომელიც ყველა მოცემული N ცალი რიცხვისაგან შედგება.\n" +
		"შემავალი მონაცემები : პირველ სტრიქონში ერთი მთელი რიცხვი N (2 <= N <=20). მეორე სტრიქონში N ცალი მთელი დადებითი რიცხვი, რომელთაგან თითოეული არ აღემატება 109 (მილიარდს). \n" +
		"გამომავალი მონაცემები : ერთადერთ სტრიქონში ერთი მთელი რიცხვი:  მოცემული N ცალი რიცხვისაგან შედგენილი ყველა ლამაზი მწკრივის  რაოდენობა.\n"+
		"განმარტება:\n" +
		"მაგალითში 5 = 123 და 1 = 13, 5 = 1012 და 6 = 1102, ამიტომ არსებობს ორი მიმდევრობა: 1, 5, 6 და 6, 5, 1. \n" +
		"ტესტების 25%–სათვის  N <= 4.\n" +
		"ტესტების 50%–სათვის N <= 10\n" 
		+
		"ამოცანა B. ლამაზი მწკრივი \n" +
					" შემავალი ფაილი: b.in გამომავალი ფაილი: b.out\n" +
					"დროის ლიმიტი: 3 წამი\n" +
					"მეხსიერების ლიმიტი: 256 მბ\n" +
		"ალი-ამირმა ამოწერა N ცალი რიცხვი ერთ მწკრივში. მწკრივი ითვლება ლამაზად, თუ მასში შემავალი ნებისმიერი ორი მეზობელი  წევრის ორობით ან სამობით ჩანაწერში ტოლი რაოდენობის 1-იანია. ალი-ამირს აინტერესებს, რამდენი განსხვავებული ვარიანტი არსებობს ისეთი ლამაზი მწკრივის მისაღებად, რომელიც ყველა მოცემული N ცალი რიცხვისაგან შედგება.\n" +
		"შემავალი მონაცემები : პირველ სტრიქონში ერთი მთელი რიცხვი N (2 <= N <=20). მეორე სტრიქონში N ცალი მთელი დადებითი რიცხვი, რომელთაგან თითოეული არ აღემატება 109 (მილიარდს). \n" +
		"გამომავალი მონაცემები : ერთადერთ სტრიქონში ერთი მთელი რიცხვი:  მოცემული N ცალი რიცხვისაგან შედგენილი ყველა ლამაზი მწკრივის  რაოდენობა.\n"+
		"განმარტება:\n" +
		"მაგალითში 5 = 123 და 1 = 13, 5 = 1012 და 6 = 1102, ამიტომ არსებობს ორი მიმდევრობა: 1, 5, 6 და 6, 5, 1. \n" +
		"ტესტების 25%–სათვის  N <= 4.\n" +
		"ტესტების 50%–სათვის N <= 10\n"
);

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
		code: "\nint main() {\n\n" +
					"\treturn 0;\n" + 
				"}\n"
	}
];

const taskTabs = [
	{
		id: 1,
		htmlID: "conditionTab",
		title: "პირობა",
		content: <TaskContent text={taskContentText} />
	},
	{
		id: 2,
		htmlID: "testsTab",
		title: "ტესტები",
		content: <TaskTests tests={tests} />
		
	}
];


function TaskContent(props) {
	var entries = [];
	var slices = props.text.split('\n');
	slices.forEach((line, i) => {
		entries.push(<p key={i}>{line}</p>);
	});
	return (
		<div>
			{entries}
		</div>
	);
}

const res = {
	panelStyle: "success",
	textareaStyle: "success"
}

const solutionTabs = [
	{
		id: 1,
		htmlID: "solutionTab",
		title: "ამოხსნა",
		content: <TaskSolution taskLanguages={languages} result={res} />
	},
	{
		id: 2,
		htmlID: "analyzeTab",
		title: "ანალიზი",
		content: <TaskAnalyzer />
	}
];


const hinters = [
	{
		id: 1,
		code: false,
		title: 'მითითება N1',
		content: 'რისი თავიც არ გაქ არ უნდა აკეთო!'
	},
	{
		id: 2,
		code: false,
		title: 'მითითება N2',
		content: 'გადახედეთ პირველ მითითებას!'
	},
	{
		id: 3,
		code: true,
		title: 'Java',
		content: 'public static void main(String[] args){...}'
	},
	{
		id: 4,
		code: true,
		title: 'C++',
		content: 'int main(){ return 0;}'
	}
];


const taskDataTabID = "uncontrolled-taskData";
const solutionDataTabID = "uncontrolled-solutoinData";
const hinterID = "hinter";


// -----------------------------------  End Variables -----------------------------------


export class ToggleMenu extends Component {

	constructor(props) {
		super(props);

		this.state = {}
	}

	onToggle = (node, toggled) => {
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }

        this.setState({ cursor: node });
        if (node.id){
	        this.props.nodeChangeHandler(node);
        }
    }

	render() {
		return (
			<Menu width={ '16%' } >
			        <Treebeard 
		                data={this.props.treeData}
		                onToggle={this.onToggle}
		            />
			</Menu>
		);
	}
}


const treeData = {
	name: 'გრაფი',
	toggled: true,
	children: 	[
					{
						name: 'მარტივი',
						toggled: true,
						children: 	[
										{
											id: 1,
											name: 'ამოცანა 1.1'
										},
										{
											id: 2,
											name: 'ამოცანა 1.2'
										}
									]
					},
					{
						name: 'საშუალო',
						toggled: false,
						children: 	[
										{
											id: 3,
											name: 'ამოცანა 2.1',
										},
										{
											id: 4,
											name: 'ამოცანა 2.2'
										}
									]
					},
					{
						name: 'რთული',
						toggled: false,
						children: 	[
										{
											id: 5,
											name: 'ამოცანა 3.1',
										},
										{
											id: 6,
											name: 'ამოცანა 3.2'
										}
									]
					}
				]
}



class TaskDep extends Component {

	constructor(props) {
		super(props);

		this.state = {
			headerTarget: taskDataTabID,
			// selectedTestsNames: [],

			taskId: 0,
			taskContent: 'Task Content'
		}
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


	// Change task from left menu:
	handleTaskChange = (node) => {
		// gadmovwerot node.id-is mqone amocana pirobit, testebit, mititebit  +++++++++++++++++++++++++++++++++

		alert("გადმოსაწერია ამოცანა id-ით " + node.id + " პირობით, ტესტებით, მითითებებით და ყველაფრით ");
		this.setState({ taskId: node.id, taskContent: 'task content of ' + node.name });
	}


	render (){
		return (
			<div style={{position: 'relative'}}>
				<ToggleMenu treeData={treeData} nodeChangeHandler={this.handleTaskChange} />
				
				
				<div className="container" style={{position: 'absolute', right: '0px', top: '54px', width: '84%'}}>
					<ControlledTabs id={taskDataTabID} tabs={taskTabs} />
					<ControlledTabs id={solutionDataTabID} tabs={solutionTabs} />
					<Hinter id={hinterID} hinters={hinters} />
				</div>
			</div>
		);
	}
}

export default TaskDep;


// <HeaderNavBar target={this.state.headerTarget} onConditionClick={this.handleCondition}
// 									onSolutionClick={this.handleSolution} onHinterClick={this.handleHinter} />