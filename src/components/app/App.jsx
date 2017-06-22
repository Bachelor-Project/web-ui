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
    }


    topicUploadOpenHandler = () => {
        this.setState({ topicUploadOpen: true });
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
        $.ajax({
            url: '/task/api/main_topics',
            type: 'GET',
            success: (data) => {
                        this.setState({ mainTopics: data });
                    },
            dataType: 'json',
            cache: false
        });

        $.ajax({
            url: '/task/api/levels',
            type: 'GET',
            success: (data) => {
                        this.setState({ levels: data });
                    },
            dataType: 'json',
            cache: false
        });

    }


    taskUploadClose = () => {
        this.setState({ taskUploadOpen: false });
    }

    onSuccess = (userToken) => {
        window.localStorage.setItem("token", userToken);
        console.log(window.localStorage.getItem("token"));

        const userDataStr = atob(userToken.split('.')[1]);
        const userDataJson = JSON.parse(userDataStr);
        window.localStorage.setItem("user", userDataJson.username);
        window.localStorage.setItem("id", userDataJson.id);

        var uploader = false;
        for (var i = 0; i < userDataJson.roles.length; i++){
            if (userDataJson.roles[i] === 'uploader') {
                uploader = true;
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
                    <CustomUploadModal title="თემის ატვირთვა" show={this.state.topicUploadOpen} onHide={this.topicUploadClose} body={<TopicUploadModal />} />
                    <TaskUploadModal title="ამოცანის ატვირთვა" show={this.state.taskUploadOpen} onHide={this.taskUploadClose}
                                        levels={this.state.levels} mainTopics={this.state.mainTopics} />

                    {/* <CustomUploadModal title="ამოცანის ატვირთვა" show={this.state.taskUploadOpen} onHide={this.taskUploadClose} body={<TaskUploadModal />} /> */}
                </div>
            </BrowserRouter>
          </div>
        );
    }
}

export default App;
