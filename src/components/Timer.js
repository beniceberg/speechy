import React from 'react';

import '../styles/Timer.css';

const renderTime = (props) => {
  let seconds = props.elapsed%60
  let minutes = Math.floor(props.elapsed/60);
  seconds = (seconds < 10) ? "0" + seconds : "" + seconds;
  minutes = (minutes < 10 ? "0" + minutes : "" + minutes);
  return (
    <div className="time"> {minutes} : {seconds} </div>
  )
}

export const Timer = (props) => (
  <div className="Timer">
    {renderTime(props)}
  </div>
)
