import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import * as Actions from './actions';

import ted from './assets/ted-presentation.jpg';
import './styles/Home.css';

import { PresentationsList } from './components/PresentationsList';

class Home extends React.Component {

  state = {
    newPresTitle: "",
    createdPresentation: undefined
  }

  componentDidMount() {
    this.fetchPresentations()
  }

  fetchPresentations = () => {
    return fetch(`http://localhost:3002/presentations`)
      .then(response => response.json())
      .then(presentations => this.props.storePresentations(presentations))
  }

  handleChange = (e) => this.setState({
    newPresTitle: e.target.value
  })

  createPresentation = () => {
    const title = this.state.newPresTitle;
    fetch(`http://localhost:3002/presentations`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title})
    })
    .then(response => response.json())
    .then(() => this.fetchPresentations())
    .then(() => {
      this.setState({
        createdPresentation: this.props.presentations[this.props.presentations.length-1],
        newPresTitle: ""
      });
    })
  }

  deletePresentation = (presentation) => {
    fetch(`http://localhost:3002/presentations/${presentation._id}`, {
      method: 'delete'
    })
      .then(() => this.fetchPresentations())
  }

  redirect() {
    if (this.state.createdPresentation) {
      return <Redirect to={`/presentation/${this.state.createdPresentation._id}`} />
    }
  }

  render() {
    return (
      <div className="Home">
        {this.redirect()}
        <div className="createPres">
          <input type="text"
            onChange={this.handleChange}
            placeholder="Create new presentation ..."
            value={this.state.newPresTitle}/>
          <button
            className="createBtn"
            onClick={this.createPresentation}>
            CREATE
          </button>
        </div>
        <div className="quoteDiv">
          <blockquote className="quote">
            "Proper Planning and Preparation Prevents Poor Performance"
            <small className="quoter">-Stephen Keague</small>
          </blockquote>
        </div>
        <img className="homeImage" src={ted} alt={"ted"} width="100%"/>
        <div>
          <h3 className="recentPresTitle">RECENT PRESENTATIONS:</h3>
          <PresentationsList
            presentations={this.props.presentations}
            deletePresentation={this.deletePresentation}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  presentations: state.presentations
});

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  /* These functions will go through the actions to the reducer function */
  storePresentations: (presentations) => dispatch(Actions.storePresentations(presentations))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
