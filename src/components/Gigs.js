import '../css/gigs-section.css';

import { useEffect } from 'react';
import { useApi } from '../context/api';
import Gig from './Gig'
import Loading from './Loading'
import NoResults from './No-Results';
import Search from './Search';
import {useLocation} from 'react-router-dom'

export default function Gigs({ searchQuery }) {
    const { url, gigs, setGigs, isReady, setIsReady } = useApi();
    let reqUrl = url; 
    const location = useLocation();
    useEffect(() => {
        if(searchQuery) reqUrl = `${url}search?q=${searchQuery}` 
        setIsReady(false)
        fetch(reqUrl)
            .then(res => res.json())
            .then(data => {
                setGigs(data)
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
                                        technologies = technologies.split(',');
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
