import React from 'react';
import ReactPlayer from 'react-player';

import trash from '../assets/trash.svg';
import download from '../assets/download.svg';

const renderVideo = (props) => {
  if(!props.attempt) return null;
  return (
    // <ReactPlayer url={props.attempt.videoURL} autoPlay loop muted/>
    <video style={{width: 220}} src={props.attempt.videoURL} autoPlay loop muted/>
  )
}

export const Attempt = (props) => {
  return (<div className="Attempt">
    <a href={`/presentation/${props.attempt.presentation}/details/${props.attempt._id}`}>
      {renderVideo(props)}
    </a>
    <div>
      <img
        src={trash}
        className="trashLogo"
        alt="logo"
        onClick={() => props.deleteAttempt(props.attempt)} />
      <a href={props.attempt.videoURL}>
        <img
        src={download}
        className="downloadLogo"
        alt="logo" />
      </a>
    </div>
  </div>)
}
