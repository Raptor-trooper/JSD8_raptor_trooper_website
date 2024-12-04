import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const DataCategory = createContext();

const CategoryProvider = ({ children }) => {

    const [category, setCategory] = useState([]);

    // const Api = process.env.REACT_APP_API_URL || "https://672db6ccfd89797156435c66.mockapi.io/ApiTrooper/category"

    const Api = "https://672db6ccfd89797156435c66.mockapi.io/ApiTrooper/category"

    const FetchCategory = async () => {
        try {
            const response = await axios.get(`${Api}`)
            setCategory(response.data)
        } catch (error) {
            console.log('Error get Api', error);
        }
    }

    useEffect(() => {
        FetchCategory()
    }, [])

    return (
        <DataCategory.Provider value={{ category }}>
            {children}
        </DataCategory.Provider>
    )
}

export default CategoryProvider