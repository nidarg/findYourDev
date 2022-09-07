// import React from 'react'
import axios from 'axios';
import { setAlert } from './alert';
// import {Navigate} from 'react-router-dom'
import { GET_PROFILE_SUCCESS,GET_PROFILE_FAIL,UPDATE_PROFILE,PROFILE_RESET,ACCOUNT_DELETED,GET_PROFILES,GET_REPOS } from "./constants"

// GET Current User Profile

export const getCurrentProfile = ()=>async(dispatch, getState)=>{

  try {

    const {userLoginReducer:{userInfo}} = getState()
  
      const config = {
        headers: {
          
          Authorization:`Bearer ${userInfo.token}`
        },
      }
    const {data} = await axios.get('/api/profile/me',config)
    dispatch({
      type:GET_PROFILE_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type:GET_PROFILE_FAIL,
      payload:{msg:error.message}
    })
  }
}



// Get all profiles

export const getAllProfiles = (keyword = '')=>async(dispatch)=>{
  // dispatch({type:PROFILE_RESET})
  try {
    const {data} = await axios.get(`/api/profile/?keyword=${keyword}`)
    dispatch({
      type:GET_PROFILES,
      payload:data
    })
  } catch (error) {
    dispatch({
      type:GET_PROFILE_FAIL,
      payload:{msg:error.message}
    })
  }
}

// Get profile by id

export const getProfileById = (userId)=>async(dispatch)=>{

  try {
    const {data} = await axios.get(`/api/profile/user/${userId}`)
    dispatch({
      type:GET_PROFILE_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type:GET_PROFILE_FAIL,
      payload:{msg:error.message}
    })
  }
}

// GET Github repos

export const getGithubRepos = (username)=>async(dispatch)=>{

  try {
    const {data} = await axios.get(`/api/profile/github/${username}`)
    dispatch({
      type:GET_REPOS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type:GET_PROFILE_FAIL,
      payload:{msg:error.message}
    })
  }
}

// Create or Update a profile

export const createProfile = (formData,navigate)=>async (dispatch,getState)=>{

  try {
    const {userLoginReducer:{userInfo}} = getState()
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const{data} = await axios.post('/api/profile',formData, config)
    dispatch({
      type:GET_PROFILE_SUCCESS,
      payload:data.profile
    })

    localStorage.setItem('profile', JSON.stringify(data.profile))


    dispatch(setAlert(data.edit ? 'Profile Updated' : 'Profile Created', 'success'))
    if(!data.edit){
      navigate('/dashboard');
    }
  } catch (error) {
    console.log(error)
    const errors = error.response.data.errors;
    console.log(errors)
    if(errors){
      errors.forEach((err)=>dispatch(setAlert(err.msg, 'danger')))
    }
    dispatch({
      type:GET_PROFILE_FAIL,
      payload:{msg:error.msg}
    })
  }
}


// Add Experience
export const addExperience = (formData, navigate) => async(dispatch, getState)=>{

  try {
    const {userLoginReducer:{userInfo}} = getState()
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put('/api/profile/experience',formData,config)

    dispatch({
      type:UPDATE_PROFILE,
      payload:data
    })

    dispatch(setAlert('Experience added', 'success'))

    navigate('/dashboard')

  } catch (error) {
    const errors = error.response.data.errors;
    if(errors){
      errors.forEach(err=> dispatch(setAlert(err.msg,'danger')))
    }
    dispatch({
      type:GET_PROFILE_FAIL,
      payload:{msg:error.msg}
    })
  }
}

// Add Education
export const addEducation = (formData, navigate) => async(dispatch, getState)=>{

  try {
    const {userLoginReducer:{userInfo}} = getState()
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put('/api/profile/education',formData,config)

    dispatch({
      type:UPDATE_PROFILE,
      payload:data
    })

    dispatch(setAlert('Education added', 'success'))

    // navigate('/dashboard')

  } catch (error) {
    const errors = error.response.data.errors;
    if(errors){
      errors.forEach(err=> dispatch(setAlert(err.msg,'danger')))
    }
    dispatch({
      type:GET_PROFILE_FAIL,
      payload:{msg:error.msg}
    })
  }
}

// DELETE EXPERIENCE

export const deleteExperience = (id)=> async(dispatch,getState)=>{
  try {
    
    const {userLoginReducer:{userInfo}} = getState()

    const config = {
      headers:{
        
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.delete(`/api/profile/experience/${id}`,config)

    dispatch({
      type:UPDATE_PROFILE,
      payload:data
    })

    dispatch(setAlert('Experience removed', 'danger'))

    // navigate('/dashboard')

  } catch (error) {
    dispatch({
      type:GET_PROFILE_FAIL,
      payload:{msg:error.msg}
    })
  }
  
}

// DELETE EDUCATION

export const deleteEducation = (id)=> async(dispatch,getState)=>{
  try {
    
    const {userLoginReducer:{userInfo}} = getState()

    const config = {
      headers:{
        
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.delete(`/api/profile/education/${id}`,config)

    dispatch({
      type:UPDATE_PROFILE,
      payload:data
    })

    dispatch(setAlert('Education removed', 'danger'))

    // navigate('/dashboard')

  } catch (error) {
    dispatch({
      type:GET_PROFILE_FAIL,
      payload:{msg:error.msg}
    })
  }
  
}

// DELETE ACCOUNT && PROFILE

export const deleteAccount = ()=> async(dispatch,getState)=>{
  if(window.confirm('Are you sure? This can NOT be undone')){

    try {
    
      const {userLoginReducer:{userInfo}} = getState()
  
      const config = {
        headers:{
          
          Authorization:`Bearer ${userInfo.token}`
        }
      }
  
      await axios.delete(`/api/profile`,config)
  
      dispatch({
        type:PROFILE_RESET,
      })
      dispatch({
        type:ACCOUNT_DELETED,
      })
  
      dispatch(setAlert('Your account has been permanently deleted', 'success'))
  
      //  navigate('/login')
  
      } catch (error) {
        dispatch({
          type:GET_PROFILE_FAIL,
          payload:{msg:error.msg}
        })
      }
    
  }
 
  
}