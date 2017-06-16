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
            help: null,
            isInputIncorrect: false
        }
    }

    onSignInClick = () => {
        this.setState({ isInputIncorrect: true });
        $.ajax({
            url: '/bp-SignIn/app/',
            method: 'post',
            headers: {'Authentication': 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJ1c2VyIl0sImlzcyI6Imlzc3VlciIsImlkIjowLCJleHAiOjE0OTk3NzYwNDUsInVzZXJuYW1lIjoiYmxhIn0.__ZbT9z4_6qNr-8o4bNIyfzN_-T86tdwy-p7gRmnGyU'},
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(signIntOb)
        })
        .then(function(response){
            window.localStorage.setItem("token", response);
            console.log(window.localStorage.getItem("token"));
        })
        .catch(function(error){
            alert("error");
        });
    }

    onSuccess = (response) => {
        window.localStorage.setItem("token", response);
        console.log(window.localStorage.getItem("token"));
        this.props.onHide();
        // this.props.onSuccessAction(user);
    }

    onError = (error) => {
        alert("error");
    }

    render () {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FieldGroup id="signInName" type="text" placeholder="username" />
                        <FieldGroup id="signInPassword" type="password" placeholder="პაროლი" />
                        <IncorrectInputs incorrect={this.state.isInputIncorrect} />
                        <FormControl.Static>დაგავიწყდათ პაროლი?</FormControl.Static>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button onClick={this.onSignInClick}>Sign in</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class IncorrectInputs extends Component {

    render (){
        return (
            <FormGroup validationState="error" >
                        {this.props.incorrect && <FormControl.Static>username ან პაროლი არასწორია</FormControl.Static>}
            </FormGroup>
        );
    }
}