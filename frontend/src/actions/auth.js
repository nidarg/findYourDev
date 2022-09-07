import axios from 'axios';
import { setAlert } from './alert';
import{
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  // PROFILE_RESET,
  // USER_LOGOUT
  
} from './constants';


//REGISTER

export const register = ({name, email, password})=>async dispatch=>{

  const config = {
    headers:{
      'Content-Type':'application/json'
    }
    
  }

  const body = JSON.stringify({name, email, password})

  try {
    const res = await axios.post('/api/users', body, config)

    dispatch({type : REGISTER_SUCCESS, payload:res.data })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    })

    localStorage.setItem('userInfo', JSON.stringify(res.data))


  } catch (error) {
    // console.log(error)
    const errors = error.response.data.errors;
    console.log(errors)
    if(errors){
      errors.forEach((err)=>dispatch(setAlert(err.msg, 'danger')))
    }
    dispatch({type:REGISTER_FAIL})
  }
}

// LOGIN

export const login = (email,password)=>async(dispatch)=>{
  try {

      dispatch({
          type:USER_LOGIN_REQUEST
      })

      const config = {
          headers:{
              'Content-Type':'application/json'
          }
      }  
      
      const {data} = await axios.post(
          '/api/auth',{email,password},config)
      
      dispatch({
          type:USER_LOGIN_SUCCESS,
          payload:data
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
  
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors)
    if(errors){
      errors.forEach((err)=>dispatch(setAlert(err.msg, 'danger')))
    }
    dispatch({
      type:USER_LOGIN_FAIL,})

  }
}

// LOGOUT

export const logout = ()=>async(dispatch)=>{
  try {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('profile')
    // dispatch({type:USER_LOGOUT})
    // dispatch({type:PROFILE_RESET})
  
  
  document.location.href = '/login'
  } catch (error) {
    console.error(error)
  }
  
}

