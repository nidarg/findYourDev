import React from 'react'
import {useSelector} from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile'
import { useDispatch } from 'react-redux'

const Education = () => {

  const dispatch = useDispatch()
  const getProfile = useSelector(state=>state.getProfile)
  const{profile} = getProfile
  const {education} = profile

  const educations = education.map(edu=>(
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{edu.from}</Moment>-
        {edu.to === null ? ('Now') : (<Moment format='DD/MM/YYYY'>{edu.to}</Moment>)}
      </td>
      <td>
        <button className="btn btn-danger" onClick = {()=>dispatch(deleteEducation(edu._id))}>Delete</button>
      </td>
    </tr>
  ))
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  )
}

export default Education