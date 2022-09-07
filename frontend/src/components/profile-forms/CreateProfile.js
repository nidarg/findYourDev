import React, {useState} from 'react'
import {Link,  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createProfile } from '../../actions/profile'
import Alert from '../layout/Alert'

const CreateProfile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[company, setCompany] = useState('')
  const[website, setWebsite] = useState('')
  const[location, setLocation] = useState('')
  const[userstatus, setUserStatus] = useState('')
  const[skills, setSkills] = useState('')
  const[githubusername, setGithubusername] = useState('')
  const[bio, setBio] = useState('')
  const[twitter, setTwitter] = useState('')
  const[facebook, setFacebook] = useState('')
  const[linkedin, setLinkedin] = useState('')
  const[youtube, setYoutube] = useState('')
  const[instagram, setInstagram] = useState('')

  const[displaySocialInputs, toggleSocialInputs] = useState(false)

  const changeDisplaySocialInputs = ()=>{
    toggleSocialInputs(!displaySocialInputs)
  }

  const formData = {company,website,location,userstatus,skills,githubusername,bio,twitter,facebook,linkedin,youtube,instagram}

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(createProfile(formData, navigate))
  }

  return (
    <div className = 'container'>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead"><i className="fas fa-user">Complete your profile</i></p>
      <Alert/>
      <small>fields marked with * are mandatory</small> 
      <form onSubmit={e=>handleSubmit(e)} className="form">
        <div className="form-group">
          <select  name="userstatus" value = {userstatus} onChange = {e=>setUserStatus(e.target.value)} >
          <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">What about yor career</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e=>setCompany(e.target.value)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website"
          value={website} onChange={e=>setWebsite(e.target.value)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e=>setLocation(e.target.value)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills"value={skills}  onChange={e=>setSkills(e.target.value)}/>
          <small className="form-text">Please use comma separated values(eg. HTML,CSS,Javascript)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Github username" name="githubusername" value={githubusername} onChange={e=>setGithubusername(e.target.value)}/>
          <small className="text-form">
            If you want your latest repos and a github link include your username
          </small>
        </div>
        <div className="form-group">
          <textarea name="bio" placeholder="A short bio of yourself" value={bio} onChange={e=>setBio(e.target.value)}></textarea>
        </div>
        <div className="my-2">
          <button type="button" className="btn btn-light" onClick = {changeDisplaySocialInputs}>
            Add social Network Links
          </button>
          <span>Optional</span>
        </div>

      {displaySocialInputs && (
        <>
          <div className="form-group social-input">
          <i className="fa-brands fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e=>setTwitter(e.target.value)}/>
          </div>
          <div className="form-group social-input">
            <i className="fa-brands fa-facebook fa-2x"></i>
            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e=>setFacebook(e.target.value)}/>
          </div>
          <div className="form-group social-input">
            <i className="fa-brands fa-youtube fa-2x"></i>
            <input type="text" placeholder="Youtube" name="youtube" value={youtube} onChange={e=>setYoutube(e.target.value)}/>
          </div>
          <div className="form-group social-input">
            <i className="fa-brands fa-instagram fa-2x"></i>
            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e=>setInstagram(e.target.value)}/>
          </div>
          <div className="form-group social-input">
            <i className="fa-brands fa-linkedin fa-2x"></i>
            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e=>setLinkedin(e.target.value)}/>
          </div>
        </>
      )}
        

        <input type="submit" className="btn btn-primary my-1"/>
        <Link to="/dashboard">Go Back</Link>
    </form>
    </div>
  )
}

export default CreateProfile