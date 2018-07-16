import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import RootReducer from '../reducers/index';

const connectWithReduxMiddleWare = applyMiddleware(ReduxPromise)(createStore);
const store = connectWithReduxMiddleWare(RootReducer);

export default store;
