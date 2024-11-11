import React, { useContext, useEffect, useState } from 'react'
import { DataCategory } from '../Context/CategoryProvider'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Products = ({ categoryName }) => {

    // Get Data Product from DataCategory fetch from floder Context
    const { category } = useContext(DataCategory);

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
                        <Link to={`/productpage/${product.name}`} key={product.id}>

                            <div className="w-full h-auto duration-300 shadow-lg  rounded-b-md hover:scale-105">
                                <img src={product.image} alt={product.name} className='w-full h-[412px] object-cover rounded-t-md' />
                                <p className="p-2 pt-4 font-bold">{product.name}</p>
                                <p className="p-2">Starting at {product.price}</p>
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