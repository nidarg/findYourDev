import{
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  ACCOUNT_DELETED
} from '../actions/constants';

// const initialState = {
//   token:localStorage.getItem('token'),
//   isAuthenticated:null,
//   loading:true,
//   user:null
// }
export const userRegisterReducer = (state={}, action)=>{
  // const {type, payload} = action

  switch(action.type){

    case REGISTER_SUCCESS:
      
      return{
        loading:false,
        userInfo:action.payload
      }

      case REGISTER_FAIL:
        return{
          loading:false,
          error:action.payload
          
      }

      case USER_LOGOUT:
        case ACCOUNT_DELETED:
        return {}
    default:
      return state
  }
}

export const  userLoginReducer = (state={}, action)=>{

  switch(action.type){
      case USER_LOGIN_REQUEST:
          return {loading:true}
      case USER_LOGIN_SUCCESS:
          return {
              loading:false,
              userInfo:action.payload
          }
      case USER_LOGIN_FAIL:
          return{
              loading:false,
              error:action.payload
              
          }
      case USER_LOGOUT:
          return {}
      default:
          return state
  }

}

// export default userRegisterReducer