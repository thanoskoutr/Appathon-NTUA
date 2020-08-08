import React, { Component } from 'react';
import BasicForm from './BasicForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Movie Selector</h1>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <BasicForm/>

      </div>
    );
  }
}

export default App;
