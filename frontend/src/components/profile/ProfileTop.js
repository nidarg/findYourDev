import React from 'react'
import { useSelector } from 'react-redux';

const ProfileTop = () => {

  const getProfile = useSelector(state=>state.getProfile)
  const{profile:{company,website,location,userstatus,twitter,facebook,linkedin,youtube,instagram,userId:{name, avatar}}} = getProfile
  

  return (
    <div className="profile-top bg-primary p-3">
      <img  className="round-img my-1" alt='' src={avatar} />
      <h1 className="large">{name}</h1>
      <p className="lead">{userstatus} {company && <span> at {company}</span>}</p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} rel='noopener noreferrer'>
          <i className="fa-solid fa-globe fa-2x"></i>
        </a>
        )}
        
        {twitter && (
          <a href={twitter}>
          <i className="fa-brands fa-twitter fa-2x"></i>
        </a>
        )}

        {linkedin && (
          <a href={linkedin}>
          <i className="fa-brands fa-linkedin fa-2x"></i>
        </a>
        )}
        
        { facebook && (
          <a href={facebook}>
          <i className="fa-brands fa-facebook fa-2x">

          </i></a>
        )}
        
        {instagram && (
          <a href={instagram}>
          <i className="fa-brands fa-instagram fa-2x"></i>
        </a>
        )}
         {youtube && (
          <a href={youtube}>
          <i className="fa-brands fa-instagram fa-2x"></i>
        </a>
        )}
          
      </div>
    </div>
  )
}

export default ProfileTop