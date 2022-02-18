import {
    FETCH_CATALOGUE_LOADING,
    FETCH_CATALOGUE_SUCCESS,
    FETCH_CATALOGUE_FAIL,
    FETCH_MEDIA_DETAILS_LOADING,
    FETCH_MEDIA_DETAILS_FAIL,
    FETCH_MEDIA_DETAILS_SUCCESS
} from "../constants/constants"

const catalogue = { loading: true, data: null, error: undefined }
const media = { loading: true, data: null, error: undefined }


const catalogueReducer = (state = catalogue, action) => {
    switch (action.type) {
        case FETCH_CATALOGUE_LOADING:
            return { loading: true, data: null, error: undefined }
        case FETCH_CATALOGUE_SUCCESS:
            return { loading: false, data: action.payload, error: undefined }
        case FETCH_CATALOGUE_FAIL:
            return { loading: false, data: undefined, error: action.payload }
        default:
            return state
    }
}

const mediaReducer = (state = media, action) => {
    switch (action.type) {
        case FETCH_MEDIA_DETAILS_LOADING:
            return { loading: true, data: null, error: undefined }
        case FETCH_MEDIA_DETAILS_SUCCESS:
            return { loading: false, data: action.payload, error: undefined }
        case FETCH_MEDIA_DETAILS_FAIL:
            return { loading: false, data: undefined, error: action.payload }
        default:
            return state
    }
}

export { catalogueReducer, mediaReducer }