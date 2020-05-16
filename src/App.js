import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import WorkoutContainer from "./workouts/WorkoutContainer";
import {Router} from "@reach/router";
import NavBar from "./NavBar";

const defaultServerUrl = "http://127.0.0.1:8080/"

const App = ({children}) => {

    const dispatch = useDispatch();

    const fetchServerURL = () => {
        dispatch(
            async dispatch => {
                fetch('application.json')
                    .then(response => response.json())
                    .then(json => {
                        const SERVER_URL = json.SERVER_URL_LOCAL ? json.SERVER_URL_LOCAL : defaultServerUrl;
                        dispatch({type: "SERVER_URL_LOADED", serverUrl: SERVER_URL})
                    })
                    .catch(error => {
                        dispatch({type: "SERVER_URL_LOAD_FAILED", serverError: true})
                        dispatch({type: "SERVER_URL_LOADING", loading: false})
                    })
                dispatch({type: "SERVER_URL_LOADING", loading: true})
            }
        )
    }

    useEffect(fetchServerURL, []);

   /* let content;
    if (serverUrl === null) {
        content = <Loader/>
    } else if (serverError) {
        content = <NetworkErrorMessage/>
    } else {
        content = <WorkoutContainer serverUrl={serverUrl}/>
    }*/

    return (
        <div>
            <NavBar/>
            <Router>
                <WorkoutContainer path="/"/>
            </Router>
        </div>
    )
}

export default App;
