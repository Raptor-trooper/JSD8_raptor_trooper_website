import React, { useContext, useEffect, useState } from 'react'
import { DataCategory } from '../Context/CategoryProvider'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

const HomeDecor = () => {

    const dataCategory = useContext(DataCategory)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])

    const filterCate = dataCategory.filter(item => item.category === "Home Decor")

    return (
        <div>
            {loading ? <Loading /> : <div>
                <div className='px-[88px] mx-auto'>

                    <h1 className='text-5xl font-bold pt-20 pb-4'>Home Decor</h1>
                    <p className='py-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolorum perferendis animi voluptatum natus atque quibusdam nesciunt dolores voluptatibus quas?</p>

                    <hr />
                    {/* <button onClick={Filter}>filter</button> */}

                    <div className='grid grid-cols-1 grid-rows-5 gap-6 w-full my-8 md:flex'>
                        <Link to='/homeallproducts' className='bg-black text-white p-2 text-center rounded-lg font-bold shadow-md'><button>All</button></Link>
                        <Link to='' className='bg-black text-white p-2 text-center rounded-lg font-bold shadow-md'><button>Home Decor</button></Link>
                        <Link to='' className='bg-black text-white p-2 text-center rounded-lg font-bold shadow-md'><button>Bath & Body</button></Link>
                        <Link to='' className='bg-black text-white p-2 text-center rounded-lg font-bold shadow-md'><button>Apparel</button></Link>
                        <Link to='' className='bg-black text-white p-2 text-center rounded-lg font-bold shadow-md'><button>Accessories</button></Link>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-8 m-4 md:grid-cols-3 md:mx-[88px]'>
                    {filterCate.map((product, index) => (
                        <Link to='/productpage'>
                            <div key={index} className=" w-full h-auto rounded-b-md shadow-lg hover:scale-105 duration-300">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='object-cover w-full h-[412px] rounded-t-md'
                                />
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

export default HomeDecor