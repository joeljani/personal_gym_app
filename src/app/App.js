import React, {useEffect} from 'react';
import {Container} from 'reactstrap'
import {useSelector, useDispatch} from "react-redux";
import Loader from "../misc/Loader";
import WorkoutContainer from "../workouts/WorkoutContainer";
import NetworkErrorMessage from "../misc/NetworkErrorMessage";

const defaultServerUrl = "http://localhost:8080/"

const App = () => {

    const serverUrl = useSelector(state => state.serverUrl)
    const serverError = useSelector(state => state.serverError)
    const dispatch = useDispatch();

    const fetchServerURL = () => {
        dispatch(
            async dispatch => {
                fetch('application.json')
                    .then(response => response.json())
                    .then(json => {
                        const SERVER_URL = json.SERVER_URL ? json.SERVER_URL : defaultServerUrl;
                        dispatch({type: "SERVER_URL_LOADED", serverUrl: SERVER_URL})
                        dispatch({type: "SERVER_URL_LOADING", loading: false})
                    })
                    .catch(error => {
                        dispatch({type: "SERVER_URL_LOAD_FAILED", serverError: true})
                        dispatch({type: "SERVER_URL_LOADING", loading: false})
                    })
                dispatch({type: "SERVER_URL_LOADING", loading: true})
            }
        )
    }

    useEffect(fetchServerURL,[]);

    let content;
    if (serverUrl === null) {
        content = <Loader/>
    } else if (serverError) {
        content = <NetworkErrorMessage/>
    } else {
        content = <WorkoutContainer serverUrl={serverUrl}/>
    }


    return (
        <Container>
            {content}
        </Container>
    )
}

export default App;
