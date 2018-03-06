import React from 'react';

import { Attempt } from './Attempt';
import '../styles/AttemptsList.css';

const renderAttempts = (props) => {
  if (props.attempts) {
    return props.attempts.map((attempt) => {
      return <Attempt
        key={attempt._id}
        attempt={attempt}
        deleteVideo={props.deleteVideo} />
    });
  }
}

export const AttemptsList = (props) => (
  <div className="AttemptsList">
    <h3>Recent Attempts:</h3>
    <div className="attemptsList">
      {renderAttempts(props)}
    </div>
  </div>
)
