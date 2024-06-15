import './App.css'
import React from 'react'
import {BrowserRouter as Router, Route, Routes}from "react-router-dom"
import Home from './components/Home'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
      </Routes>
    </Router>
  ); 
}

export default App

