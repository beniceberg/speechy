import React from 'react';
import { connect } from 'react-redux';

import * as Actions from './actions';

import ted from './assets/ted-presentation.jpg';
import './styles/Home.css';

class Home extends React.Component {

  state = {
    newPresTile: ""
  }

  handleChange = (e) => this.setState({
    newPresTile: e.target.value
  })

  newPresentation = () => {
    const title = this.state.newPresTile;
    this.props.newPresentation(title);
    this.setState({newPresTile: ""});
  }

  render() {
    return (
      <div className="Home">
        <div className="createPres">
          <input type="text"
            onChange={this.handleChange}
            placeholder="Create new presentation ..."
            value={this.state.newPresTile}/>
          <a 
            className="createBtn"
            onClick={this.newPresentation}
            href="/#/new-presentation">
            CREATE
          </a>
        </div>
        <div className="quoteDiv">
          <blockquote className="quote">
            "Proper Planning and Preparation Prevents Poor Performance"
            <small className="quoter">-Stephen Keague</small>
          </blockquote>
        </div>
        <img className="homeImage" src={ted} alt={"ted"} width="100%"/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  /* These functions will go through the actions to the reducer function */
  newPresentation: (title) => dispatch(Actions.newPresentation(title))
});

export default connect(null, mapDispatchToProps)(Home);
