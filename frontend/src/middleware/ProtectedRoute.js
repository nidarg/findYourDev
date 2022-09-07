import React from 'react'
import{Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const user=localStorage.getItem('userInfo')
  if(user){
    return true
  } else {
    return false
  }
}


const ProtectedRoute = ({
  user = useAuth(),
  redirectPath = '/login',
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute