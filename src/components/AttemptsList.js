import React from 'react';

import { Attempt } from './Attempt';
import '../styles/AttemptsList.css';

const renderAttempts = (props) => {
  const videos = props.videos.reverse();
  return videos.map((videoURL, i) => {
    return <Attempt
      key={`video_${i}`}
      videoURL={videoURL}
      deleteVideo={props.deleteVideo} />
  });
}

export const AttemptsList = (props) => (
  <div className="AttemptsList">
    <h3>Recorded videos:</h3>
    <div className="attemptsList">
      {renderAttempts(props)}
    </div>
  </div>
)
