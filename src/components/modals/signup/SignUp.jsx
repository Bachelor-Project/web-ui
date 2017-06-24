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
			usernameValidState: null,
			usernameFeedback: false,

			passwordInvalid: '',
			passwordValidState: null,
			passwordFeedback: false,
		}
	}

	onSignUpClick = () => {
		const passwordValue = $("#reg-password").val();
		const confirmPasswordValue = $("#reg-confirmPassword").val();
		if (confirmPasswordValue.length == 0) {
			this.setState({ passwordValidState: 'error', passwordFeedback: true, passwordInvalid: "ველი არ უნდა იყოს ცარიელი!" });
			return;
		}
		if (passwordValue !== confirmPasswordValue){
			this.setState({ passwordValidState: 'error', passwordFeedback: true, passwordInvalid: "პაროლები არ ემთხვევა ერთმანეთს!" });
			return;
		}
		else if (this.state.passwordFeedback) { // If was error, then turn off now.
			this.setState({ passwordValidState: null, passwordFeedback: false });
		}

		const name = $("#reg-username").val();

		var data = {};
		data.username = name;
		data.password = passwordValue;

		$.ajax({
			url: '/bp_apigatway/api/signup?url=http://localhost:8080/bp_signin/app/signup',
			method: 'post',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(data),
		})
		.then(function(response){
					this.props.onSuccessAction(response);
					this.onHideAction();
				}.bind(this) )
		.catch(function(error){
					alert(JSON.stringify(error));
					const responseAsJSON = error.responseJSON;
					if (responseAsJSON.status == 400){
						for (var i = 0; i < responseAsJSON.length; i++){
			                const jsonError = responseAsJSON[i];
			                if (jsonError.key === 'username') {
			                    this.setState({ usernameFeedback: true, usernameValidState: 'error' });
			                }
			            }
					}
				}.bind(this) );
	}

	onHideAction = () => {
		if (this.state.usernameFeedback){
			this.setState({ usernameFeedback: false, usernameValidState: null });
		}
		if (this.passwordFeedback){
			this.setState({ passwordInvalid: '', passwordFeedback: false, passwordValidState: null });
		}
		this.props.onHide();
	}


	render (){
		return (
	        <Modal show={this.props.show} onHide={this.onHideAction}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FieldGroup id="reg-username" validState={this.state.usernameValidState} 
									help="ასეთი username უკვე არსებობს." feedback={this.state.usernameFeedback}
									type="text" placeholder="username" />

						<FieldGroup id="reg-password" validState={this.state.passwordValidState}
									type="password" placeholder="პაროლი" feedback={this.state.passwordFeedback} />

						<FieldGroup id="reg-confirmPassword" validState={this.state.passwordValidState} 
									type="password" placeholder="გაიმეორეთ პაროლი" help={this.state.passwordInvalid} 
									feedback={this.state.passwordFeedback} />
						
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.onHideAction}>Close</Button>
					<Button bsStyle="success" onClick={this.onSignUpClick}>Sign up</Button>
				</Modal.Footer>
	        </Modal>
		);
	}
}

// <FieldGroupWithAddon id="reg-email" validState={this.state.emailValidState} 
// 											addonSymbol="@" help={this.state.emailHelpText} feedback={this.state.emailFeedback}
// 											type="text" />


// class PasswordComponent extends Component {

// 	render (){
// 		return (
// 			<div>
// 				<FieldGroup id="password" validState={this.props.validState}
// 							placeholder="პაროლი" feedback={false} type="password" />

// 				<FieldGroup id="confirmPassword" validState={this.props.validState}
// 							placeholder="გაიმეორეთ პაროლი" help={this.props.help} feedback={true} type="password" />
// 			</div>
// 		);
// 	}
// }