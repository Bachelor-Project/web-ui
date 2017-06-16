import React from 'react';
import {Modal} from 'react-bootstrap';
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';


// Helper FieldGroup components:
export function FieldGroup ({id, validState, label, help, feedback, ...props}) {
    return (
        <FormGroup controlId={id} validationState={validState}>
            {label && <ControlLabel>{label}</ControlLabel>}
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
            {feedback && <FormControl.Feedback />}
        </FormGroup>
    );
}

export function FieldGroupWithAddon ({id, validState, addonSymbol, help, feedback, ...props}) {
    return (
        <FormGroup controlId={id} validationState={validState}>
            <InputGroup>
                <InputGroup.Addon>{addonSymbol}</InputGroup.Addon>
                <FormControl {...props} />
            </InputGroup>
            {help && <HelpBlock>{help}</HelpBlock>}
            {feedback && <FormControl.Feedback />}
        </FormGroup>
    );
}


export function LinkComponent(props) {
    return (<Link to={props.to}>{props.label}</Link>);
}