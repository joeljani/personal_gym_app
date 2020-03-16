import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import WorkoutContainer from "./workouts/WorkoutContainer";
import {Link, Router} from "@reach/router";
import Statistics from "./statistics/statistics";

const defaultServerUrl = "http://127.0.0.1:9090/"

const App = () => {

    const serverUrl = useSelector(state => state.serverUrl)
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
            <header>
                <div className={"navBarGrid"}>
                    <button className={"workoutsNav"}><Link to='/'>Workouts</Link></button>
                    <button className={"statisticsNav"}><Link to='/statistics'>Statistics</Link></button>
                </div>
            </header>
            <main>
                <Router>
                    <WorkoutContainer serverUrl={serverUrl} path="/"/>
                    <Statistics path="/statistics"/>
                </Router>
            </main>
        </div>
    )
}

export default App;
