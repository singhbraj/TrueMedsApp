import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import promiseMiddleware from 'redux-promise';



export const store = createStore(reducer,
  applyMiddleware(promiseMiddleware,thunk),
 
)   