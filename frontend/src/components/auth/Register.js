import React, {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { register } from '../../actions/auth'
import { setAlert } from '../../actions/alert'

import Alert from '../layout/Alert'

const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const userRegisterReducer = useSelector((state)=>state.userRegisterReducer)
 
  const {error, userInfo } = userRegisterReducer

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [userInfo])

  const submitHandler = (e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      // console.log('Passwords don\'t match')
      dispatch(setAlert('Passwords don\'t match','danger'))
    }else{
      dispatch(register({name, email, password}))
    }
  }

  return (
    <>
    
      <section className="container">  
        <h1 className="large text-primary">
          Sign Up
        </h1>
        <p className="lead"><i className="fas fa-user"> Create Your Account</i></p>
        <div>
          {error && dispatch(setAlert({error}, 'danger'))}
      <Alert/>
      </div>
        <form onSubmit={e=>submitHandler(e)} className="form">
          <div className="form-group">
            <input type="text" 
            placeholder="Name"
            name='name'
            value={name}
            //  required
            onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <input type="email" 
            placeholder="Email Address"
            //required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <small className="form-text">If you want a profile image use a Gravatar email </small>
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password"
            //  minLength="6"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirm Password" 
            // minLength="6"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input type="submit" value = "Register" className="btn btn-primary"/>
        </form>
        <p className="my-1">Alredy have an account?<Link to= '/login'> Sign In</Link></p>
      </section>
    </>
  )
}

export default Register