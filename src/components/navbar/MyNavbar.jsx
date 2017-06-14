import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {Router, Route, hashHistory } from 'react-router';
import SignInModal from '../modals/signin/SignIn';
import {Link} from 'react-router-dom';
import RouterMain from '../navbar/RouterMain';


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
    }

    onTopicsClick() {
    }

    onInfoClick() {
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
            <div>
                
                    <Navbar >
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">{this.props.brand}</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                        <Nav>
                            
                            <NavItem componentClass="span" eventKey={1} onClick={this.onHomeClick} active ><Glyphicon glyph="home" />
                                <LinkComponent to={this.props.homePath} />
                            </NavItem>
                            <NavItem componentClass="span" eventKey={2} onClick={this.onTasksClick} ><Glyphicon glyph="pencil" />  
                                <LinkComponent to={this.props.topicsPath} label="თემები" />
                            </NavItem>
                            <NavItem componentClass="span" eventKey={3}  onClick={this.onTopicsClick} ><Glyphicon glyph="book" />
                                <LinkComponent to={this.props.tasksPath} label="ამოცანები"/>
                            </NavItem>
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
                    <RouterMain topicsPath={this.props.topicsPath} tasksPath={this.props.tasksPath} />
            </div>
            )
  };
}

export default MyNavbar;

function LinkComponent(props) {
    return (<Link to={props.to}>{props.label}</Link>);
}