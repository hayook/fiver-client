import '../css/gigs-section.css';

import { useEffect } from 'react';
import { useApi } from '../context/api';
import Gig from './Gig'
import Loading from './Loading'
import NoResults from './No-Results';
import Search from './Search';
import { useLocation, useParams } from 'react-router-dom'

export default function Gigs({ searchQuery }) {
    const { api, gigs, setGigs, isReady, setIsReady } = useApi();
    let reqUrl = api;
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        if (searchQuery) reqUrl = `${api}/search?q=${searchQuery}`
        setIsReady(false)
        fetch(reqUrl)
            .then(res => res.json())
            .then(data => {
                setGigs(data);
                if (id) setGigs(data.filter(gig => gig.userId === Number(id)))
                setIsReady(true)
            })
            .catch(() => console.log('Error'));
    }, [location]);

    return (
        <>
            {
                isReady
                    ?
                    gigs.length === 0
                        ?
                        <NoResults />
                        :
                        <section className='gigs'>
                            <div className="container">
                                <div className='search-box'>
                                    <Search />

                                </div>
                                <div className="gigs-list">
                                    {gigs.map(gig => {
                                        let { id, technologies } = gig;
                                        technologies = technologies.trim().length > 0 ? technologies.split(',') : [];
                                        return <Gig key={id} props={{ ...gig, technologies }} />
                                    })}
                                </div>
                            </div>
                        </section>
                    :
                    <Loading />
            }
        </>
    )

}
