import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Products = ({ categoryName }) => {

    // Get Data Product from DataCategory fetch from floder Context
    const { category } = useContext(ShopContext);

    // State for loading...
    const [loading, setLoading] = useState(true);

    // Loading ... Effect
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [loading]);

    const products = category.filter(item => item.category === categoryName);

    return (
        <div>
            {/* Loading... Page if state True*/}
            {loading ? <Loading /> : <div>

                {/* Header */}
                <div className='px-[88px] mx-auto'>
                    <h1 className='mt-16 text-5xl font-bold'> {categoryName} </h1>
                    <p className='my-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, unde.</p>
                    <hr />

                    {/* Link to Page */}
                    <div className='grid w-full grid-cols-1 grid-rows-5 gap-4 my-8 md:flex'>
                        <Link to='/homeallproducts' className='p-2 text-center text-white bg-black rounded-full shadow-md'>All Product</Link>
                        <Link to='/homedecor' className='p-2 text-center text-white bg-black rounded-full shadow-md'>Home Decor</Link>
                        <Link to='/bathbody' className='p-2 text-center text-white bg-black rounded-full shadow-md'>Bath & Body</Link>
                        <Link to='/apparel' className='p-2 text-center text-white bg-black rounded-full shadow-md'>Apparel</Link>
                        <Link to='/accessories' className='p-2 text-center text-white bg-black rounded-full shadow-md'>Accessories</Link>
                    </div>
                </div>

                {/* Grid For Products and map DataCategory */}
                <div className='grid grid-cols-2 gap-8 m-4 md:grid-cols-3 md:mx-[88px]'>
                    {products.map(product => (
                        <Link className=' cursor-pointer' to={`/productpage/${product.name}`} key={product.id}>

                            <div className="rounded-b-md overflow-hidden ease-in-out hover:scale-105 m-4 transition shadow-xl">
                                <img src={product.image[0]} alt={product.name} className='w-full h-[412px] object-cover rounded-t-md' />
                                <p className='px-6 pt-4 text-lg font-bold'>{product.name}</p>
                                <p className='text-gray-700 px-6 pb-4 text-md '>Starting at <b>฿{product.price}</b></p>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>
            }
        </div>
    );
};

export default Products