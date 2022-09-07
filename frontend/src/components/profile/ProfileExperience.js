import React from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux';

const ProfileExperience = () => {

  const getProfile = useSelector(state=>state.getProfile)
  const{profile:{experience}} = getProfile

  return (
    <>
      {
          experience.map(exp=>{
          const{company,from,to,title,description} = exp
          return(
            <div key = {exp._id}>
              <h3 className="text-dark">{company}</h3>
              <p>
                <Moment format='DD/MM/YYYY'>{from}</Moment>- {!to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
              </p>
              <p><strong>Position:</strong>{title}</p>
              <p><strong>Description: </strong>{description}</p>
            </div>
        )
      })
  }


    
    </>
    
    
  )
}

export default ProfileExperience