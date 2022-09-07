import React,{useEffect} from 'react'
import{useDispatch, useSelector} from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { Link, useNavigate } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import Alert from '../layout/Alert'
import { deleteAccount } from '../../actions/profile'

import Spinner from '../layout/Spinner'

const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getProfile = useSelector(state=>state.getProfile)
  const{profile, loading} = getProfile
  const userLoginReducer = useSelector(state=> state.userLoginReducer)
  const{userInfo} = userLoginReducer
  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }
  
      dispatch(getCurrentProfile()); 
    
    
  },[userInfo,dispatch])

  return (
    <>
      {loading && <Spinner/>}
      <div className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
        <i className="fa-solid fa-user"></i> Welcome {userInfo && userInfo.name}
        </p>
        <Alert/>
        {profile!== null ? 
        <>
          <DashboardActions/>
          <Experience/>
          <Education/>
          <div className="my-2">
            <button className="btn btn-danger" onClick = {()=>dispatch(deleteAccount())}>
              <i className="fa-solid fa-user-minus"></i> Delete my account
            </button>
          </div>
        </> : 
        (<div>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
        </div>)
        }
      </div>
     
      
    </>
  
  )
}

export default Dashboard