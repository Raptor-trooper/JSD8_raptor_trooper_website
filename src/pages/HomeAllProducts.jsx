import React, { useContext, useEffect, useState } from 'react'
import { DataCategory } from '../Context/CategoryProvider'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

const HomeAllProducts = () => {

    // Get Data Product from DataCategory fetch from folder Context
    const { category } = useContext(DataCategory)

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

                    <h1 className='text-5xl mt-16 font-bold'> All Products </h1>
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
                <div className='grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 md:mx-[88px]'>

                    {category.map((product) => (
                        <Link className=' cursor-pointer' to={`/productpage/${product.name}`} key={product.id}>

                            <div className="rounded-b-md overflow-hidden ease-in-out hover:scale-105 m-4 transition shadow-xl">
                                <img src={product.image} alt={product.name} className='w-full h-[412px] object-cover rounded-t-md' />
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

// ===========================  Filter Function ===========================

// State for filter show products
// const [selectedCategory, setSelectedCategory] = useState("All Product")

// Get category type and set state to show user
// const handleFilter = (category) => {
//     setLoading(true);
//     setSelectedCategory(category);
// }

// Function Filter DataCategory to show
// const filterFunction = selectedCategory === "All Product"
//     ? dataCategory
//     : dataCategory.filter(item => item.category === selectedCategory);

/* {selectedCategory ? (<h1 className='text-5xl mt-16 font-bold'>{selectedCategory}</h1>) : (<h1>Error 404</h1>)} */

/* <div className='grid grid-cols-1 grid-rows-5 gap-4 w-full my-8 md:flex'>
        <button onClick={() => handleFilter("All Product")} className='bg-black text-white p-2 text-center rounded-full shadow-md'>ALL</button>
        <button onClick={() => handleFilter("Home Decor")} className='bg-black text-white p-2 text-center rounded-full shadow-md'>Home Decor</button>
        <button onClick={() => handleFilter("Bath & Body")} className='bg-black text-white p-2 text-center rounded-full shadow-md'>Bath & Body</button>
        <button onClick={() => handleFilter("Apparel")} className='bg-black text-white p-2 text-center rounded-full shadow-md'>Apparel</button>
        <button onClick={() => handleFilter("Accessories")} className='bg-black text-white p-2 text-center rounded-full shadow-md'>Accessories</button>
    </div> */

