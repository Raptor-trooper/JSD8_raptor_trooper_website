import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

const HomeAllProducts = () => {

    // Get Data Product from DataCategory fetch from folder Context
    const { category } = useContext(ShopContext)

    // State for loading...
    const [loading, setLoading] = useState(true);

    // Loading ... Effect
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [loading])

    return (
        <div>
            {/* Loading... Page if state True */}
            {loading ? <Loading /> : <div>
                {/* Header */}
                <div className='px-[88px] mx-auto'>

                    <h1 className='text-5xl pt-16 font-bold'> All Products </h1>
                    <p className='my-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, unde.</p>
                    <hr />

                    {/* Link to Page */}
                    <div className='grid grid-cols-1 grid-rows-5 gap-4 w-full my-8 md:flex'>
                        <Link to='/homeallproducts' className='bg-black text-white p-2 text-center rounded-full shadow-md'>All Product</Link>
                        <Link to='/homedecor' className='bg-black text-white p-2 text-center rounded-full shadow-md'>Home Decor</Link>
                        <Link to='/bathbody' className='bg-black text-white p-2 text-center rounded-full shadow-md'>Bath & Body</Link>
                        <Link to='/apparel' className='bg-black text-white p-2 text-center rounded-full shadow-md'>Apparel</Link>
                        <Link to='/accessories' className='bg-black text-white p-2 text-center rounded-full shadow-md'>Accessories</Link>
                    </div>
                </div>

                {/* Grid For Products and map DataCategory */}
                <div className='grid grid-cols-1 md:grid-cols-4 md:m-[88px] gap-4 gap-y-6'>

                    {category.map((product) => (

                        <Link className='cursor-pointer' to={`/productpage/${product._id}`} key={product._id}>
                            <div className="overflow-hidden ease-in-out hover:scale-105 shadow-md m-8 transition bg-white">
                                <img src={product.image[0]} alt={product.name} className='w-full h-[412px] object-cover transition ease-in-out' />
                                <p className='px-6 pt-4 text-lg font-bold'>{product.name}</p>
                                <p className='text-gray-700 px-6 pb-4 text-md '>Starting at <b>฿{product.price}</b></p>
                            </div>
                        </Link>

                    ))}

                </div>
            </div>}
        </div>
    )
}

export default HomeAllProducts