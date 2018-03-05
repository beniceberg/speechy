import React, { Component } from 'react';
import trash from '../assets/trash.svg';

export const Attempt = (props) => (
  <div className="Attempt">
    <video
      style={{width: 200}}
      src={this.props.videoURL} autoPlay loop />
    <div>
      <img
        src={trash}
        className="trashLogo"
        alt="logo"
        onClick={() => this.props.deleteVideo(this.props.videoURL)} />
      <a href={this.props.videoURL}>Download</a>
    </div>
  </div>
)
