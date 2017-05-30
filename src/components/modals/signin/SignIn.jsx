import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

import {Form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';


class SignInForm extends Component {

    render (){
        const usernameTextHelp = (this.props.showUsernameHelpText) ? this.props.usernameHelpText : '';
        const passwordTextHelp = (this.props.showPasswordHelpText) ? this.props.usernameHelpText : '';

        return (
                <Form>
                    <FormGroup controlId="nameInput" validationState={this.props.usernameValidState} >
                        <ControlLabel>username</ControlLabel>
                        <FormControl type="text" />
                        <FormControl.Feedback />
                        <HelpBlock>{usernameTextHelp}</HelpBlock>
                    </FormGroup>

                    <FormGroup controlId="passwordInput" validationState={this.props.passwordValidState} >
                        <ControlLabel>პაროლი</ControlLabel>
                        <FormControl type="password"/>
                        <FormControl.Feedback />
                        <HelpBlock>{passwordTextHelp}</HelpBlock>
                    </FormGroup>
                </Form>
        );
    }
}


class SignInModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showUsernameHelpText: false,
            showpasswordHelpText: false,
            usernameValidationState: "default",
            passwordValidationState: "default"
        }
    }

    render (){
        return (
                <Modal show={this.props.isOpen} onHide={this.props.onClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <SignInForm     showUsernameHelpText={this.state.showUsernameHelpText} 
                                        showPasswordHelpText={this.state.showPasswordHelpText}
                                        usernameHelpText="ეს username უკვე რეგისტრირებულია."
                                        passwordHelpText="პაროლი არასწორია"
                                        usernameValidState={this.state.usernameValidationState}
                                        passwordValidState={this.state.passwordValidationState} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.onClose}>Close</Button>
                        <Button bsStyle="primary">sign in</Button>
                    </Modal.Footer>

                </Modal>
        );
    }
}

export default SignInModal;