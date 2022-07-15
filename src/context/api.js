import { createContext, useContext, useState } from 'react';

const apiContext = createContext();
export const useApi = () => useContext(apiContext)

export default function ApiContextProvider(props) {
    const [gigs, setGigs] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const url = 'http://localhost:5000/api/gigs/'
    const [user, setUser] = useState(null) 
    // based on JWT i will know the user

    const values = {
        url,
        gigs, setGigs,
        isReady, setIsReady,
        user, setUser,
    }

    return (
        <apiContext.Provider value={values}>
            {props.children}
        </apiContext.Provider>
    )
}