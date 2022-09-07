import React from 'react'
import {Link} from 'react-router-dom'

const ProfileItem = ({profile}) => {
  const {userId:{_id, name, avatar}, userstatus, company, location, skills} = profile
  return (
    <div className="container">
      <div className="profile bg-light">
        <img src={avatar} alt={name} className="round-img" />
        <div >
          <h2>{name}</h2>
          <p>{userstatus} {company && <span> at {company}</span>}</p>
          <p className="my-1">{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>
        </div>
        <ul>
          {skills.slice(0,4).map((skill, index)=>(
            <li key={index} className='text-primary'><i className="fa fa-check"></i> {skill}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileItem