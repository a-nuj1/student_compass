import './App.css'
import React from 'react'
import {BrowserRouter as Router, Route, Routes}from "react-router-dom"
import Home from './components/Home'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import Courses from './components/Courses/Courses'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ForgetPass from './components/Auth/ForgetPass'
import ResetPass from './components/Auth/ResetPass'
import Contact from './components/Contact/Contact'
import Request from './components/Request/Request'
import About from './components/About/About'
import Subscribe from './components/Payments/Subscribe'
import NotFound from './components/Layout/NotFound/NotFound'
import PaymentSuccess from './components/Payments/PaymentSuccess'
import PaymentFail from './components/Payments/PaymentFail'
import CourseDetails from './components/CoursePage/CourseDetails'
import Profile from './components/Profile/Profile'
import ChangePass from './components/Profile/ChangePass'
import UpdateProfile from './components/Profile/UpdateProfile'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import CreateCourse from './components/Admin/CreateCourse/CreateCourse'
import AdminCourses from './components/Admin/AdminCourses/AdminCourses'
import Users from './components/Admin/Users/Users'

function App() {

  // window.addEventListener('contextmenu',(e) =>{
  //   e.preventDefault()
  // })

  return (
    <Router>
      <Header/>
      <Routes>

        {/* pages */}
        <Route path='/' element = {<Home/>}/>
        <Route path='/courses' element = {<Courses/>}/>
        <Route path='/course/:id' element = {<CourseDetails/>}/>
        <Route path='/changepassword' element = {<ChangePass/>}/>
        <Route path='/updateprofile' element = {<UpdateProfile/>}/>
        <Route path='/contact' element = {<Contact/>}/>
        <Route path='/request' element = {<Request/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/forgetpassword' element = {<ForgetPass />}/>
        <Route path='/resetpassword/:token' element = {<ResetPass />}/>
        <Route path='/subscribe' element = {<Subscribe />}/>
        <Route path='*' element = {<NotFound />}/>
        <Route path='/paymentsuccess' element = {<PaymentSuccess />}/>
        <Route path='/paymentfail' element = {<PaymentFail />}/>

        {/* Admin Routes */}

        <Route path='/admin/dashboard' element = {<Dashboard/>}/>
        <Route path='/admin/createcourse' element = {<CreateCourse/>}/>
        <Route path='/admin/courses' element = {<AdminCourses/>}/>
        <Route path='/admin/users' element = {<Users/>}/>
        

      </Routes>
      <Footer/>
    </Router>
  ); 
}

export default App

