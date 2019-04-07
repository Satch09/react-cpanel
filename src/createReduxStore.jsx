import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';

const initialState = {};

export default () => {
	return createStore(
		reducer,
		initialState,
		applyMiddleware(
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
	);
};