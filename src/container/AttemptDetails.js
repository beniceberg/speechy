import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import '../styles/AttemptDetails.css';

class AttemptDetails extends Component {

  constructor(props) {
    super(props);
    this.wordsYouShouldntUse = ['I','me','a little bit','just','talk about','my topic is','been asked to speak about','sorry if','sorry for','excuse the eye chart','start with a story','a funny joke','excuse me','if I seem nervous','not good at public speaking','not a speaker','never done this before','bear with me','moving right along',"didn't have enough time", "that's all I have"];
    this.wordFrequency = {};
    this.presArray = this.props.speechText.join(' ').split(' ');
    this.wordCount = this.presArray.length - 4;
    this.wordRate = Math.round(this.wordCount/(this.props.counter/60));
  }

  renderWordRateSuggestion() {
    if(this.wordCount === 0) {
      return(<p>
        You might have a problem with your microphone, or you haven't said anything.
      </p>);
    } else if(this.wordCount < 130) {
      return(<p>
        You speak with about {this.wordCount} words per minute.
        You're under the suggested minimum. Try to speak a bit quicker.
      </p>);
    } else if (this.wordCount < 190) {
      if (this.wordCount < 160) {
        (this.wordCount === 158)
          ? <p>Wow, you speak with about {this.wordCount} words per minute. Steve Jobs speaks at this rate!</p>
          : <p>You speak with about {this.wordCount} words per minute. The average is 160 so you could talk a bit faster if you want.</p>
      } else if (this.wordCount === 160) {
        return (<p>Wow, you speak with about {this.wordCount} words per minute. That's a perfect average!</p>);
      } else {
        return(<p>You speak with about {this.wordCount} words per minute. The average is 160 so you could talk a bit slower if you want.</p>)
      }
    } else {
      return (<p>
        You speak with about {this.wordCount} words per minute.
        You're above the suggested maximum. Try to speak a bit slower.
      </p>);
    };
  }

  render() {
    // const wordsYouShouldntUse = []
    // const wordFrequency = {};
    const presArray = this.props.speechText.join(' ').split(' ');
    presArray.forEach( el => {
      this.wordFrequency[el] ? this.wordFrequency[el]++ : this.wordFrequency[el] = 1
    });
    // const wordCount = presArray.length;
    // const wordRate = wordCount/(this.props.counter/60);
    return (
      <div className="AttemptDetails">
        <div>
          {this.renderWordRateSuggestion()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  /* state.movies comes from the reducer and equals reducer.movies */
  counter: state.counter,
  speechText: state.speechText,
  volumes: state.volumes
});

export default withRouter(connect(mapStateToProps, null)(AttemptDetails));
