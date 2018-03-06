// REMOVE-START
// import { combineReducers } from 'redux';

import * as Actions from './actions'

const initialState ={
  presentations: [],
  presentation: {},
  speechText: ['This is a start'],
  counter: 0,
  videoURL: '',
  volumes: []
}

const presentations = (state = initialState, action) => {
  switch (action.type) {
    case Actions.STORE_PRESENTATIONS:
      return {
        ...state,
        presentations: action.presentations
      };
    case Actions.STORE_PRESENTATION:
      console.log('FROM ACTION DISPATCH: ', action.presentation)
      return {
        ...state,
        presentation: action.presentation
      };
    case Actions.NEW_PRES_TEXT:
      return {
        ...state,
        speechText: action.newPresText
      };
    case Actions.TIMER_TICK:
      return {
        ...state,
        counter: state.counter + 1
      };
    case Actions.ADD_VIDEO:
      return {
        ...state,
        videoURL: action.videoURL
      };
    case Actions.ADD_VOLUME_DATA:
      return {
        ...state,
        volumes: state.volumes.concat(action.average)
      };
    default:
      return state;
  }
}

export default presentations;

// Combining both reducers
// const reducers = combineReducers({
//   presentations
// });

// export default reducers;
// REMOVE-END
