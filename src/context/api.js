import { createContext, useContext, useState } from 'react';

const apiContext = createContext();
export const useApi = () => useContext(apiContext)

export default function ApiContextProvider(props) {
    const [gigs, setGigs] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const server = 'http://localhost:5000'
    const api = server + '/api/gigs'
    const [user, setUser] = useState(null) 
    // based on JWT i will know the user

    const values = {
        api,
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