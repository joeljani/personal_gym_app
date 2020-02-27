import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import ReduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
const logger = createLogger({colors: false})


const initalState = {
    workouts: [],
    currentWeek: [],
    exercises: [],
    serverUrl: '',
    serverError: false,
    loading: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_CURRENT_WEEK": return ({...state, currentWeek: action.currentWeek})
        case "SERVER_URL_LOADING": return({...state, loading: action.loading})
        case "SERVER_URL_LOADED": return ({...state, serverUrl: action.serverUrl})
        case "SERVER_URL_LOAD_FAILED": return ({...state, serverError: true})
        case "WORKOUTS_FETCHED": return ({...state, workouts: action.workouts})
        case "WORKOUTS_CHANGED": return({...state, workouts: action.workouts})
        case "EXERCISES_FETCHED": return ({...state, exercises: action.exercises})
        case "EXERCISES_CHANGED": return({...state, exercises: action.exercises})
        default: return state;
    }
}

const store = createStore(reducer, initalState, applyMiddleware(ReduxThunk, logger))

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
