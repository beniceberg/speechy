import React from 'react';

const renderTime = (props) => {
  let seconds = props.attempt.time%60
  let minutes = Math.floor(props.attempt.time/60);
  return (
    <div className="timeData"> {minutes} minutes and {seconds} seconds.</div>
  )
}

export const TimeData = (props) => (
  <div className="TimeData">
    <h2>Time information</h2>
    {renderTime(props)}
  </div>
)
