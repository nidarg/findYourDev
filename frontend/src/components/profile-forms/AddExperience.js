import React, {useState} from 'react'
import {Link,  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addExperience } from '../../actions/profile'

import Alert from '../layout/Alert'

const AddExperience = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[company, setCompany] = useState('')
  const[title, setTitle] = useState('')
  const[location, setLocation] = useState('')
  const[from, setFrom] = useState('')
  const[to, setTo] = useState('')
  const[description, setDescription] = useState('')
 
  const formData = {company,title,location,from,to,description}

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(addExperience(formData, navigate))
  }


  return (
    <section className="container">
      <h1 className="large text-primary">
        Add an experience
      </h1>
      <p className="lead"><i className="fas fa-user">Add any developer / programming positions that you have had in the past</i></p>
      <small>fields marked with * are mandatory</small> 
      <div>
          {/* {error && dispatch(setAlert({error}, 'danger'))} */}
      <Alert/>
      </div>
      <form className="form" onSubmit={e=>handleSubmit(e)}>
          
          <div className="form-group">
            <input type="text" placeholder="* Job Title" name="title" value = {title} onChange={e=>setTitle(e.target.value)}/>
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Company" name="company" value = {company} onChange={e=>setCompany(e.target.value)}/>
          </div>
        
          <div className="form-group">
            <input type="text" placeholder="Location" name="location" value = {location} onChange={e=>setLocation(e.target.value)}/>
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
          <textarea name="" id="" cols="30" rows="10" placeholder="Job Description" value = {description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>

          
          <input type="submit" className="btn btn-primary my-1"/>
          <Link to="/dashboard">Go Back</Link>
      </form>
  </section>
   
  )
}

export default AddExperience