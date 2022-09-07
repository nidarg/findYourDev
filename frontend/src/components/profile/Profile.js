import React, {useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getProfileById} from '../../actions/profile'
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub'

const Profile = () => {
const dispatch = useDispatch()
// const navigate = useNavigate()
const {id} = useParams()

const getProfile = useSelector(state=>state.getProfile)
  const{profile, loading} = getProfile
  const userLoginReducer = useSelector((state)=>state.userLoginReducer)
  const{userInfo} = userLoginReducer

useEffect(()=>{

  dispatch(getProfileById(id))

},[getProfileById,dispatch, id])

  return (
    <div className='container'>
        {profile === null || loading ? <Spinner/> : (
          <>
            <Link to= '/profiles' className='btn btn-light'> Back to Profiles</Link>
            {userInfo && userInfo._id === id && <Link to='/edit-profile' className='btn btn-dark'>Edit profile</Link>}
          </>
        )}
        

      {profile && (
          <div className="profile-grid my-1">
            <ProfileTop />
            <ProfileAbout/>
            <div className="profile-experience bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              <ProfileExperience/> 
            </div>
            <div className="profile-education bg-white p-2">
              <h2 className="text-primary">Education</h2>
                  <ProfileEducation  />     
            </div> 
            <ProfileGithub/>
        </div> 
      )
        
      }
  </div>

  )}

export default Profile