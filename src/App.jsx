import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import HomeAllProducts from './pages/HomeAllProducts'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckOutPage from './components/CheckOutPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ChangePassword from './pages/ChangePassword'
import ResetPassword from './pages/ResetPassword'
import UserProfile from './pages/UserProfile'
import UserEditProfile from './pages/UserEditProfile'
import Admin from './pages/Admin'
import Layout from './Layouts/Layout'

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
        path: '/productpage',
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
        path: '/usereditprofile',
        element: <UserEditProfile />
      },
      {
        path: '/admin',
        element: <Admin />
      },
    ]
  }
])

function App() {

  return (
    <Navbar />
    <div>
      <RouterProvider router={router} />
    </div>
  )
}




