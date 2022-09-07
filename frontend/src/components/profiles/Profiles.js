import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getAllProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'
import SearchBox from '../layout/SearchBox'


const Profiles = () => {
  const dispatch = useDispatch()
  const {keyword} = useParams()
  const getProfile = useSelector(state=>state.getProfile)
  const{profiles, loading} = getProfile

  useEffect(()=>{
    dispatch(getAllProfiles(keyword))
  },[dispatch,keyword])

  return (
    <div className='container'>
    {loading ? <Spinner/> : 
      ( <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            Find Your Dev
          </p>
          <SearchBox/>
          <div className="profiles">
            {profiles? (
              profiles.map(profile=>(
                <ProfileItem key={profile._id} profile={profile}/>
              ))
            ) : <h4>No Profiles found ...</h4> 
            }
          </div>
        </>
      )
    }
    </div>

  )
}

export default Profiles