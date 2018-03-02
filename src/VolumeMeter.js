
import React, { Component } from 'react'


class VolumeMeter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      volumeOn: false
    }
  }

  goVolume = () => {
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: true
      },
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
        javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;

          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }

          var average = values / length;

          console.log(Math.round(average));

          canvasContext.clearRect(0, 0, 150, 300);
          canvasContext.fillStyle = '#BadA55';
          canvasContext.fillRect(0, 300 - average, 150, 300);
          canvasContext.fillStyle = '#262626';
          canvasContext.font = "48px impact";
          canvasContext.fillText(Math.round(average - 40), -2, 300);

        } // end fn stream
      },
      function(err) {
        console.log("The following error occured: " + err.name)
      });
    } else {
      console.log("getUserMedia not supported");
    }
  }

  onVolume = () => {
    if (this.state.volumeOn) {
      this.setState({volumeOn:!this.state.volumeOn});
      this.audioContext.close();
    } else {
      this.setState({volumeOn:!this.state.volumeOn});
      this.goVolume();
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
          style={{display: this.state.volumeOn? "flex" : "none"}}
        />
        <button onClick={this.onVolume}>volStart</button>
      </div>
    );
  }

}

export default VolumeMeter;
