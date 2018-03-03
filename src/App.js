import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './styles/App.css';

import Presentation from './Presentation';
import Home from './Home';

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
        <HashRouter>
          <Switch >
            <Route
              exact={true} path='/'
              render={(props) => (
                <Home/>
              )}
            />
            <Route
              exact={false} path='/new-presentation'
              render={(props) => (
                <Presentation/>
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }

}

export default App;
