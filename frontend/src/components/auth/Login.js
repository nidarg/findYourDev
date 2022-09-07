import React, {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import{useDispatch,useSelector} from 'react-redux'
import { login } from '../../actions/auth'

import Alert from '../layout/Alert'
import { setAlert } from '../../actions/alert'

const Login = () => {

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  const dispatch = useDispatch();  
  const navigate = useNavigate()
  const userLoginReducer = useSelector((state)=>state.userLoginReducer)
    const{error,userInfo} = userLoginReducer

  useEffect(() => {
    if (userInfo) {
      
      navigate('/dashboard')
    }
  }, [userInfo])

  const submitHandler = (e)=>{
    e.preventDefault();
      dispatch(login(email, password))
    }

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">
          Sign In
        </h1>
        <p className="lead"><i className="fas fa-user"> Sign Into Your Account</i></p>
        <div>
          {error && dispatch(setAlert({error}, 'danger'))}
      <Alert/>
      </div>
        <form onSubmit={e=>submitHandler(e)} className="form">
          
          <div className="form-group">
            <input type="email" 
            placeholder="Email Address"
            // required
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}
            />
            <small className="form-text">If you want a profile image use a Gravatar email </small>
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password"
            //  minLength="6"
             value={password}
             onChange = {(e)=>setPassword(e.target.value)}
             />
          </div>
          <input type="submit" value = "Login" className="btn btn-primary"/>
        </form>
        <p className="my-1">Don't have an account?<Link to='/register'> Sign Up</Link></p>
      </section>
    </>
  )
}

export default Login