import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import * as Actions from '../actions';
import { PresentationsList } from '../components/PresentationsList';

import Home1 from '../assets/Home1.png';
import Home2 from '../assets/Home2.png';
import '../styles/Home.css';


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
        <section className="section1" style={{backgroundImage: `url(${Home1})`}}>
          <div className="info">
            <h1 className="infoHeader">Everybody talks but who knows how to speech</h1>
            <p className="infoParagraph">Create here your new presentation and unlock the art of performing.</p>
            <div className="createPres">
              <input type="text"
                onChange={this.handleChange}
                placeholder="Name your speech"
                value={this.state.newPresTitle}
              />
              <button
                className="createBtn"
                onClick={this.createPresentation}>
                Create
              </button>
            </div>
          </div>
        </section>
        <section className="section2" style={{backgroundImage: `url(${Home2})`}}>
          <div className="quoteDiv">
            <blockquote className="quote">
              <p>"Proper Planning and Preparation Prevents Poor Performance"</p>
              <small className="quoter">-Stephen Keague</small>
            </blockquote>
          </div>
          <div className="presList">
            <h3 className="previousPresTitle">Previous Speeches</h3>
            <PresentationsList
              presentations={this.props.presentations}
              deletePresentation={this.deletePresentation}/>
          </div>
        </section>
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
