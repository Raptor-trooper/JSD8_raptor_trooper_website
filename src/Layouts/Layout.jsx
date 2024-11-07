import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import AboutUs from '../pages/AboutUs'

const Layout = () => {
    return (
        <div>
            <Navbar />
            <AboutUs/>
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout