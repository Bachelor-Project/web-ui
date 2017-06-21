import React, {Component} from 'react';
import {Media, Button} from 'react-bootstrap';
import $ from 'jquery';



function Paragraphs(props) {
	return (
			<div>
				{props.text.split('\n').map((token, i) => {
										return (<p key={i}>{token}</p>);
								})}
			</div>
			);
}



const fakeComments = [
	{
		user: 'user_1',
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \n" +
				"text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n" + 
				"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		user: 'user_2',
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n" + 
				"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		user: 'user_3',
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \n" +
				"text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n" + 
				"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];


class TaskAnalyzer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			comments: fakeComments
		}
	}

	onPublishClick = () => {
		var currComments = this.state.comments.slice();
		let text = $("#analyse-input").val();
		currComments.push({ user: 'user_new', text: $("#analyse-input").val() });
		this.setState({ comments: currComments });
	}


	render (){
		const listComments = this.state.comments.map((comment) => {
			return (
					<Media>
						<Media.Body>
							<Media.Heading>{comment.user}</Media.Heading>
							<Paragraphs text={comment.text} /> 
						</Media.Body>
					</Media>
					);
		});

		return (
			<div>
				{listComments}
				<div>
					<textarea rows="10" cols="100" id="analyse-input" placeholder="შეიყვანეთ ტექსტი" />
					<Button onClick={this.onPublishClick} >გამოქვეყნება</Button>
				</div>
			</div>
		);
	}
}

export default TaskAnalyzer;