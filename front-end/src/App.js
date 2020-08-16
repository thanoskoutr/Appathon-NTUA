import React, { Component } from 'react';
import GetConfigurationTMDB from './GetConfigurationTMDB';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

            <div class="jumbotron jumbotron-fluid">
              <div class="container">
                <h1 class="display-4">Movie Selector</h1>
                <p class="lead">This is a small web app, where you can search for movies available on
                Streaming platforms. You can search and order the movies based on the
                given attributes below. You can search on multiple Streaming platforms
                by selecting more than one icon.</p>
              </div>
            </div>

          <GetConfigurationTMDB />


      </div>
    );
  }
}

export default App;
