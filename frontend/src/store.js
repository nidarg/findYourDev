import { createStore,combineReducers, applyMiddleware} from 'redux';
import{composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import alertReducer from './reducers/alertReducer'
import {userRegisterReducer,
        userLoginReducer,
  } from './reducers/authReducer'

import { getProfile } from './reducers/profileReducer';

const reducer = combineReducers({
  alertReducer,
  userRegisterReducer,
  userLoginReducer,
  getProfile
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null
const userProfileFromStorage = localStorage.getItem('profile')
? JSON.parse(localStorage.getItem('profile')) : null

const initialState = {
  userLoginReducer:{userInfo:userInfoFromStorage},
  getProfile:{profile:userProfileFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store