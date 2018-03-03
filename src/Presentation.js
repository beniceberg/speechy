import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newPresentation } from './actions';

import VolumeMeter from './VolumeMeter';
import Video from './Video';
import { Timer } from './components/Timer';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class Presentation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recording: false,
      presentation:['This is a start'],
      timer: null,
      counter: 0
    }
    this.ticker=0;
  }

  // Will be executed once the start button has been clicked
  handleStart = () => {
    // console.log("State at handleStart",this.state);
    this.changeDisplay();
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
          const pres = this.state.presentation;
          let newPresentation = data.alternatives[0].transcript.indexOf(pres[pres.length-1]) === 0 || pres[pres.length-1].indexOf(data.alternatives[0].transcript) === 0
            ? pres.slice(0,-1)
            : pres
          newPresentation = newPresentation.concat(data.alternatives[0].transcript)
          this.setState({
            text: data.alternatives[0].transcript,
            presentation: newPresentation
          });
          console.log(data.alternatives[0].transcript)
        });
        // stream.on('end')
        stream.on('error', (err) => console.log(err));
        document.querySelector('#stop').onclick = stream.stop.bind(stream);
      })
      .catch( error => console.log(error));
  }

  // Will be executed once the stop button has been clicked
  handleStop = () => {
    this.handleTimer();
    this.changeDisplay();
    const pres = this.state.presentation;
    const wordCount = {};
    const presArr = pres.join(' ').split(' ');
    presArr.forEach( el => {
      wordCount[el] ? wordCount[el]++ : wordCount[el] = 1
    })
    console.log("Each word",wordCount);
    console.log("Amount of words",presArr.length);
  }

  handleTimer = () => {
    // Setting the interval
    (this.state.recording)
      ? clearInterval(this.ticker)
      : this.ticker = setInterval(() => this.setState({counter : this.state.counter + 1}), 1000)
  }

  // Will handle changing the button between Start and Stop
  changeDisplay = () => {
    this.setState({
      ...this.state,
      recording: !this.state.recording
    })
  }

  renderTitle() {
    (this.props.presentations.length > 0) ? this.props.presentations[0].title : "New Presentation"
  }

  render() {
    console.log("Initial state",this.props.presentations);
    return (
      <div className="Presentation">
        <div className="presTitle">
          <h1>{this.renderTitle}</h1>
        </div>
        <div>
          <h3>Practice your speech yo</h3>
        </div>
        <div className="media">
            <Timer
              recording={this.state.recording}
              elapsed={this.state.counter} />
            <Video recording={this.state.recording} />
            <VolumeMeter
              recording={this.state.recording}
              width="150"
              height="300" />
        </div>
        <button
          className="startBtn"
          onClick={this.handleStart}
          style={{display:this.state.recording ? "none" : "flex"}}>START</button>
        <button
          className="stopBtn"
          id="stop"
          onClick={this.handleStop}
          style={{display:this.state.recording ? "flex" : "none"}}>STOP</button>
        <div>{this.state.presentation.join(' ')}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  /* state.counter comes from the reducer and equals reducer.counter */
  presentations: state.presentations
});
const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  /* These functions will go through the actions to the reducer function */
});

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
