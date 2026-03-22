import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/user/register' element={<UserRegister/>}/>
            <Route path='/user/login' element={<UserLogin/>}/>
        </Routes>
    </Router>
  )
}


export default AppRoutes
