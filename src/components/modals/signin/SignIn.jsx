import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {FormControl, FormGroup, Button} from 'react-bootstrap';
import {FieldGroup} from '../../generals/helpers/Components';
import $ from 'jquery';



/* ---------------- Sign in modal ---------------- */

const signIntOb = {
    username: 'bla',
    password: 'blu'
}

export default class SignInModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isInputIncorrect: false
        }
    }

    onSignInClick = () => {
        var requestJson = {}
        requestJson.username = $('#signInName').val();
        requestJson.password = $('#signInPassword').val();

        $.ajax({
            url: '/bp-SignIn/app/signin',
            method: 'post',
            // headers: {'Authentication': window.localStorage.getItem("token")}, // to "log out"-ti gaketebulia token agar iqneba
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(requestJson)
        })
        .then(function(response){
                this.props.onSuccessAction(response);
                this.onHideAction();
            }.bind(this))
        .catch(function(error){
                if (error.status == 400){
                    this.setState({ isInputIncorrect: true });
                }
            }.bind(this));
    }

    onHideAction = () => {
        if (this.state.isInputIncorrect){
            this.setState({ isInputIncorrect: false });
        }

        this.props.onHide();
    }

    render () {
        return (
            <Modal show={this.props.show} onHide={this.onHideAction}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FieldGroup id="signInName" type="text" placeholder="username" />
                        <FieldGroup id="signInPassword" type="password" placeholder="პაროლი" />
                        <IncorrectInputs incorrect={this.state.isInputIncorrect} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onHideAction}>Close</Button>
                    <Button bsStyle="primary" onClick={this.onSignInClick}>Sign in</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class IncorrectInputs extends Component {

    render (){
        return (
            <FormGroup validationState="error" style={{color: 'red'}} >
                        {this.props.incorrect && <FormControl.Static style={{fontSize: '16px'}} >username ან პაროლი არასწორია</FormControl.Static>}
            </FormGroup>
        );
    }
}