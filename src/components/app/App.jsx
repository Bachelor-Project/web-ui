import './App.css';

import React, { Component } from 'react';
import MyNavbar from '../navbar/MyNavbar';
import HomeCarousel from '../carousel/HomeCarousel';
import TextMessage from '../textplain/TextMessage';
import Footer from '../footer/Footer';
import {BrowserRouter} from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <MyNavbar menu1="ამოცანები" menu2="თეორია"
        							right_menu1="ავტორიზაცია" right_menu2="რეგისტრაცია" homePath="/" topicsPath="/topics" tasksPath="/tasks" />
        </BrowserRouter>
        <HomeCarousel />
        <TextMessage />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
