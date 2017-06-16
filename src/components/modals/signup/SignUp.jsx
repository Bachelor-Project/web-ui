import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {FieldGroup, FieldGroupWithAddon} from '../../generals/helpers/Components';
import $ from 'jquery';


const ob = {
	username: "bla",
	password: "blu",
	email: "rame@ge.ge"
}


export default class SignUpModal extends Component {

	constructor(props){
		super(props);

		this.state = {
			usernameVlidState: 'default',
			usernameHelpText: null,
			usernameFeedback: false,

			emailValidState: 'default',
			emailHelpText: null,
			emailFeedback: false
		}
	}

	onSignUpClick = () => {
		$.ajax({
			url: '/bp-SignIn/app/signup',
			method: 'post',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(ob)
		})
		.then(function(response){
			console.log(response);
		})
		.catch(function(error){
			alert("error");
		});
	}

	onSuccess = (response) => {
		console.log(response);
		this.props.onHide();
		// this.props.onSuccessAction(user);
	}

	onError = (error) => {
		alert("error");
	}

	render (){
		return (
	        <Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FieldGroup id="reg-username" validState={this.state.usernameVlidState} 
									help={this.state.usernameHelpText} feedback={this.state.usernameFeedback}
									type="text" placeholder="username" />
						<PasswordComponent />
						<FieldGroupWithAddon id="reg-email" validState={this.state.emailValidState} 
											addonSymbol="@" help={this.state.emailHelpText} feedback={this.state.emailFeedback}
											type="text" />
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
					<Button bsStyle="success" onClick={this.onSignUpClick}>Sign up</Button>
				</Modal.Footer>
	        </Modal>
		);
	}
}


class PasswordComponent extends Component {

	render (){
		return (
			<div>
				<FieldGroup id="password" validState={this.props.validState}
							placeholder="პაროლი" feedback={false} type="password" />

				<FieldGroup id="confirmPassword" validState={this.props.validState}
							placeholder="გაიმეორეთ პაროლი" help={this.props.help} feedback={true} type="password" />
			</div>
		);
	}
}