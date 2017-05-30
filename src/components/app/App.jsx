import './App.css';

import React, { Component } from 'react';
import MyNavbar from '../navbar/MyNavbar';
import HomeCarousel from '../carousel/HomeCarousel';
import TextMessage from '../textplain/TextMessage';
import Footer from '../footer/Footer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <MyNavbar brand="ალგორითმი" home="მთავარი" menu1="ამოცანები" menu2="თეორია" info="ინფორმაცია" right_menu1="ავტორიზაცია / რეგისტრაცია" />
        <HomeCarousel />
        <TextMessage />
        <Footer />
      </div>
    );
  }
}

export default App;
