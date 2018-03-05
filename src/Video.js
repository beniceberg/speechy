import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Actions from './actions';

const videoType = 'video/webm';

class Video extends Component {

  showVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    // show it to user
    this.video.srcObject = stream; //  === this.video.src = window.URL.createObjectURL(stream);
    this.video.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.recording !== nextProps.recording) {
      // Recording has changed
      if(nextProps.recording) this.startRecording();
      else this.stopRecording();
    }
  }

  startRecording() {
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 50ms delay
    this.mediaRecorder.start(50);
  }

  pauseRecording() {
    // stop the recorder
    this.mediaRecorder.pause();
  }

  stopRecording() {
    // stop the recorder
    this.mediaRecorder.stop();
    // save the video to memory
    this.saveVideo();
  }

  saveVideo() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: videoType});
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    this.props.saveVideo(videoURL);
  }

  render() {

    return (
      <div className="Video">
        <video
          className="video"
          ref={v => {
            this.video = v;
          }}
          onClick={this.showVideo}>
          Video stream not available.
        </video>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  /* state.videos comes from the reducer and equals reducer.videos */
  videos: state.videos
});

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  /* These functions will go through the actions to the reducer function */
  saveVideo: (videoURL) => dispatch(Actions.saveVideo(videoURL))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
