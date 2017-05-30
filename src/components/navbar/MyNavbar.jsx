import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {Router, Route, hashHistory } from 'react-router';
import SignInModal from '../modals/signin/SignIn';


class MyNavbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            opened: false
        }

        this.onHomeClick = this.onHomeClick.bind(this);
        this.onTasksClick = this.onTasksClick.bind(this);
        this.onTopicsClick = this.onTopicsClick.bind(this);
        this.onSignInOpen = this.onSignInOpen.bind(this);
        this.onSignInClose = this.onSignInClose.bind(this);
        this.onSignUpOpen = this.onSignUpOpen.bind(this);
        this.onSignUpClose = this.onSignUpClose.bind(this);
    }

    onHomeClick() {
        alert("Home");
    }

    onTasksClick() {
        alert("hashHistory.push(page 1);");
        hashHistory.push("page 1");
    }

    onTopicsClick() {
        alert("hashHistory.push(page 2);");
        hashHistory.push("page 2");
    }

    onInfoClick() {
        alert("hashHistory.push(page 2);");
        hashHistory.push("page 2");
    }

    onSignInOpen() {
        this.setState({opened: true});
    }

    onSignInClose() {
        this.setState({opened: false});
    }

    onSignUpOpen(){

    }

    onSignUpClose(){

    }

    render(){

        return (
                <Navbar >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">{this.props.brand}</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#" onClick={this.onHomeClick} active ><Glyphicon glyph="home" />   {this.props.home}</NavItem>
                        <NavItem eventKey={2} href="#" onClick={this.onTasksClick} ><Glyphicon glyph="pencil" />  {this.props.menu1}</NavItem>
                        <NavItem eventKey={3} href="#" onClick={this.onTopicsClick} ><Glyphicon glyph="book" />  {this.props.menu2}</NavItem>
                        <NavItem eventKey={4} href="#" onClick={this.onInfoClick} ><Glyphicon glyph="info-sign" />   {this.props.info}</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={5} href="#" onClick={this.onSignInOpen}>
                            <i className="fa fa-sign-in" />  {this.props.right_menu1}
                        </NavItem>
                        <NavItem eventKey={6} href="#" onClick={this.onSignUpOpen}>
                            <Glyphicon glyph="user" />  {this.props.right_menu2}
                        </NavItem>

                        <SignInModal isOpen={this.state.opened} title="title" onClose={this.onSignInClose} />
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
  };
}

export default MyNavbar;