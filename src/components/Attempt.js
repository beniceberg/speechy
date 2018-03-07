import React from 'react';
import trash from '../assets/trash.svg';
import download from '../assets/download.svg';
import { Redirect, Link } from "react-router-dom";

export const Attempt = (props) => {
  if (props.stopped) {
    return <Redirect to={`/presentation/${props.attempt.presentation}/details`} />
  }
  console.log(props);
  return (<div className="Attempt">
    <Link to={`/presentation/${props.attempt.presentation}/details`}>
      <video
        style={{width: 200}}
        src={ (props.attempt) ? props.attempt.videoURL : props.attempt.videoURL} autoPlay loop muted/>
    </Link>
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
