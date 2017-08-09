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
        	cursor: null
        };
        this.onToggle = this.onToggle.bind(this);
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
            url: '/files_data/api/name_main_topic',
            type: 'GET',
            data: {
                id: mainTopicID,
            },
            success: (data) => {
                        mainTopicTreeData.name = data;
                    },
            dataType: 'text',
            cache: false
        });
	}

	fetchMainTopicTopics = (mainTopicID) => {
		$.ajax({
            url: '/files_data/api/priorities',
            type: 'GET',
            data: {
                main_topic: mainTopicID,
            },
            success: (data) => {
                        var prioritiesData = data.map((elem) => {
                                                return {'id': elem.id, 'name': <a href={"/files_data/api/pdf?name="+elem.descrip+".pdf"}  target="pdf_frame" >
                                                									{elem.descrip}</a>};
                                            });
                        mainTopicTreeData.children = prioritiesData;
                    },
            dataType: 'json',
            cache: false
        });
	}

	onToggle = (node, toggled) => {
        if(this.state.cursor){
        	var prevNode = this.state.cursor;
        	prevNode.active = false;
        }
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node, topicTitle: node.name, topicId: node.id});

    }

    // Change task from left menu:
	handleTopicChange = (node) => {
		this.setState({ taskId: node.id, taskContent: 'task content of ' + node.name });
	}

	render (){
		const isSigned = window.localStorage.getItem("token") !== null;

		return (
			<div id="outer-container" >
				<ToggleMenu treeData={mainTopicTreeData} nodeChangeHandler={this.handleTopicChange} />

				<main id="page-wrap" > 
					<div style={{borderTop: '2px solid black', marginTop: '4.5%'}} >
						<frameset cols="50%" >
							<frame src="" name="pdf_frame" />
						</frameset>
					</div>
				</main>
			</div>
		);
	}
}

export default TopicDep;