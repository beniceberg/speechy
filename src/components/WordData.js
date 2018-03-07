import React from 'react';

const renderWordRateSuggestion = (props) => {
  if(!props.attempt.speechText) return null;
  const WR = Math.round(props.attempt.speechText.split(' ').length/(props.attempt.time/60));
  if(WR === 0) {
    return(<p>
      You might have a problem with your microphone, or you haven't said anything.
    </p>);
  } else if(WR < 130) {
    return(<p>
      You speak with about {WR} words per minute.
      You're under the suggested minimum. Try to speak a bit quicker.
    </p>);
  } else if (WR < 190) {
    if (WR < 160) {
      (WR === 158)
        ? <p>Wow, you speak with about {WR} words per minute. Steve Jobs speaks at this rate!</p>
        : <p>You speak with about {WR} words per minute. The average is 160 so you could talk a bit faster if you want.</p>
    } else if (WR === 160) {
      return (<p>Wow, you speak with about {WR} words per minute. That's a perfect average!</p>);
    } else {
      return(<p>You speak with about {WR} words per minute. The average is 160 so you could talk a bit slower if you want.</p>)
    }
  } else {
    return (<p>
      You speak with about {WR} words per minute.
      You're above the suggested maximum. Try to speak a bit slower.
    </p>);
  };
}

export const WordData = (props) => (
  <div className="WordData">
    <h2>Word information</h2>
    {renderWordRateSuggestion(props)}
  </div>
)
