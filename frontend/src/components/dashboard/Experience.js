import React from 'react'
import {useSelector} from 'react-redux'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { deleteExperience } from '../../actions/profile'

const Experience = () => {

  const dispatch = useDispatch()
  const getProfile = useSelector(state=>state.getProfile)
  const{profile} = getProfile
  const {experience} = profile

  const experiences = experience.map(exp=>(
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{exp.from}</Moment>-
        {exp.to === null ? ('Now') : (<Moment format='DD/MM/YYYY'>{exp.from}</Moment>)}
      </td>
      <td>
        <button className="btn btn-danger" onClick = {()=>dispatch(deleteExperience(exp._id))}>Delete</button>
      </td>
    </tr>
  ))
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  )
}

export default Experience