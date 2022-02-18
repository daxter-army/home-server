import axios from "axios"

import {
    FETCH_CATALOGUE_LOADING,
    FETCH_CATALOGUE_SUCCESS, 
    FETCH_CATALOGUE_FAIL,
    FETCH_MEDIA_DETAILS_LOADING,
    FETCH_MEDIA_DETAILS_SUCCESS,
    FETCH_MEDIA_DETAILS_FAIL
}

from "../constants/constants"

const doFetchCatalogue = () => async(dispatch) => {
    try {
        dispatch({ type: FETCH_CATALOGUE_LOADING })

        const { data } = await axios.get('/database')

        dispatch({ type: FETCH_CATALOGUE_SUCCESS, payload: data.catalogue })
    }
    catch(error) {
        dispatch({ type: FETCH_CATALOGUE_FAIL, payload: error })
    }
}

const doFetchMedia = (folderName) => async(dispatch) => {
    try {
        dispatch({ type: FETCH_MEDIA_DETAILS_LOADING })
        const { data } = await axios.get(`/database?folder=${folderName}`)
        console.log(data.mediaList)
        dispatch({ type: FETCH_MEDIA_DETAILS_SUCCESS, payload: data.mediaList })
    }
    catch(error) {
        dispatch({ type: FETCH_MEDIA_DETAILS_FAIL, payload: error })
    }
}

export {
    doFetchCatalogue,
    doFetchMedia
}