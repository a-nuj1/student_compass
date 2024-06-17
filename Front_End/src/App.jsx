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

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/courses' element = {<Courses/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/forgetpassword' element = {<ForgetPass />}/>
        <Route path='/resetpassword/:token' element = {<ResetPass />}/>
      </Routes>
      <Footer/>
    </Router>
  ); 
}

export default App

