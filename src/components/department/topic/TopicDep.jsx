import React, {Component} from 'react';
import { nameOfAnimation as Menu } from 'react-burger-menu'
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';



export default class TopicDep extends Component {

	constructor(props) {
		super(props);
	}

	render (){
		return (
			<div>
				<Menu>
			        <a id="home" className="menu-item" href="/">Home</a>
			        <a id="about" className="menu-item" href="/about">About</a>
			        <a id="contact" className="menu-item" href="/contact">Contact</a>
			        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
		      	</Menu>
				<Header />
				<Content />
			</div>
		);
	}
}