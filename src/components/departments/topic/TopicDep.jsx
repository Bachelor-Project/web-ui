import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import $ from 'jquery';

import {ToggleMenu} from '../../generals/helpers/Components';




const treeData = {
	name: 'გრაფი',
	toggled: true,
	children: 	[
					{
						name: 'ტიპი 1',
						toggled: true,
						children: 	[
										{
											id: 1,
											name: 'თემა 1.1'
										},
										{
											id: 2,
											name: 'თემა 1.2'
										}
									]
					},
					{
						name: 'ტიპი 2',
						toggled: true,
						children: 	[
										{
											id: 3,
											name: 'თემა 2.1',
										},
										{
											id: 4,
											name: 'თემა 2.2'
										}
									]
					}
				]
}


class TopicDep extends Component {

	constructor(props) {
		super(props);

		super(props);
        this.state = {
        	topicTitle: 'bla',
        	topicId: 1,
        	topicContent: 'content of topic',

        	bookmarkedId: 0
        };
        this.onToggle = this.onToggle.bind(this);
	}

	onToggle = (node, toggled) => {
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node,  topicTitle: node.name, topicId: node.id, topicContent: 'topic content ' + node.name});

    }

    // Change task from left menu:
	handleTopicChange = (node) => {

		alert("გადმოსაწერია თემა id-ით " + node.id);
		this.setState({ taskId: node.id, taskContent: 'task content of ' + node.name });
	}


	render (){
		return (
			<div style={{position: 'relative'}} >
				<ToggleMenu treeData={treeData} nodeChangeHandler={this.handleTopicChange} />

				<div className="container" style={{position: 'absolute', right: '0px', top: '54px', width: '84%'}} >
					<TopicHeader topicTitle={this.state.topicTitle} topicId={this.state.topicId} />
					<div style={{textAlign: 'center'}} >
						{this.state.topicContent}
					</div>
				</div>
			</div>
		);
	}
}

export default TopicDep;



class TopicHeader extends Component {

	onBookmarkClick = () => {
		alert('user: ' + 'vinme' + ' topic_id: ' + this.props.topicId);

		var data = new FormData();
		data.append('user', window.localStorage.algoUser);
		data.append('topic', this.state.topicId);
		// $.ajax({
		// 	url: '/apigatway/to/users/api/bookmark',
		// 	type: 'POST',
		// 	data: data,
		// 	contentType: 'json'
		// });

		this.setState({ bookmarkedId: this.state.topicId });
	}

	onDownloadClick = () => {
		alert('user: ' + 'vinme' + ' ჩამოტვირთავს თემას: ' + this.props.topicTitle);
	}

	render (){
		return (
			<div style={{marginTop: '10%', marginLeft: '10%'}} >
				{this.props.topicTitle}
				<Button onClick={this.onBookmarkClick} style={{margin: '4px'}} >მონიშვნა</Button>
				<Button onClick={this.onDownloadClick} style={{margin: '4px'}} >ჩამოტვირთვა</Button>
			</div>
		);
	}
}





// <Header />
// <Content />