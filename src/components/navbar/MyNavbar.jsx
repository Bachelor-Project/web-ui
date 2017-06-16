import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {Router, Route, hashHistory } from 'react-router';
import SignInModal from '../modals/signin/SignIn';
import SignUpModal from '../modals/signup/SignUp';
import RouterMain from '../navbar/RouterMain';
import {Link} from 'react-router-dom';
import {LinkComponent} from '../generals/helpers/Components';


class MyNavbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            signInOpened: false,
            signUpOpened: false,

            isUserSignIn: false,
            username: '',

            activeKey: 1
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

    onSelectChange = (key) => {
        var newActiveKey = key;
        if ((key * 10)%10 != 0){
            newActiveKey = Math.floor(key);
        }
        alert(newActiveKey);
        this.setState({ activeKey: newActiveKey });
    }

    onSuccess = (user) => {
        alert(user.username);
    }

    render(){
        const isSigned = this.state.isUserSignIn;

        return (
                <Navbar onSelect={this.onSelectChange} >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">{this.props.brand}</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={this.onHomeClick} active={1 == this.state.activeKey} >
                            <LinkComponent to={this.props.homePath} label={<Glyphicon glyph="home" />} />
                        </NavItem>
                        <NavDropdown eventKey={2} title="თეორია და პრაქტიკა" id="main-topics-tasks" active={2 == this.state.activeKey}>
                            <MenuItem eventKey={2.1} >
                                <Glyphicon glyph="book" />
                                {'  '}
                                <LinkComponent to={this.props.topicsPath} label="თემები" />
                            </MenuItem>
                            <MenuItem eventKey={2.2}>
                                <Glyphicon glyph="pencil" />
                                {'  '}
                                <LinkComponent to={this.props.tasksPath} label="ამოცანები"/>
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        {!isSigned && <NavItem eventKey={3} onClick={this.onSignInOpen}>
                                            <i className="fa fa-sign-in" />  {this.props.right_menu1}
                                        </NavItem>}
                        {!isSigned && <NavItem eventKey={4} onClick={this.onSignUpOpen}>
                                        <Glyphicon glyph="user" />  {this.props.right_menu2}
                                    </NavItem>}
                        {isSigned && <UserAccount title={this.state.username} onSignOutClick={this.handleSignOut} />}

                        <SignInModal show={this.state.signInOpened} title="ავტორიზაცია" onHide={this.onSignInClose} onSuccessAction={this.onSuccess} />
                        <SignUpModal show={this.state.signUpOpened} title="რეგისტრაცია" onHide={this.onSignUpClose} onSuccessAction={this.onSuccess} />
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
  };
}

export default MyNavbar;



function UserAccount(props) {
    return (
        <NavDropdown eventKey={2} title={props.title} id="user-account">
            <MenuItem eventKey={2.1} onClick={props.onSignOutClick} >
                გამოსვლა
            </MenuItem>
        </NavDropdown>
    );
}