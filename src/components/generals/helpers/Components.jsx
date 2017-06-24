import './toggleMenuStyle.css';

import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {elastic as Menu} from 'react-burger-menu';
import {Treebeard} from 'react-treebeard';


// Helper FieldGroup components:
export function FieldGroup ({id, validState, label, help, feedback, ...props}) {
    return (
        <FormGroup validationState={validState}>
            {label && <ControlLabel>{label}</ControlLabel>}
            <FormControl id={id} {...props} />
            {feedback && <HelpBlock>{help}</HelpBlock>}
            {feedback && <FormControl.Feedback />}
        </FormGroup>
    );
}


export function FieldGroupWithAddon ({id, validState, addonSymbol, help, feedback, inputID, ...props}) {
    return (
        <FormGroup controlId={id} validationState={validState}>
            <InputGroup>
                <InputGroup.Addon>{addonSymbol}</InputGroup.Addon>
                <FormControl id={inputID} {...props} />
            </InputGroup>
            {help && <HelpBlock>{help}</HelpBlock>}
            {feedback && <FormControl.Feedback />}
        </FormGroup>
    );
}


export function LinkComponent(props) {
    return (<Link to={props.to}>{props.label}</Link>);
}


export class Selector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        }
    }

    
    onSearchChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }


    render() {
        const lowerCaseSearchVal = this.state.searchValue.toLowerCase();
        const options = this.props.selectorData.map( function(elem, index){
            if (lowerCaseSearchVal && !elem.toLowerCase().includes(lowerCaseSearchVal)) return null;
            var reactKey = (typeof obj === "undefined") ? index : elem.id;
            return (<option key={reactKey} value={elem.id}>{elem.descrip}</option>);
        });

        return (
            <div>
                <FormGroup controlId={this.props.controlId} >
                    <ControlLabel>{this.props.title}</ControlLabel>
                    {this.props.searchable && <FormControl type="text" placeholder="ძებნა" onChange={this.onSearchChange} />}
                    <FormControl componentClass="select" multiple={this.props.isMultiple} >
                        {options}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
}


const menuStyle = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '12px',
        zIndex: '2000'
    }
}

export class ToggleMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    onToggle = (node, toggled) => {
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }

        this.setState({ cursor: node });
        if (node.id){
            this.props.nodeChangeHandler(node);
        }
    }

    render() {
        return (
            <Menu width={ '16%' } styles={menuStyle} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
                    <Treebeard 
                        data={this.props.treeData}
                        onToggle={this.onToggle}
                    />
            </Menu>
        );
    }
}
