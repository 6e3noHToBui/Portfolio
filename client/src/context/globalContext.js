import React, { useContext, useState } from 'react';
import axios from 'axios';
const GlobalContext = React.createContext();
const BASE_URL="http://localhost:5000/api/portfolio/"

export const GlobalProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-projects?lang=${localStorage.getItem('language')}`)
            setProjects(response.data)
        } catch (error) {
            setError(error.message)
        }
    }
    const sendMessage = async (formData, onSuccess, onError) => {
        try {
            const response = await axios.post(`${BASE_URL}send-message`, formData);
            if (response.status === 200) {
                onSuccess(response.data);
            }
        } catch (error) {
            onError(error);
            console.log(error.response.data.error[0])
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                error,
                setError,
                getProjects,
                sendMessage,
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