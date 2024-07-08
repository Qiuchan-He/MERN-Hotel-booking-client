import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth.js';

const rootReducer = combineReducers({
    auth:authReducer
})

export default rootReducer;