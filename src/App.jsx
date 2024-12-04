import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layouts/Layout'
import Home from './pages/Home'
import HomeAllProducts from './pages/HomeAllProducts'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckOutPage from './pages/CheckOutPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ChangePassword from './pages/ChangePassword'
import ResetPassword from './pages/ResetPassword'
import UserProfile from './pages/UserProfile'
import Admin from './pages/Admin'
import CategoryProvider from './Context/CategoryProvider'
import CartProvider from './Context/CartContext'
import HomeDecor from './pages/HomeDecor'
import BathBody from './pages/BathBody'
import Apparel from './pages/Apparel'
import Accessories from './pages/Accessories'
import AboutUs from './pages/AboutUs'
import Address from './pages/Address'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/homeallproducts',
        element: <HomeAllProducts />
      },
      {
        path: '/productpage/:name',
        element: <ProductPage />
      },
      {
        path: '/cartpage',
        element: <CartPage />
      },
      {
        path: '/checkoutpage',
        element: <CheckOutPage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/changepassword',
        element: <ChangePassword />
      },
      {
        path: '/resetpassword',
        element: <ResetPassword />
      },
      {
        path: '/userprofile',
        element: <UserProfile />
      },
   
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/homedecor',
        element: <HomeDecor />
      },
      {
        path: '/bathbody',
        element: <BathBody />
      },
      {
        path: '/apparel',
        element: <Apparel />
      },
      {
        path: '/accessories',
        element: <Accessories />
      },
      {
        path: '/aboutus',
        element: <AboutUs />
      },
      {
        path: '/address',
        element: <Address />
      },
     
    ]
  }
])

function App() {

  return (
      <CategoryProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </CategoryProvider>
  )
}

export default App