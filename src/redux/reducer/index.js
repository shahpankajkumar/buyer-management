import { combineReducers } from 'redux';
import buyerReducer from './buyerReducer';

const rootReducer = combineReducers({
  buyer: buyerReducer,
  // add other reducers here
});

export default rootReducer;