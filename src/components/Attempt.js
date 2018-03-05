import React from 'react';
import trash from '../assets/trash.svg';

export const Attempt = (props) => (
  <div className="Attempt">
    <video
      style={{width: 200}}
      src={props.videoURL} autoPlay loop />
    <div>
      <img
        src={trash}
        className="trashLogo"
        alt="logo"
        onClick={() => props.deleteVideo(props.videoURL)} />
      <a href={props.videoURL}>Download</a>
    </div>
  </div>
)
