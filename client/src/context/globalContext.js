import React, { useContext, useState } from 'react';
import axios from 'axios';
const GlobalContext = React.createContext();
const BASE_URL="http://localhost:5000/api/portfolio/"

export const GlobalProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-projects`)
            setProjects(response.data)
            console.log(response.data)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                error,
                setError,
                getProjects,
                projects
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(GlobalContext)
}