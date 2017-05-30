import './App.css';

import React, { Component } from 'react';
import MyNavbar from '../navbar/MyNavbar';
import HomeCarousel from '../carousel/HomeCarousel';
import Footer from '../footer/Footer';


class App extends Component {

  render() {
    return (
      <div className="App">
        <MyNavbar brand="ალგორითმი" home="მთავარი" tag1="ამოცანები" tag2="თეორია" righttag1="ავტორიზაცია" righttag2="რეგისტრაცია"/>
        <HomeCarousel />
        <Footer />
      </div>
    );
  }
}

export default App;
