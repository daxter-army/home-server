import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import { catalogueReducer, mediaReducer } from "./reducers/reducers"

const rootReducer = combineReducers({
    catalogueState: catalogueReducer,
    mediaState: mediaReducer
})

const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(thunk)
)

export default store