import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as Actions from '../actions';

import { WordData } from '../components/WordData';
import { Playback } from '../components/Playback';
import { SpeechData } from '../components/SpeechData';
import { TimeData } from '../components/TimeData';

import '../styles/AttemptDetails.css';

class AttemptDetails extends Component {

  constructor(props) {
    super(props);
    this.wordsYouShouldntUse = ['I','me','a little bit','just','talk about','my topic is','been asked to speak about','sorry if','sorry for','excuse the eye chart','start with a story','a funny joke','excuse me','if I seem nervous','not good at public speaking','not a speaker','never done this before','bear with me','moving right along',"didn't have enough time", "that's all I have"];
    this.wordFrequency = {};
    this.speechArray = this.props.speechText.join(' ').split(' ');
    this.wordCount = this.speechArray.length - 4;
    this.wordRate = Math.round(this.wordCount/(this.props.counter/60));
    this.presentationId = this.props.match.params.presentationId;
    this.attemptId = this.props.match.params.attemptId;
  }

  componentWillMount() {
    this.fetchAttempt();
  }

  fetchAttempt = () => {
    fetch(`http://localhost:3002/presentations/${this.presentationId}/attempts/${this.attemptId}`)
      .then(response => response.json())
      .then(attempt => this.props.storeAttempt(attempt));
  }

  renderAttempt() {
    const attempt = this.props.attempt;
    if(!attempt) return null;
    return (
      <div className="attemptDetails">
        <SpeechData speechText={attempt.speechText} attempt={attempt}/>
        <div className="wordAndTime">
          <WordData wordCount={this.wordCount} attempt={attempt}/>
          <TimeData attempt={attempt}/>
        </div>
        <Playback videoURL={attempt.videoURL} attempt={attempt}/>
      </div>
    )
  }

  render() {
    const speechArray = this.props.speechText.join(' ').split(' ');
    speechArray.forEach( el => {
      this.wordFrequency[el] ? this.wordFrequency[el]++ : this.wordFrequency[el] = 1
    });
    return (
      <div className="AttemptDetails">
        <a href={`/presentation/${this.presentationId}`}>
          <button className="backBtn">
            Back to presentation
          </button>
        </a>
        {this.renderAttempt()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  /* state.movies comes from the reducer and equals reducer.movies */
  counter: state.counter,
  speechText: state.speechText,
  volumes: state.volumes,
  attempt: state.attempt
});

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  /* These functions will go through the actions to the reducer function */
  storeAttempt: (attempt) => dispatch(Actions.storeAttempt(attempt))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttemptDetails));
