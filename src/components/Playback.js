import React from 'react';
import ReactPlayer from 'react-player';

export const Playback = (props) => (
  <div className="Playback">
      <ReactPlayer url={props.videoURL} controls/>
  </div>
)
