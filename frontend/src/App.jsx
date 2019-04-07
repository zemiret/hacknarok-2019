import React, { Component } from 'react';
import './App.css';
import Profile from './profile/Profile';
import MapView from './home/MapView';
import { Route, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={MapView} />
          <Route path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;
