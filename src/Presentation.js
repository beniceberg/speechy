import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import * as Actions from './actions';

import VolumeMeter from './VolumeMeter';
import Video from './Video';
import { AttemptsList } from './components/AttemptsList';
import { Timer } from './components/Timer';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class Presentation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recording: false
    }
    this.ticker = 0;
    this.presentationId = window.location.href.replace(/(.*)presentation\//g,'');
  }

  componentDidMount() {
    this.fetchPresentation();
  }

  fetchPresentation = () => {
    fetch(`http://localhost:3002/presentations/${this.presentationId}`)
      .then(response => response.json())
      .then(presentation => this.props.storePres(presentation));
  }


  // Will be executed once the start button has been clicked
  handleStart = () => {
    // console.log("State at handleStart",this.state);
    this.handleTimer();
    fetch('http://localhost:3002/api/speech-to-text/token')
      .then( response => response.text())
      .then ( (token) => {
        const stream = recognizeMic({
          token: token,
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false // optional - performs basic formatting on the results such as capitals an periods
        })
        stream.on('data', (data) => {
          const pres = this.props.presentationText;
          let newPresText = data.alternatives[0].transcript.indexOf(pres[pres.length-1]) === 0 || pres[pres.length-1].indexOf(data.alternatives[0].transcript) === 0
            ? pres.slice(0,-1)
            : pres
          newPresText = newPresText.concat(data.alternatives[0].transcript)
          this.props.addTextToPres(newPresText);
          // console.log(data.alternatives[0].transcript)
        });
        // stream.on('end')
        stream.on('error', (err) => console.log(err));
        document.querySelector('#stop').onclick = stream.stop.bind(stream);
      })
      .catch( error => console.log(error));
    this.changeRecordingState();
  }

  // Will be executed once the stop button has been clicked
  handleStop = () => {
    this.handleTimer();
    this.changeRecordingState();
    this.saveAttempt();
  }

  // Saving attempt on database
  saveAttempt = () => {
    const videoURL = this.props.videoURL;
    const speechText = this.props.speechText.join(' ');
    const time = this.props.counter;
    const volumeArr = this.props.volumes;
    fetch(`http://localhost:3002/presentations/${this.presentationId}/attempts`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({videoURL, speechText, time, volumeArr})
    })
    .then(response => response.json())
    .then(() => this.fetchPresentation())
  }

  // Timer component related
  handleTimer = () => {
    // Setting the interval
    (this.state.recording)
      ? clearInterval(this.ticker)
      : this.ticker = setInterval(() => this.props.tick(), 1000)
  }

  // Video related
  deleteVideo(videoURL) {
    // filter out current videoURL from the list of saved videos
    this.props.deleteVideo(videoURL);
  }

  // Will handle changing the button between Start and Stop
  changeRecordingState = () => {
    this.setState({
      ...this.state,
      recording: !this.state.recording
    })
  }

  render() {
    return (
      <div className="Presentation">
        <div className="presTitle">
          <h1>{this.props.presentation.title}</h1>
        </div>
        <div>
          <h3>Practice your speech yo</h3>
        </div>
        <div className="media">
            <Timer
              recording={this.state.recording}
              elapsed={this.props.counter} />
            <Video recording={this.state.recording} />
            <VolumeMeter
              recording={this.state.recording}
              width="150"
              height="300" />
        </div>
        <button
          className="startBtn"
          onClick={this.handleStart}
          style={{display:this.state.recording ? "none" : "flex"}}>
          START
        </button>
        <button
          className="stopBtn"
          id="stop"
          onClick={this.handleStop}
          style={{display:this.state.recording ? "flex" : "none"}}>
          <Link to={"/presentation/details"}>
            STOP
          </Link>
        </button>
        <div>{this.props.speechText.join(' ')}</div>
        <AttemptsList
          deleteVideo={this.deleteVideo}
          attempts={this.props.presentation.attempts}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  /* state.counter comes from the reducer and equals reducer.counter */
  presentations: state.presentations,
  presentation: state.presentation,
  speechText: state.speechText,
  counter: state.counter,
  videoURL: state.videoURL,
  volumes: state.volumes
});

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  /* These functions will go through the actions to the reducer function */
  addTextToPres: (newPresText) => dispatch(Actions.addTextToPres(newPresText)),
  tick: () => dispatch(Actions.tick()),
  deleteVideo: (videoURL) => dispatch(Actions.deleteVideo(videoURL)),
  storePres: (pres) => dispatch(Actions.storePres(pres))
});

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
