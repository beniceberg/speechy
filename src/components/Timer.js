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

export const Timer = (props) => {
  let pers = (props.elapsed/(props.sessionLength*60)) * 100 + "%";
  return (
    <div className="Timer">
      <section className="timerCtrl">
        <p>Set length</p>
        <div className="sessionCtrl">
          <button className="minus" onClick={() => props.sessionLengthChange(-1)}>-</button>
          <span className="timeSet">{props.sessionLength}</span>
          <button className="plus" onClick={() => props.sessionLengthChange(1)}>+</button>
        </div>
      </section>
      <div className="timer">
        <p className="sessionTitle">Session</p>
        {renderTime(props)}
        <span className="fill" style={{height: pers}}></span>
      </div>
    </div>
  )
}
