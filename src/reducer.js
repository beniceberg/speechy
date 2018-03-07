// REMOVE-START

import * as Actions from './actions'

const initialState ={
  presentations: [],
  presentation: {},
  speechText: ['This is a start'],
  counter: 0,
  videoURL: '',
  volumes: [],
  attempt: {}
}

const presentations = (state = initialState, action) => {
  switch (action.type) {
    case Actions.STORE_PRESENTATIONS:
      return {
        ...state,
        presentations: action.presentations
      };
    case Actions.STORE_PRESENTATION:
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
    case Actions.STORE_ATTEMPT:
      return {
        ...state,
        attempt: action.attempt
      };
    default:
      return state;
  }
}

export default presentations;
// REMOVE-END
