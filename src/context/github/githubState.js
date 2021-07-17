/**
 * 20210716: Where all the actions are going
 *  to executed here
 *  Initial request will come here first
 */
/**
 * 20210716: Where all the reduced codes will be done here
 */

import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import githubReducer from './githubReducer';

import {
    SEARCH_USER,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types.js'

const GithubState = props => {
    // Global values
    const initialState = {
        users:{},
        user:{},
        repos:[],
        loading: false
    }

    /**
     * state: useReducer is used to store and update states, just like the useState Hook.
     * dispatch: useReducer returns an array that holds the current state value and
     *  a dispatch function, to which you can pass an action and later invoke.
     * state is immutable
     *  */

    const [state, dispatch] = useReducer(githubReducer, initialState)

// Search Users
const searchUser = async text =>{
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    // Dispatching the type and the payload
    dispatch({
        type: SEARCH_USER,
        payload:res.data.items
    })
}

// Get User

// Get Repos

// Clear Users
const clearUsers = () => dispatch({ type: CLEAR_USERS })

// Set Loading -> Using dispatch to send the content
const setLoading = () =>dispatch({type: SET_LOADING})

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading:state.loading,
            clearUsers,
            searchUser
        }}
    >
        {props.children}

    </GithubContext.Provider>
}

export default GithubState;