import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import $ from 'jquery';

import {ToggleMenu} from '../../generals/helpers/Components';



const mainTopicTreeData = {
	name: '',
	toggled: true,
	children: 	[]
}


class TopicDep extends Component {

	constructor(props) {
		super(props);

        this.state = {
        	topicTitle: '',
        	topicId: 0,
        	topicContent: 'content of topic',

        	bookmarkedId: 0,

        	cursor: null
        };
        // this.onToggle = this.onToggle.bind(this);
	}

	componentDidMount() {
		this.fetchMainTopicsContent();
	}

	fetchMainTopicsContent = () => {
		var mainTopicID = this.props.match.params.mainTopicId;

		this.fetchMainTopicName(mainTopicID);
		this.fetchMainTopicTopics(mainTopicID);
	}

	fetchMainTopicName = (mainTopicID) => {
		$.ajax({
            url: '/name_main_topic',
            type: 'GET',
            data: {
                id: mainTopicID,
            },
            success: (data) => {
            			console.log(data);
                        mainTopicTreeData.name = data;
                    },
            dataType: 'text',
            cache: false
        });
	}

	fetchMainTopicTopics = (mainTopicID) => {
		$.ajax({
            url: '/priorities',
            type: 'GET',
            data: {
                main_topic: mainTopicID,
            },
            success: (data) => {
                        var prioritiesData = data.map((elem) => {
                                                return {'id': elem.id, 'name': elem.descrip};
                                            });
                        mainTopicTreeData.children = prioritiesData;
                    },
            dataType: 'json',
            cache: false
        });
	}

	onToggle = (node, toggled) => {
        if(this.state.cursor){
        	// this.state.cursor.active = false;
        	this.setState({ cursor: {active: false} });
        }
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node,  topicTitle: node.name, topicId: node.id, topicContent: 'topic content ' + node.name});

    }

    // Change task from left menu:
	handleTopicChange = (node) => {

		alert("გადმოსაწერია თემა id-ით " + node.id);
		this.setState({ taskId: node.id, taskContent: 'task content of ' + node.name });
	}

	onBookmarkClick = () => {
		alert('user: vinme topic_id: ' + this.state.topicId);

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
		var user = 'vinme;'
		alert('user: ' + user + ' ჩამოტვირთავს თემას: ' + this.state.topicTitle);
	}


	render (){
		const isSigned = window.localStorage.getItem("token") !== null;

		return (
			<div id="outer-container" >
				<ToggleMenu treeData={mainTopicTreeData} nodeChangeHandler={this.handleTopicChange} />

				<main id="page-wrap" > 
					<div style={{borderBottom: '2px solid black', 
										marginTop: '4.5%', padding: '8px'}} >
						<span style={{textWeight: 'bold', fondSize: '50px', marginLeft: '30%'}} >{this.state.topicTitle}</span>
						{isSigned && <Button onClick={this.onBookmarkClick} style={{marginLeft: '10%'}} >მონიშვნა</Button>}
						{isSigned && <Button onClick={this.onDownloadClick} style={{marginLeft: '10%'}} >ჩამოტვირთვა</Button>}
					</div>
					
					<div style={{margin: '2px 4% 2% 2%'}} >
						
					</div>
				</main>
			</div>
		);
	}
}

export default TopicDep;


// <div style={{textAlign: 'justify'}} >
							// {this.state.topicContent}
							// asdasa
// </div>




// class TopicHeader extends Component {

// 	onBookmarkClick = () => {
// 		alert('user: ' + 'vinme' + ' topic_id: ' + this.props.topicId);

// 		var data = new FormData();
// 		data.append('user', window.localStorage.algoUser);
// 		data.append('topic', this.state.topicId);
		
// 		// $.ajax({
// 		// 	url: '/apigatway/to/users/api/bookmark',
// 		// 	type: 'POST',
// 		// 	data: data,
// 		// 	contentType: 'json'
// 		// });

// 		this.setState({ bookmarkedId: this.state.topicId });
// 	}

// 	onDownloadClick = () => {
// 		alert('user: ' + 'vinme' + ' ჩამოტვირთავს თემას: ' + this.props.topicTitle);
// 	}

// 	render (){
// 		return (
// 			<div style={{backgroundColor: 'red', position: 'fixed', borderBottom: '2px solid black'}} >
// 				<span style={{textWeight: 'bold', fondSize: '20px'}} >{this.props.topicTitle}</span>
// 				<Button onClick={this.onBookmarkClick} style={{margin: '4px'}} >მონიშვნა</Button>
// 				<Button onClick={this.onDownloadClick} style={{margin: '4px'}} >ჩამოტვირთვა</Button>
// 			</div>
// 		);
// 	}
// }