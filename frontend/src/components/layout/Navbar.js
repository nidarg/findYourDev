import React from 'react'
import {Link} from 'react-router-dom'
import { logout } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'



const Navbar = () => {

  const dispatch = useDispatch()
  const userLoginReducer = useSelector(state=>state.userLoginReducer)
  const{loading, userInfo} =  userLoginReducer

  const authLinks = (
    <ul>
      <li><Link to='/profiles'>Developers </Link></li>
      <li></li>
      <li><Link to='/dashboard'><i className="fa-solid fa-user"></i><span className="hide-sm"> Dashboard</span> </Link></li>
      <li>
        {userInfo && <p>{userInfo.name}</p>}
      </li>
      <li>
        <a href="#!" onClick={dispatch(logout)}>
        <i className="fa-solid fa-right-from-bracket"></i>{' '} <span className="hide-sm">Logout</span> 
        </a>
      </li>

    </ul>
  )

  const guestLinks = (
    <ul>
        <li><Link to='/profiles'>Developers </Link></li>
        
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
          <i className="fa-brands fa-connectdevelop"></i>FindDev
        </Link>
      </h1>
     {!loading && <>
     
      {userInfo ? authLinks : guestLinks}

     </>}
 </nav>
  )
}

export default Navbar
