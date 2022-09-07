
import { GET_PROFILE_SUCCESS,GET_PROFILE_FAIL,PROFILE_RESET, UPDATE_PROFILE,GET_PROFILES,GET_REPOS } from "../actions/constants"
const initialState = {
  profile:null,
  profiles:[],
  repos:[],
  loading:true,
  error:{},
  
}

export const getProfile = (state=initialState, action)=>{

  const{type,payload} = action
  switch(type){

    case GET_PROFILES:
      return {
        ...state,
        profiles:payload,
        loading:false
      }

    case GET_REPOS:
      return{
        ...state,
        repos:payload,
        loading:false
      }
    

    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE:
      return{
        ...state,
        profile:payload,
        loading:false
      }

    case GET_PROFILE_FAIL:
      return{
        ...state,
        error:payload,
        loading:false
      }

    
    case PROFILE_RESET:
      return{
        ...state,
        profile:null,
        repos:[],
        loading:false
      }

    default:
      return state
  }
}
