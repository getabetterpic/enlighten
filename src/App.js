import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LightList from './LightList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Be Enlightened</h1>
        </header>
        <p className="App-intro">
          Woohoo {process.env.REACT_APP_API_HOST}
        </p>
        <LightList />
      </div>
    );
  }
}

export default App;
