import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from "redux-thunk";
import rootReducer from '../reducers/index';

const composeEnhancers =
  (typeof window !== "undefined" && process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(ReduxThunk))(
  createStore
);

export default createStoreWithMiddleware(rootReducer);