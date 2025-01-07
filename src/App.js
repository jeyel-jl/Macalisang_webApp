import React from 'react'
import { Route, BrowserRouter as  Router, Routes } from 'react-router-dom'
import Auth from './screens/Auth/Auth'
import Login from './screens/Auth/Login'
import Home from './screens/Home/Home'
import Splash from './screens/start/Splash'
import Addproduct from './screens/admin/Addproduct/Addproduct'
import Viewproduct from './screens/admin/ViewProduct/Viewproduct'
import Adminhome from './screens/admin/Home/Adminhome'
import Cart from './components/Cart/Cart'
import AllProducts from './screens/admin/AllProducts/AllProducts'
import Footer from './components/Footer/Footer'
import AboutPage from './screens/Navs/AboutPage'
import ProductsPage from './screens/Navs/ProductPage'
import ServicePage from './screens/Navs/ServicePage'
import SearchPage from './screens/Navs/SearchPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Splash/>} />
        <Route path='/Auth' element={<Auth/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/Addproduct' element={<Addproduct/>} />
        <Route path='/Adminhome' element={<Adminhome/>} />
        <Route path='/Viewproduct' element={<Viewproduct/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/AllProducts' element={<AllProducts/>} />
        <Route path='/Footer' element={<Footer/>} />
        <Route path='/ServicePage' element={<ServicePage/>} />
        <Route path='/AboutPage' element={<AboutPage/>} />
        <Route path='/ProductPage' element={<ProductsPage/>} />
        <Route path='/SearchPage' element={<SearchPage/>} />
      </Routes>
    </Router>
  )
}

export default App