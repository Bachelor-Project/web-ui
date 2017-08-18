import React, {Component} from 'react';
import {Media, Button} from 'react-bootstrap';
import $ from 'jquery';



function Paragraphs(props) {
	return (
			<div>
				{props.text.split('\n').map((token, i) => {
										return (<span key={i} style={{fonstSize: '16px', textAlign: 'justify'}} >
													{token}<br/></span>);
								})}
			</div>
			);
}


class TaskAnalyzer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			comments: []
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.taskID !== nextProps.taskID){
			this.fetchComments(nextProps.taskID);
		}
	}

	componentWillMount() {
		this.fetchComments(this.props.taskID);
	}

	fetchComments = (taskId) => {
		$.ajax({
			// url: '/bp_analyzer/api/comments/' + taskId,
			url: '/comments/' + taskId,
			method: 'GET',
			success: (data) => {
				this.setState({ comments: data });
			},
			dataTYpe: 'jaon',
			cache: false
		});
	}

	onPublishClick = () => {
		let text = $("#analyse-input").val();
		if (text.length > 0){
			var user = window.localStorage.getItem("user");
			
			var currComments = this.state.comments.slice();
			currComments.push({ id: currComments.length + 1, username: user, text: text });
			this.setState({ comments: currComments });

			var requestJson = {};
			requestJson.username = user;
			requestJson.text = text;
			requestJson.taskId = this.props.taskID; // window.localStorage.getItem("taskID");

			$.ajax({
	            url: '/bp_analyzer/api/new_comment',
	            method: 'post',
	            contentType: "application/json; charset=utf-8",
	            data: JSON.stringify(requestJson)
	        });

            $("#analyse-input").val("");
		}
	}

	render (){
		const isSigned = window.localStorage.getItem("token") !== null;

		return (
			<div style={{marginBottom: '2%'}} >
				{this.state.comments.length > 0 && this.state.comments.map((elem) => {
															return (
																	<Media key={elem.id} >
																		<Media.Body>
																			<Media.Heading>{elem.username}</Media.Heading>
																			<Paragraphs text={elem.text} /> 
																		</Media.Body>
																	</Media>
																	);
														})
					}
				{isSigned && <div style={{border: '2px dotted black', padding: '8px', marginTop: '16px', borderTop: 'none'}} >
					<textarea rows="10" style={{width: '100%'}} id="analyse-input" placeholder="შეიყვანეთ ტექსტი" />
					<Button onClick={this.onPublishClick} 
							style={{width: '80%', margin: '0px 10%'}} > გამოქვეყნება</Button>
				</div>}
			</div>
		);
	}
}

export default TaskAnalyzer;