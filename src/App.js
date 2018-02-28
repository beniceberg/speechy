import React, { Component } from 'react';

import Video from './Video';
import './App.css';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDisplay: true
    }
  }

  onListenClick = () => {
    fetch('http://localhost:3002/api/speech-to-text/token')
      .then((response) => {
        return response.text();
      })
      .then ((token) => {
        const stream = recognizeMic({
          token: token,
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false // optional - performs basic formatting on the results such as capitals an periods
        });
        stream.on('data', (data) => {
          this.setState({
            ...this.state,
            text: data.alternatives[0].transcript
          })
          console.log(data);
        });
        stream.on('error', function(err) {
          console.log(err);
        });
        document.querySelector('#stop').onclick = stream.stop.bind(stream);
      })
      .catch(function(error) {
          console.log(error);
      });
  }

  changeDisplay = () => {
    this.setState({
      ...this.state,
      startDisplay: !this.state.startDisplay
    })
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
        <Video />
        <button
          className="startBtn"
          onClick={this.onListenClick} onClick={this.changeDisplay}
          style={{display:this.state.startDisplay ? "flex" : "none"}}>START</button>
        <button
          className="stopBtn"
          id="stop"
          onClick={this.changeDisplay}
          style={{display:this.state.startDisplay ? "none" : "flex"}}>STOP</button>
        <div>{this.state.text}</div>
      </div>
    );
  }
}

export default App;
