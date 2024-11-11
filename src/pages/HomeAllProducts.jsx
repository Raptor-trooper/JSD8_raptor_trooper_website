import React, { useContext, useEffect, useState } from 'react'
import { DataCategory } from '../Context/CategoryProvider'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

const HomeAllProducts = () => {

    // Get Data Product from DataCategory fetch from folder Context
    const dataCategory = useContext(DataCategory)

    // State for filter show products
    const [selectedCategory, setSelectedCategory] = useState("All Product")

    // State for loading...
    const [loading, setLoading] = useState(true)

    // Loading ... Effect
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    // Get category type and set state to show user
    const handleFilter = (category) => {
        setSelectedCategory(category)
    }

    // Function Filter DataCategory to show
    const filterFunction = selectedCategory === "All Product"
        ? dataCategory
        : dataCategory.filter(item => item.category === selectedCategory)

    return (
        <div>
            {/* Loading... Page if state True */}
            {loading ? <Loading /> : <div>
                {/* Header */}
                <div className='px-[88px] mx-auto'>
                    {/* Title */}
                    {selectedCategory ? (<h1 className='text-5xl mt-16 font-bold'>{selectedCategory}</h1>) : (<h1>Error 404</h1>)}

                    {/* Description */}
                    <p className='my-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, unde.</p>

                    <hr />

                    {/* Button Dropdown for Filter */}
                    <details className="dropdown mt-12">
                        <summary className="btn m-1">Filter</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow font-bold">
                            <li><button onClick={() => handleFilter("All Product")}>ALL</button></li>
                            <li><button onClick={() => handleFilter("Home Decor")}>Home Decor</button></li>
                            <li><button onClick={() => handleFilter("Bath & Body")}>Bath & Body</button></li>
                            <li><button onClick={() => handleFilter("Apparel")}>Apparel</button></li>
                            <li><button onClick={() => handleFilter("Accessories")}>Accessories</button></li>
                        </ul>
                    </details>
                </div>

                {/* Grid For Products */}
                <div className='grid grid-cols-2 gap-8 m-4 md:grid-cols-3 md:mx-[88px]'>

                    {/* map DataCategory and if use Filter */}
                    {filterFunction.map((product) => (
                        // Link to ProductPage and pass productId
                        <Link key={product.id} to={`/productpage/${product.name}`}>
                            <div className="w-full h-auto rounded-b-md shadow-lg hover:scale-105 duration-300">
                                <img src={product.image} alt={product.name} className='w-full h-[412px] object-cover rounded-t-md' />
                                <p className='p-2 pt-4 font-bold'>{product.name}</p>
                                <p className='p-2'>Starting at <b>{product.price}$</b></p>
                            </div>
                        </Link>
                    ))}

                </div>

            </div>}
        </div>
    )
}

export default HomeAllProducts
