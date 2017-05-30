import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import { Router, Route, hashHistory } from 'react-router'


class MyNavbar extends Component {

    constructor(props) {
        super(props);

        this.onHomeClick = this.onHomeClick.bind(this);
        this.onTag1Click = this.onTag1Click.bind(this);
        this.onTag2Click = this.onTag2Click.bind(this);
    }

    onHomeClick() {
        alert("Home");
    }

    onTag1Click() {
        alert("hashHistory.push(page 1);");
        hashHistory.push("page 1");
    }

    onTag2Click() {
        alert("hashHistory.push(page 2);");
        hashHistory.push("page 2");
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
                        <NavItem eventKey={2} href="#" onClick={this.onTag1Click} ><Glyphicon glyph="pencil" />  {this.props.tag1}</NavItem>
                        <NavItem eventKey={3} href="#" onClick={this.onTag2Click} ><Glyphicon glyph="book" />  {this.props.tag2}</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={4} href="#"><Glyphicon glyph="user" />    {this.props.righttag1} / {this.props.righttag2}</NavItem>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
  };
}

export default MyNavbar;