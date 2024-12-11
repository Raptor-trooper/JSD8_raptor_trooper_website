import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layouts/Layout'
import Home from './pages/Home'
import HomeAllProducts from './pages/HomeAllProducts'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckOutPage from './pages/CheckOutPage'
import Login from './pages/Login'
import ChangePassword from './pages/ChangePassword'
import ResetPassword from './pages/ResetPassword'
import UserProfile from './pages/UserProfile'
import Admin from './pages/Admin'
import ShopContextProvider from './Context/ShopContext'
import HomeDecor from './pages/HomeDecor'
import BathBody from './pages/BathBody'
import Apparel from './pages/Apparel'
import Accessories from './pages/Accessories'
import AboutUs from './pages/AboutUs'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
        path: '/productpage/:productId',
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
        path: '/changepassword',
        element: <ChangePassword />
      },
      {
        path: '/resetpassword',
        element: <ResetPassword />
      },
      {
        path: '/UserProfile',
        element: <UserProfile />
      },
      {
        path: '/admin/*',
        element: <Admin />,
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
    ]
  }
])

function App() {

  return (
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  )
}

export default App