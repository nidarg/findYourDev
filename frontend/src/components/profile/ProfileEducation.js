import React from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux';


const ProfileEducation = () => {

  const getProfile = useSelector(state=>state.getProfile)
  const{profile:{education}} = getProfile
  

  return (
    <>
      {education.map(edu=>{
      const{school,from,to,degree,fieldofstudy,description} = edu
      return(
        <div key={edu._id}>

          <h3 className="text-dark">{school}</h3>
          <p>
            <Moment format='DD/MM/YYYY'>{from}</Moment>- {!to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
          </p>
          <p><strong>Degree:</strong>{degree}</p>
          <p><strong>Field of Study: </strong>{fieldofstudy}</p>
          <p><strong>Description: </strong>{description}</p>
        </div>
      )
      })}
   </> 
  )
}

export default ProfileEducation