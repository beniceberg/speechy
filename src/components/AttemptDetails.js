import React, { Component } from 'react';
import { connect } from 'react-redux';

class AttemptDetails extends Component {
  render() {
    return (
      <div className="AttemptDetails">

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // Map your state to props
  /* state.movies comes from the reducer and equals reducer.movies */
  counter: state.counter,
  presentationText: state.presentationText
});

export default connect(mapStateToProps, null)(AttemptDetails);
