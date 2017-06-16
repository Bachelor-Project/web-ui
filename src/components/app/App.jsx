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


const routerPathes = {
    home: '/',
    topics: '/topics',
    tasks: '/tasks'
}


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signInOpened: false,
            signUpOpened: false,

            isUploader: true,
            isUserSignIn: true,
            username: '',

            topicUploadOpen: false,
            taskUploadOpen: false
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
    }


    topicUploadOpenHandler = () => {
        this.setState({ topicUploadOpen: true });
    }
    topicUploadClose = () => {
        this.setState({ topicUploadOpen: false });
    }

    taskUploadOpenHandler = () => {
        this.setState({ taskUploadOpen: true });
    }
    taskUploadClose = () => {
        this.setState({ taskUploadOpen: false });
    }


    onSuccess = (user) => {
        alert(user.username);
    }

    render() {
        return (
          <div className="App">
            <BrowserRouter>
                <div>
                    <MyNavbar   isSigned={this.state.isUserSignIn} isUploader={this.state.isUploader} 
                                signOutHandle={this.signOutHandle} username={this.state.username}
                                right_menu1="ავტორიზაცია" right_menu2="რეგისტრაცია" 
                                onSignInShow={this.onSignInOpen} onSignUpShow={this.onSignUpOpen}
                                onTopicUploadClick={this.topicUploadOpenHandler} onTaskUploadClick={this.taskUploadOpenHandler}
                                homePath={routerPathes.home} topicsPath={routerPathes.topics} tasksPath={routerPathes.tasks} />

                    <RouterMain homePath={routerPathes.home} topicsPath={routerPathes.topics} tasksPath={routerPathes.tasks} />

                    <SignInModal show={this.state.signInOpened} title="ავტორიზაცია" onHide={this.onSignInClose} onSuccessAction={this.onSuccess} />
                    <SignUpModal show={this.state.signUpOpened} title="რეგისტრაცია" onHide={this.onSignUpClose} onSuccessAction={this.onSuccess} />
                    <CustomUploadModal title="თემის ატვირთვა" show={this.state.topicUploadOpen} onHide={this.topicUploadClose} body={<TopicUploadModal />} />
                    <TaskUploadModal title="ამოცანის ატვირთვა" show={this.state.taskUploadOpen} onHide={this.taskUploadClose} />
                    {/* <CustomUploadModal title="ამოცანის ატვირთვა" show={this.state.taskUploadOpen} onHide={this.taskUploadClose} body={<TaskUploadModal />} /> */}
                </div>
            </BrowserRouter>
          </div>
        );
    }
}

export default App;
