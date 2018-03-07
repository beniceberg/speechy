import React from 'react';

export const SpeechData = (props) => (
  <div className="SpeechData">
    <h2>Speech information</h2>
    <p className="speechData">
      {props.speechText}
    </p>
  </div>
)
