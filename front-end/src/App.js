import React, { Component } from 'react';
// import BasicForm from './BasicForm';
import GetConfigurationTMDB from './GetConfigurationTMDB';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div id="AppText">
            <h1>Movie Selector</h1>
            <p>
            Congrats. You are currently using several filters at the same time.
            For example a combination of different streaming providers, genres or release years.
            </p>
          </div>
          <GetConfigurationTMDB />


      </div>
    );
  }
}

export default App;
