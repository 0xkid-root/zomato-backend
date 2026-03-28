import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import Home from '../pages/general/Home'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import CreateFood from '../pages/food-partner/CreateFood';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/foodpartner/register' element={<FoodPartnerRegister/>}/>
            <Route path='/foodpartner/login' element={<FoodPartnerLogin/>}/>
            <Route path='/user/register' element={<UserRegister/>}/>
            <Route path='/user/login' element={<UserLogin/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/create-food' element={<CreateFood/>}/>
        </Routes>
    </Router>
  )
}


export default AppRoutes
