import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as Actions from './actions';


class VolumeMeter extends Component {

  goVolume = () => {
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio: true},
      (stream) => {
        this.audioContext = new AudioContext();
        const audioContext = this.audioContext;
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        const canvasContext = document.querySelector("#canvas").getContext("2d");
        javascriptNode.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          let values = 0;

          const length = array.length;
          for (let i = 0; i < length; i++) {
            values += (array[i]);
          }

          const average = values / length;

          if (average > 20) {
            this.props.addVolume(average);
          }

          canvasContext.clearRect(0, 0, 150, 300);
          canvasContext.fillStyle = '#BadA55';
          canvasContext.fillRect(0, 300 - average, 150, 300);
          canvasContext.fillStyle = '#262626';
          canvasContext.font = "48px impact";
          canvasContext.fillText(Math.round(average - 40), -2, 300);

        } // end fn stream
      },
      (err) => console.log("The following error occured: " + err.name));
    } else {
      console.log("getUserMedia not supported");
    }
  }

  componentWillReceiveProps(nextProps) {
    // this.props nextProps
    if (nextProps.recording === this.props.recording) {
      return
    }
    if (!this.props.recording) {
      if (nextProps.recording) return this.goVolume();
    } else {
      (nextProps.recording) ? this.audioContext.restart() : this.audioContext.close();
    }

  }

  render () {
    const { width, height } = this.props
    return (
      <div className="VolumeMeter">
        <canvas
          id="canvas"
          width={width}
          height={height}
          style={{display: this.props.recording ? "flex" : "none"}}
        />
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  /* These functions will go through the actions to the reducer function */
  addVolume: (average) => dispatch(Actions.addVolume(average))
});

export default connect(null, mapDispatchToProps)(VolumeMeter);
