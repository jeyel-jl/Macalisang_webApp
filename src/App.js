import React from 'react'
import { Route, BrowserRouter as  Router, Routes } from 'react-router-dom'
import Auth from './screens/Auth/Auth'
import Login from './screens/Auth/Login'
import Home from './screens/Home/Home'
import Splash from './screens/start/Splash'
import Singleproduct from './screens/Singleproduct/Singleproduct'
import Addproduct from './screens/admin/Addproduct/Addproduct'
import Viewproduct from './screens/admin/ViewProduct/Viewproduct'
import Adminhome from './screens/admin/Home/Adminhome'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Splash/>} />
        <Route path='/Auth' element={<Auth/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/singleproduct/:id' element={<Singleproduct/>} />
        <Route path='/Addproduct' element={<Addproduct/>} />
        <Route path='/Adminhome' element={<Adminhome/>} />
        <Route path='/Viewproduct' element={<Viewproduct/>} />
      </Routes>
    </Router>
  )
}

export default App