import React, { Component } from 'react';

import VolumeMeter from './VolumeMeter';
import Video from './Video';
import './App.css';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recording: false,
      presentation:['This is a start']
    }
  }

  // Will be executed once the start button has been clicked
  handleStart = () => {
    console.log('where is Arol');
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
          // console.log('concat', newPresentation);
          this.setState({
            ...this.state,
            text: data.alternatives[0].transcript,
            presentation: newPresentation
          });
          // console.log(data.alternatives[0].transcript);
        });
        stream.on('error', (err) => console.log(err,"Should work"));
        document.querySelector('#stop').onclick = stream.stop.bind(stream);
        this.changeDisplay();
      })
      .catch( error => console.log(error, "This isnt working"));
  }

  // Will be executed once the stop button has been clicked
  handleStop = () => {
    this.changeDisplay();
    const pres = this.state.presentation;
    const wordCount = {};
    const presArr = pres.join(' ').split(' ');
    presArr.forEach( el => {
      wordCount[el] ? wordCount[el]++ : wordCount[el] = 1
    })
    console.log(wordCount)
  }

  // Will handle changing the button between Start and Stop
  changeDisplay = () => {
    this.setState({
      ...this.state,
      recording: !this.state.recording
    })
  }

  doThis = () => {
    console.log(this.state.presentation)
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          <h1>SPEECHY</h1>
        </div>
        <div>
          <h3>Practice your speech yo</h3>
        </div>
        <div className="media">
          <div className="time"></div>
            <Video />
            <VolumeMeter width="150" height="300"/>
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
        <button onClick={this.doThis}>show speech</button>
      </div>
    );
  }
}

export default App;
