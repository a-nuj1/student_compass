import './App.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
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
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { getMyProfile } from './redux/actions/user'
import { ProtectedRoute } from 'protected-route-react'
import Loader from './components/Layout/Loader/Loader'

function App() {

  // window.addEventListener('contextmenu',(e) =>{
  //   e.preventDefault()
  // })

  const { isAuthenticated, user, message, error, loading } = useSelector(state => state.user)

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });

    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, message, error]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);



  return (
    <Router>
      {
        loading ? (<Loader />) : (
          <>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>

              {/* pages */}
              <Route path='/' element={<Home />} />
              <Route path='/courses' element={<Courses />} />
              <Route path='/course/:id' element={<CourseDetails />} />

              <Route path='/changepassword' element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePass />
                </ProtectedRoute>
              } />

              <Route path='/updateprofile' element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user = {user} />
                </ProtectedRoute>
              } />
              <Route path='/contact' element={<Contact />} />
              <Route path='/request' element={<Request />} />
              <Route path='/about' element={<About />} />

              <Route
                path='/profile'
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <Profile user={user}/>
                  </ProtectedRoute>
                } />

              <Route path='/login' element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                  <Login />
                </ProtectedRoute>
              } />

              <Route path='/signup' element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
                  <Signup />
                </ProtectedRoute>
              } />

              <Route path='/forgetpassword' element={<ForgetPass />} />
              <Route path='/resetpassword/:token' element={<ResetPass />} />
              <Route path='/subscribe' element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe />
                </ProtectedRoute>
              } />
              <Route path='*' element={<NotFound />} />

              <Route path='/paymentsuccess' element={<PaymentSuccess />} />
              <Route path='/paymentfail' element={<PaymentFail />} />

              {/* Admin Routes */}

              <Route path='/admin/dashboard' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}>

                  <Dashboard />

                </ProtectedRoute>
              } />
              <Route path='/admin/createcourse' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}>


                  <CreateCourse/>

                </ProtectedRoute>
                } />
              <Route path='/admin/courses' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}>
                  
                  <AdminCourses />

                </ProtectedRoute>
  
                
                } />
              <Route path='/admin/users' element={
                <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}>

                  <Users />
                  
                </ProtectedRoute> }
              />
            </Routes>
            <Footer />
            <Toaster />

          </>
        )
      }
    </Router>
  );
}

export default App

