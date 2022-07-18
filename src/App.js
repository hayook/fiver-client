import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Gigs from './components/Gigs';
import Search from './components/Search';
import AddGigForm from './components/Add-Gig-Form'
import NoResults from './components/No-Results';
import Login from './components/Login';
import Loading from './components/Loading'; 
import Register from './components/Register';
import NotFound from './components/Not-Found';
import Profile from './components/Profile';
import { useApi } from './context/api';
import { useEffect, useState } from 'react';
import jwt from 'jwt-decode';

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const location = useLocation();
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const searchQuery = query.get('q');
    const { setUser, server } = useApi();
    const { token } = localStorage;
    
    useEffect(() => {
        if (token) {
            const { userId } = jwt(token);
            fetch(`${server}/users/user-${userId}`, {
                headers: { 'authorization': `Bearer ${token}` },
            })
                .then(res => res.json()) // here may there is an error because the signiture doesnt match so handle this
                .then(user => {
                    setUser(user)
                    setIsReady(true)
                });
            } else {
                setIsReady(true)
            }
        }, [token]);

    return (
        <>
            {
                isReady
                ?
                <>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Search />} />
                        <Route path='/all-gigs' element={<Gigs />} />
                        <Route path='/search' element={searchQuery ? <Gigs searchQuery={searchQuery} /> : <NoResults />} />
                        <Route path='/add-gig' element={<AddGigForm />} />
                        <Route path='/edit-gig-:gigId' element={<AddGigForm />} />
                        <Route path='/user=:id/gigs' element={<Gigs />} />
                        <Route path='/user=:id/profile' element={<Profile />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </>
                : 
                <Loading />
            }
        </>
    )
}

