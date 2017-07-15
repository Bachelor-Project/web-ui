import './App.css';

import React, { Component } from 'react';
import MyNavbar from '../navbar/MyNavbar';
import {BrowserRouter} from 'react-router-dom';
import RouterMain from '../navbar/RouterMain';

import SignInModal from '../modals/signin/SignIn';
import SignUpModal from '../modals/signup/SignUp';
import CustomUploadModal from '../modals/upload/CustomModal';
import TopicUploadModal from '../modals/upload/TopicUploader';
import TaskUploadModal from '../modals/upload/TaskUploader';
import $ from 'jquery';


const routerPathes = {
    home: '/',
    topics: '/topics',
    tasks: '/tasks'
}

// აღარ ვიყენებთ.
const topics = [
    {
        id: 1,
        name: "ელემენტარული",
    },
    {
        id: 2,
        name: "საოლიმპიადო",
    },
];


class App extends Component {

    constructor(props) {
        super(props);

        const uploaderRoleInStorage = window.localStorage.getItem("uploader");

        this.state = {
            signInOpened: false,
            signUpOpened: false,

            isUploader: true, // uploaderRoleInStorage !== null && uploaderRoleInStorage,
            isUserSignIn: true, //window.localStorage.getItem("user") !== null,
            username: window.localStorage.getItem("user"),

            topicUploadOpen: false,
            taskUploadOpen: false,

            mainTopics: [],
            levels: []
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
    topicUploadClose = () => {
        this.setState({ topicUploadOpen: false });
    }


    taskUploadOpenHandler = () => {
        this.setState({ taskUploadOpen: true });
        this.fetchTaskModalData();
    }
    // connect to server and fetch all needed data:
    fetchTaskModalData = () => {
        this.fetchMainTopics();
        $.ajax({
            url: '/bp_apigatway/api',
            type: 'GET',
            data: {
                url: "http://localhost:8080/files_data/api/levels",
                memType: "application/json"
            },
            success: (data) => {
                        this.setState({ levels: data });
                    },
            dataType: 'json',
            cache: false
        });

    }

    fetchMainTopics = () => {
        $.ajax({
            url: '/bp_apigatway/api',
            type: 'GET',
            data: {
                url: "http://localhost:8080/files_data/api/main_topics",
                memType: "application/json"
            },
            success: (data) => {
                        this.setState({ mainTopics: data });
                    },
            dataType: 'json',
            cache: false
        });
    }


    taskUploadClose = () => {
        this.setState({ taskUploadOpen: false });
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

    render() {
        return (
          <div className="App">
            <BrowserRouter>
                <div>
                    <MyNavbar   isSigned={this.state.isUserSignIn} isUploader={this.state.isUploader} 
                                signOutHandle={this.handleSignOut}
                                right_menu1="ავტორიზაცია" right_menu2="რეგისტრაცია" 
                                onSignInShow={this.onSignInOpen} onSignUpShow={this.onSignUpOpen}
                                onTopicUploadClick={this.topicUploadOpenHandler} onTaskUploadClick={this.taskUploadOpenHandler}
                                homePath={routerPathes.home} topicsPath={routerPathes.topics} tasksPath={routerPathes.tasks} />

                    <RouterMain homePath={routerPathes.home} topicsPath={routerPathes.topics} tasksPath={routerPathes.tasks} />

                    <SignInModal show={this.state.signInOpened} title="ავტორიზაცია" onHide={this.onSignInClose} onSuccessAction={this.onSuccess} />
                    <SignUpModal show={this.state.signUpOpened} title="რეგისტრაცია" onHide={this.onSignUpClose} onSuccessAction={this.onSuccess} />
                    <TopicUploadModal title="თემის ატვირთვა" show={this.state.topicUploadOpen} onHide={this.topicUploadClose} 
                                        mainTopics={this.state.mainTopics} />
                    <TaskUploadModal title="ამოცანის ატვირთვა" show={this.state.taskUploadOpen} onHide={this.taskUploadClose}
                                        levels={this.state.levels} mainTopics={this.state.mainTopics} />

                    {/* <CustomUploadModal title="თემის ატვირთვა" show={this.state.topicUploadOpen} onHide={this.topicUploadClose} body={<TopicUploadModal />} /> */}
                    {/* <CustomUploadModal title="ამოცანის ატვირთვა" show={this.state.taskUploadOpen} onHide={this.taskUploadClose} body={<TaskUploadModal />} /> */}
                </div>
            </BrowserRouter>
          </div>
        );
    }
}

export default App;
