import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Gigs from './components/Gigs';
import Search from './components/Search';
import AddGigForm from './components/Add-Gig-Form'
import NoResults from './components/No-Results';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/Not-Found';
import { useApi } from './context/api';

export default function Home() {
    const location = useLocation();
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const searchQuery = query.get('q');

    const { user } = useApi();

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Search />} />
                <Route path='/all-gigs' element={<Gigs />} />
                <Route path='/search' element={searchQuery ? <Gigs searchQuery={searchQuery} /> : <NoResults />} />
                <Route path='/add-gig' element={user ? <AddGigForm /> : <Login />} />
                <Route path='/edit-gig-:gigId' element={user ? <AddGigForm /> : <Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

