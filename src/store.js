import {createStore, combineReducers, compose} from 'redux';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
//Reducers
// @TODO
const firebaseConfig = {
	apiKey: 'AIzaSyBzWm_BZaU9bL461MZIlIccD9z0g3tTOAk',
	authDomain: 'react-client-panel-8d377.firebaseapp.com',
	databaseURL: 'https://react-client-panel-8d377.firebaseio.com',
	projectId: 'react-client-panel-8d377',
	storageBucket: 'react-client-panel-8d377.appspot.com',
	messagingSenderId: '964275948234'
};
// React-Redux Config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
	reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer
});

// Create initial state
const initialState = {};

// Create Store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
	reactReduxFirebase(firebase),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;

