// REMOVE-START
import { combineReducers } from 'redux';

import * as Actions from './actions'

const initialState ={
  presentations: []
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
