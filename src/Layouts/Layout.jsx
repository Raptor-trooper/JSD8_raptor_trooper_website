import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Layout = () => {
    return (
        <div className='bg-white text-black'>
            <Navbar />
            <Outlet />
            <Footer />
            {/* <style>
                {`
                    input,
                    textarea {
                        background-color: #ffffff; 
                        color: #000000; 
                        border: 1px solid #ccc; 
                        padding: 0.5rem; 
                        border-radius: 5px;
                    }

                    input:-webkit-autofill {
                        background-color: #ffffff !important;
                        -webkit-text-fill-color: #000000 !important;
                    }
                `}
            </style> */}
        </div>
    )
}

export default Layout 