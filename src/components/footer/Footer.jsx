import React, { Component } from 'react';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import './style.css';

class Footer extends Component {

	render (){
		return (
			<section id="footer" >
				<Grid>
				    <Row className="show-grid">
						<Col sm={6} md={4} className="pull-left">
							<h4>საინტერესო ლინკები</h4>
							<p><a href="http://codeforces.com/" target="_blank">codeforces.com</a></p>
							<p><a href="http://acm.timus.ru/" target="_blank">acm.timus.ru</a></p>
							<p><a href="https://www.coursera.org/" target="_blank">coursera.org</a></p>
						</Col>
						<Col sm={6} md={4} className="pull-right">
							<h4>კონტაქტი</h4>
							<div className="contact-info">
								<Glyphicon glyph="map-marker">თბილისი - საქართველო</Glyphicon><br/>
								<Glyphicon glyph="envelope"> datoqobu@gmail.com</Glyphicon>
							</div>
						</Col>
				    </Row>
			  	</Grid>
			  </section>
		)
	};
}


export default Footer;