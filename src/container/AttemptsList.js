import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Actions from '../actions';

import { Attempt } from '../components/Attempt';

class AttemptsList extends Component {

  renderAttempts() {
    return this.props.videos.map((videoURL, i) => {
      return <Attempt
        key={`video_${i}`}
        videoURL={videoURL}
        deleteVideo={() => this.deleteVideo(videoURL)}
      />
    });
  }

  deleteVideo(videoURL) {
    // filter out current videoURL from the list of saved videos
    this.props.deleteVideo(videoURL);
  }

  render() {
    return (
      <div className="AttemptsList">
        <h3>Recorded videos:</h3>
        {this.renderAttempts()}
      </div>
   );
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  /* state.movies comes from the reducer and equals reducer.movies */
  videos: state.videos
});

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  /* These functions will go through the actions to the reducer function */
  deleteVideo: (videoURL) => dispatch(Actions.deleteVideo(videoURL))
});

export default connect(mapStateToProps, mapDispatchToProps)(AttemptsList);
