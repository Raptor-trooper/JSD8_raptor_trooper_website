import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'


const Layout = () => {
    return (
        <div className='text-black bg-gray-100'>

            <Navbar />
            <div className='min-h-screen pt-20'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout 