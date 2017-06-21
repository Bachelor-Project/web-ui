import React, {Component} from 'react';
import HomeCarousel from './HomeCarousel';
import TextMessage from '../textplain/TextMessage';


class Home extends Component {

	render(){
		return (
			<div>
				<HomeCarousel style={{maxWidth: '85%', margin: '5% auto'}} />
		        <TextMessage />
		        {/* <Footer /> */}
			</div>
		);
	}
}

export default Home;