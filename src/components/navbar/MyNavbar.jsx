import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {LinkComponent} from '../generals/helpers/Components';


class MyNavbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeKey: 1,
        }

    }


    onSelectChange = (key) => {
        var newActiveKey = key;
        if ((key * 10)%10 !== 0){
            newActiveKey = Math.floor(key);
        }
        this.setState({ activeKey: newActiveKey });
    }

    onSuccess = (user) => {
        alert(user.username);
    }

    render(){

        return (
                <Navbar onSelect={this.onSelectChange} staticTop={true} fixedTop >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">{this.props.brand}</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={this.onHomeClick} active={1 === this.state.activeKey} >
                            <LinkComponent to={this.props.homePath} label={<Glyphicon glyph="home" />} />
                        </NavItem>

                        <NavDropdown eventKey={2} title="თეორია და პრაქტიკა" id="main-topics-tasks" active={2 === this.state.activeKey}>
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

                        {this.props.isSigned && this.props.isUploader &&
                            <NavDropdown eventKey={3} title="ატვირთვა" id="main-upload" active={3 === this.state.activeKey}>
                                <MenuItem eventKey={3.1} >
                                    <span onClick={this.props.onTopicUploadClick} >
                                        <Glyphicon glyph="book" />
                                        {'  '}
                                        თემა
                                    </span>
                                </MenuItem>
                                <MenuItem eventKey={3.1} >
                                    <span onClick={this.props.onTaskUploadClick} >
                                        <Glyphicon glyph="pencil" />
                                        {'  '}
                                        ამოცანა
                                    </span>
                                </MenuItem>
                            </NavDropdown>
                        }
                    </Nav>
                    <Nav pullRight>
                        {!this.props.isSigned && <NavItem eventKey={4} onClick={this.props.onSignInShow}>
                                            <i className="fa fa-sign-in" />  {this.props.right_menu1}
                                        </NavItem>}
                        {!this.props.isSigned && <NavItem eventKey={5} onClick={this.props.onSignUpShow}>
                                        <Glyphicon glyph="user" />  {this.props.right_menu2}
                                    </NavItem>}
                        {this.props.isSigned && <UserAccount title={this.props.username} onSignOutClick={this.props.signOutHandle} />}

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