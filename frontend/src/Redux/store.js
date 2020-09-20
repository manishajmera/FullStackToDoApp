import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateVariant from "redux-immutable-state-invariant";
import thunkMiddleware from 'redux-thunk';
import Reducers from './Reducers/Reducers';

export const initStore = initialState => {
  const store = createStore(
    Reducers, 
    initialState, 
    composeWithDevTools(applyMiddleware(thunkMiddleware, reduxImmutableStateVariant()))
  );

  return store;
};