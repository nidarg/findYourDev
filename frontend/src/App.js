import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Error from './components/layout/Error';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
// import { useSelector } from 'react-redux';
import ProtectedRoute from './middleware/ProtectedRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import './App.css';
// import Alert from './components/layout/Alert';
//Redux
import {Provider} from 'react-redux'
import store from './store'


const App = () => {

  
  return (
    <>
    <Provider store={store}>
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route  path='login' element={<Login/>}/>
          <Route  path='register' element=  {<Register/>}/>
          <Route  path='profiles' element=  {<Profiles/>}/>
          <Route  path='profile/:id' element=  {<Profile/>}/>
          <Route  path='profiles/search/:keyword' element=  {<Profiles/>}/>
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-profile" element={<CreateProfile />} />
            <Route path="add-education" element={<AddEducation/>} />
            <Route path="add-experience" element={<AddExperience/>} />
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>
         
          <Route path='*' element={<Error/>}/>
        </Routes>
      </Router>
    </Provider>
    </>
  );
}

export default App;
