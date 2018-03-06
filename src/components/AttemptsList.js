import React from 'react';

import { Attempt } from './Attempt';
import '../styles/AttemptsList.css';

const renderAttempts = (props) => {
  if (props.attempts) {
    return props.attempts.map((attempt) => {
      return <Attempt
        key={attempt._id}
        attempt={attempt}
        deleteAttempt={props.deleteAttempt} />
    });
  }
}

export const AttemptsList = (props) => (
  <div className="AttemptsList">
    <div className="attemptsList">
      {renderAttempts(props)}
    </div>
  </div>
)
