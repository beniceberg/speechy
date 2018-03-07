import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import presentations from './reducer';

const configureStore = () => {
  const logger = createLogger();

  const store = createStore(
    presentations,
    applyMiddleware(logger)
  )

  return store;
}

export default configureStore;
