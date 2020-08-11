import React, { Component } from 'react';
import BasicForm from './BasicForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Movie Selector</h1>
          <div id="AppText">
            <p>
            Congrats. You are currently using several filters at the same time.
            For example a combination of different streaming providers, genres or release years.
            With one click on the reset button you’ll easily see all content again.
            </p>
          </div>
          <BasicForm/>

      </div>
    );
  }
}

export default App;
