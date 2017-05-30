<div className="static-modal">
</div>

<FormGroup controlId="formValidationSuccess1" validationState={this.props.validState} >
						<ControlLabel>username</ControlLabel>
						<FormControl type="text" disabled/>
						<HelpBlock>{helpText}</HelpBlock>
				    </FormGroup>

				    <SignInModal    title={this.state.title} isOpen={this.state.opened} 
                                        onHide={this.onSignInClose} />