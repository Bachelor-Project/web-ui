import React, {Component} from 'react';
import HomeCarousel from '../carousel/HomeCarousel';
import TextMessage from '../textplain/TextMessage';


class Home extends Component {

	render(){
		return (
			<div>
				<HomeCarousel />
		        <TextMessage />
		        {/* <Footer /> */}
			</div>
		);
	}
}

export default Home;