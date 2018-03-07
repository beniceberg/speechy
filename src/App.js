import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/App.css';

import Presentation from './container/Presentation';
import Home from './container/Home';
import AttemptDetails from './container/AttemptDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navBar">
          <div className="title">
            <h1><a href='/'>SPEECHY</a></h1>
          </div>
          <div className='auth-button-container'>
            {/* <p className='auth-button'><a href='/login'>Login</a></p>
            <p className='auth-button'><a href='/sign-up'>Sign Up</a></p> */}
          </div>
        </div>
        <Router>
          <Switch >
            <Route
              exact={true} path='/'
              component={Home}
            />
            <Route
              exact={true} path='/presentation/:presentationId'
              component={Presentation}
            />
            <Route
              exact={true} path='/presentation/:presentationId/details/:attemptId'
              component={AttemptDetails}
            />
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
