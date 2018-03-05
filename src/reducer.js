// REMOVE-START
// import { combineReducers } from 'redux';

import * as Actions from './actions'

const initialState ={
  presentations: [],
  presentationText: ['This is a start'],
  counter: 0,
  videos: []
}

const presentations = (state = initialState, action) => {
  switch (action.type) {
    case Actions.NEW_PRESENTATION:
      return {
        ...state,
        presentations: [
          ...state.presentations,
          {
            _id: '_' + Math.random().toString(36).substr(2, 9),
            title: action.title,
            published_at: (new Date()).toISOString(),
            try: []
          }
        ]
      };
    case Actions.NEW_PRES_TEXT:
      return {
        ...state,
        presentationText: action.newPresText
      }
    case Actions.TIMER_TICK:
      return {
        ...state,
        counter: state.counter + 1
      }
    case Actions.ADD_VIDEO:
      return {
        ...state,
        videos: state.videos.concat(action.videoURL)
      }
    case Actions.DELETE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter(videoURL => videoURL !== action.videoURL)
      }
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
