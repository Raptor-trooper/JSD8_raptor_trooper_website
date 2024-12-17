import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Products = ({ categoryName, description }) => {

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
                    <h1 className='pt-16 text-5xl font-bold'> {categoryName} </h1>
                    <p className='my-8 indent-8'>{description}</p>
                    <hr />

                    {/* Link to Page */}
                    <div className='grid items-center w-full grid-cols-1 grid-rows-5 gap-4 my-8 md:flex'>
                        <Link to='/homeallproducts' className='rounded-full button'>All Product</Link>
                        <Link to='/homedecor' className='rounded-full button'>Home Decor</Link>
                        <Link to='/bathbody' className='rounded-full button'>Bath & Body</Link>
                        <Link to='/apparel' className='rounded-full button'>Apparel</Link>
                        <Link to='/accessories' className='rounded-full button'>Accessories</Link>
                    </div>
                </div>

                {/* Grid For Products and map DataCategory */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:m-[88px] gap-4 gap-y-6'>

                    {products.map((product) => (

                        <Link className='cursor-pointer' to={`/productpage/${product._id}`} key={product._id}>
                            <div className="m-8 overflow-hidden transition ease-in-out bg-white shadow-md hover:scale-105">
                                <img src={product.image[0]} alt={product.name} className='w-full h-[412px] object-cover transition ease-in-out' />
                                <p className='px-6 pt-4 text-lg font-bold'>{product.name}</p>
                                <p className='px-6 pb-4 text-gray-700 text-md '>Starting at <b>฿{product.price}</b></p>
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