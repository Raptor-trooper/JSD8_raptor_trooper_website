import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DataCategory } from '../Context/CategoryProvider'

const ProductPage = () => {

    const dataCategory = useContext(DataCategory)

    const { name } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const foundProduct = dataCategory.find(item => item.name === name);
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            console.log("Product not found with id:", name);
        }
    }, [name, dataCategory]);

    console.log(name);
    console.log(typeof (name));


    return (
        <div>
            <h1>Eiei</h1>
            {product ? (
                <div>{product.name}</div>
            ) : (
                <p>Product not found</p>
            )}

        </div>
    )
}

export default ProductPage