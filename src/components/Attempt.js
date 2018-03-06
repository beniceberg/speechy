import React from 'react';
import trash from '../assets/trash.svg';

export const Attempt = (props) => (
  <div className="Attempt">
    <video
      style={{width: 200}}
      src={props.attempt.videoURL} autoPlay loop />
    <div>
      <img
        src={trash}
        className="trashLogo"
        alt="logo"
        onClick={() => props.deleteAttempt(props.attempt)} />
      <a href={props.attempt.videoURL}>Download</a>
    </div>
  </div>
)
