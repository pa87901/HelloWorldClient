import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './Reducers';

const logger = createLogger({ predicate: (getState, action) => __DEV__ });
// PLEASE NOTE THAT LOGGER IS NOT WORKING WITH REACT NATIVE THE SAME WAY AS REACT-WEB.
const middleware = applyMiddleware(promise(), thunk, logger);

const store = createStore(reducer, middleware);

export default store;
