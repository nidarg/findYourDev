import React, {useState} from 'react'
import {Link,  useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { addEducation } from '../../actions/profile'

import Alert from '../layout/Alert'

const AddEducation = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[school, setSchool] = useState('')
  const[degree, setDegree] = useState('')
  const[fieldofstudy, setFieldofstudy] = useState('')
  const[from, setFrom] = useState('')
  const[to, setTo] = useState('')
  const[description, setDescription] = useState('')
 
  const formData = {school,degree,fieldofstudy,from,to,description}

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(addEducation(formData, navigate))
  }


  return (
    <section className="container">
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead"><i className="fas fa-user">Add the studies you think are relevant </i></p>
      <small>fields marked with * are mandatory</small> 
      <div>
          {/* {error && dispatch(setAlert({error}, 'danger'))} */}
      <Alert/>
      </div>
      <form className="form" onSubmit={e=>handleSubmit(e)}>
          
          <div className="form-group">
            <input type="text" placeholder="* School" name="school" value = {school} onChange={e=>setSchool(e.target.value)}/>
          </div>
          <div className="form-group">
            <input type="text" placeholder="* degree" name="degree" value = {degree} onChange={e=>setDegree(e.target.value)}/>
          </div>
        
          <div className="form-group">
            <input type="text" placeholder="Field of study" name="fieldofstudy" value = {fieldofstudy} onChange={e=>setFieldofstudy(e.target.value)}/>
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date"  name="from" value = {from} onChange={e=>setFrom(e.target.value)}/>
          </div>

          <div className="form-group">
            <h4>To Date</h4>
            <input type="date"  name="to" value = {to} onChange={e=>setTo(e.target.value)}/>
          </div>
        <div className="form-group">
          <textarea name="" id="" cols="30" rows="10" placeholder="Program Description" value = {description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>

          
          <input type="submit" className="btn btn-primary my-1"/>
          <Link to="/dashboard">Go Back</Link>
      </form>
  </section>
   
  )
}

export default AddEducation