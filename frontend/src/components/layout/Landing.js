import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Landing = () => {

  const userLoginReducer = useSelector((state)=>state.userLoginReducer)
  const{userInfo} = userLoginReducer
  return (
    <section className="landing-page">
      <div className="dark-overlay">
          <div className="landing-page-inner">
            <h1 className="x-large">Find Your Developer</h1>
            <p className="lead"> No matter which side you are an employer or developer in here you can find what you are looking for</p>
            {!userInfo && 
              <div className="buttons">
                <Link to='/register' className="btn btn-primary">Sign Up</Link>
                <Link to='/login' className="btn btn">Login</Link>
              </div>
            }
          </div>
        </div>
      </section>
  )
}

export default Landing