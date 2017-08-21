import './App.css';

import React, { Component } from 'react';
import MyNavbar from '../navbar/MyNavbar';
import {BrowserRouter} from 'react-router-dom';
import RouterMain from '../navbar/RouterMain';

import SignInModal from '../modals/signin/SignIn';
import SignUpModal from '../modals/signup/SignUp';
import MainTopicUploadModal from '../modals/upload/MainTopicUploader';
import TopicUploadModal from '../modals/upload/TopicUploader';
import TaskUploadModal from '../modals/upload/TaskUploader';
import MainTopicUpdateModal from '../modals/modification/MainTopicUpdater';
import MainTopicRemoveModal from '../modals/modification/MainTopicRemover';
import TopicRemoveModal from '../modals/modification/TopicRemover';
import TaskRemoveModal from '../modals/modification/TaskRemover';
import $ from 'jquery';


const routerPathes = {
    home: '/',
    topics: '/topics',
    tasks: '/tasks'
}


class App extends Component {

    constructor(props) {
        super(props);

        const uploaderRoleInStorage = window.localStorage.getItem("uploader");

        this.state = {
            signInOpened: false,
            signUpOpened: false,

            isUploader: uploaderRoleInStorage !== null && uploaderRoleInStorage,
            isUserSignIn: window.localStorage.getItem("user") !== null,
            username: window.localStorage.getItem("user"),

            mainTopicUploadOpen: false,
            mainTopicUpdateOpen: false,
            mainTopicRemoveOpen: false,
            topicRemoveOpen: false,
            taskRemoveOpen: false,
            topicUploadOpen: false,
            taskUploadOpen: false,

            mainTopics: [],
            levels: [],
            topics: [],
            tasks: []
        }
    }

    onSignInOpen = () => {
        this.setState({signInOpened: true});
    }

    onSignInClose = () => {
        this.setState({signInOpened: false});
    }

    onSignUpOpen = () => {
        this.setState({signUpOpened: true});
    }

    onSignUpClose = () => {
         this.setState({signUpOpened: false});
    }

    handleSignOut = () => {
        this.setState({ isUserSignIn: false });

        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("uploader");
    }


    topicUploadOpenHandler = () => {
        this.setState({ topicUploadOpen: true });
        this.fetchMainTopics();
    }


    taskUploadOpenHandler = () => {
        this.setState({ taskUploadOpen: true });
        this.fetchTaskModalData();
    }
    // connect to server and fetch all needed data:
    fetchTaskModalData = () => {
        this.fetchMainTopics();
        $.ajax({
            // url: '/files_data/api/levels',
            url: '/levels',
            type: 'GET',
            success: (data) => {
                    var levelsData = data.map((elem) => {
                                        return {id: elem.id, descrip: elem.descrip};
                                    }); 
                        this.setState({ levels: levelsData });
                    },
            dataType: 'json',
            cache: false
        });
    }

    fetchMainTopics = () => {
        $.ajax({
            // url: '/files_data/api/main_topics',
            url: '/main_topics',
            type: 'GET',
            success: (data) => {
                        this.setState({ mainTopics: data });
                    },
            error: (error) => {
                        alert("error");
                    },
            dataType: 'json',
            cache: false
        });
    }

    topicUploadClose = () => {
        this.setState({ topicUploadOpen: false });
    }

    taskUploadClose = () => {
        this.setState({ taskUploadOpen: false });
    }

    mainTopicUpdateClose = () => {
        this.setState({ mainTopicUpdateOpen: false });
    }

    mainTopicUploadClose = () => {
        this.setState({ mainTopicUploadOpen: false });
    }

    mainTopicRemoveClose = () => {
        this.setState({ mainTopicRemoveOpen: false });
    }

    topicRemoveClose = () => {
        this.setState({ topicRemoveOpen: false });
    }

    taskRemoveClose = () => {
        this.setState({ taskRemoveOpen: false });
    }

    decodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }


    onSuccess = (userDataJson, token) => {

        window.localStorage.setItem("token", token);

        // const userDataStr = this.decodeUnicode(userToken.split('.')[1]);
        // const userDataJson = JSON.parse(userDataStr);
        window.localStorage.setItem("user", userDataJson.username);
        window.localStorage.setItem("id", userDataJson.id);

        var uploader = false;
        for (var i = 0; i < userDataJson.roles.length; i++){
            if (userDataJson.roles[i] === 'uploader') {
                uploader = true;
                 window.localStorage.setItem("uploader", true);
            }
        }

        // // {"roles":["user"],"iss":"issuer","id":3,"exp":1500735644,"username":"as"}
        this.setState({ isUserSignIn: true, isUploader: uploader });
    }

    onMainTopicAdd = () => {
        this.setState({mainTopicUploadOpen: true});
    }

    onMainTopicUpdate = () => {
        this.setState({mainTopicUpdateOpen: true});
        this.fetchMainTopics();
    }

    onMainTopicDelete = () => {
        this.setState({ mainTopicRemoveOpen: true });
        this.fetchMainTopics();
    }

    onTopicDelete = () => {
        this.setState({ topicRemoveOpen: true });
        this.fetchAllTopics();
    }

    onTaskDelete = () => {
        this.setState({ taskRemoveOpen: true });
        this.fetchAllTasks();
    }

    fetchAllTopics = () => {
        $.ajax({
            // url: '/files_data/api/all_topics',
            url: '/all_topics',
            type: 'GET',
            success: (data) => {
                        // console.log(JSON.stringify(data));
                        var topicsData = data.map((elem) => {
                            return {id: elem.id, name: elem.name+"."+elem.fielExt, priority: elem.priority};
                        });
                        this.setState({ topics: topicsData });
                    },
            dataType: 'json',
            cache: false
        });
    }

    fetchAllTasks = () => {
            $.ajax({
                // url: '/files_data/api/all_tasks',
                url: '/all_tasks',
                type: 'GET',
                success: (data) => {
                            // console.log(JSON.stringify(data));

                            var tasksData = data.map((elem) => {
                                return {id: elem.id, name: elem.name, timeLimit: elem.timeLimit, memLImit: elem.memeoryLimit};
                            });
                            this.setState({ tasks: tasksData });
                        },
                dataType: 'json',
                cache: false
            });
        }

    render() {
        return (
          <div className="App">
            <BrowserRouter>
                <div>
                    <MyNavbar   isSigned={this.state.isUserSignIn} isUploader={this.state.isUploader} 
                                signOutHandle={this.handleSignOut}
                                right_menu1="ავტორიზაცია" right_menu2="რეგისტრაცია" 
                                onSignInShow={this.onSignInOpen} onSignUpShow={this.onSignUpOpen}
                                onTopicUploadClick={this.topicUploadOpenHandler} 
                                onTaskUploadClick={this.taskUploadOpenHandler}
                                onMainTopicAddClick={this.onMainTopicAdd}
                                onMainTopicUpdateClick={this.onMainTopicUpdate}
                                onMainTopicDeleteClick={this.onMainTopicDelete}
                                onTopicDeleteClick={this.onTopicDelete}
                                onTaskDeleteClick={this.onTaskDelete}
                                homePath={routerPathes.home} topicsPath={routerPathes.topics} tasksPath={routerPathes.tasks} />

                    <RouterMain homePath={routerPathes.home} topicsPath={routerPathes.topics} tasksPath={routerPathes.tasks} />

                    <SignInModal show={this.state.signInOpened} title="ავტორიზაცია" onHide={this.onSignInClose} onSuccessAction={this.onSuccess} />
                    <SignUpModal show={this.state.signUpOpened} title="რეგისტრაცია" onHide={this.onSignUpClose} onSuccessAction={this.onSuccess} />
                    <TopicUploadModal title="თემის ატვირთვა" show={this.state.topicUploadOpen} onHide={this.topicUploadClose} 
                                        mainTopics={this.state.mainTopics} />
                    <TaskUploadModal title="ამოცანის ატვირთვა" show={this.state.taskUploadOpen} onHide={this.taskUploadClose}
                                        levels={this.state.levels} mainTopics={this.state.mainTopics} />

                    <MainTopicUploadModal title="მთავარი თემის ატვირთვა" show={this.state.mainTopicUploadOpen}
                                        onHide={this.mainTopicUploadClose} />
                    <MainTopicUpdateModal title="მთავარი თემის ცვლილება" show={this.state.mainTopicUpdateOpen}
                                        onHide={this.mainTopicUpdateClose} mainTopics={this.state.mainTopics} />
                    <MainTopicRemoveModal title="მთავარი თემის წაშლა" show={this.state.mainTopicRemoveOpen}
                                        onHide={this.mainTopicRemoveClose} mainTopics={this.state.mainTopics} />
                    <TopicRemoveModal title="თეორიის წაშლა" show={this.state.topicRemoveOpen}
                                        onHide={this.topicRemoveClose} topics={this.state.topics} />
                    <TaskRemoveModal title="ამოცანის წაშლა" show={this.state.taskRemoveOpen}
                                        onHide={this.taskRemoveClose} tasks={this.state.tasks} />
                </div>
            </BrowserRouter>
          </div>
        );
    }
}

export default App;
