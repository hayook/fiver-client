import '../css/add-gig-form.css'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../context/api';
import NotFound from './Not-Found';
import Loading from './Loading';

export default function AddGigForm() {
    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState(5);
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [notFound, setNotFound] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const { url } = useApi();
    const { gigId: id } = useParams();

    const fillForm = ({ title, budget, description, technologies }) => {
        setTitle(title);
        setBudget(budget);
        setDescription(description);
        setTechnologies(technologies);
    }
    const clearForm = () => {
        setTitle('');
        setBudget(5);
        setDescription('');
        setTechnologies('');
    }

    useEffect(() => {
        if (id) {
            fetch(url + `gig-${id}`)
                .then(res => res.json())
                .then(gig => {
                    setIsReady(true); 
                    if (gig) {
                        fillForm(gig)
                    } else {
                        setNotFound(true);
                    }
                })
                .catch(err => console.log('Error ' + err));
        } else {
            setIsReady(true)
        }
    }, [id, url])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let gig = { title, budget, description, technologies, userId: 1 };
        let method = 'POST';
        if (id) {
            gig = { ...gig, id };
            method = 'PUT';
        }
        const config = { gig, method }
        console.log(`Send a ${config.method} Request To ${url} with `)
        console.log(gig)
        await fetch(url, {
            method: config.method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(config.gig),
        });
        clearForm();
    }

    return (
        <>
            {
                isReady
                    ?
                    notFound
                        ?
                        <NotFound />
                        :
                        <section className='add-gig-form'>
                            <div className='container'>
                                <form className='add-gig-form' onSubmit={handleSubmit}>
                                    <label htmlFor="title">Gig Title</label>
                                    <input type="text" name='title' placeholder='Enter Gig Title' autoComplete='off'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label htmlFor="title">Gig Budget ($)</label>
                                    <input type="number" name='budget' placeholder='Enter Gig Budget' autoComplete='off'
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                    />
                                    <label htmlFor="title">Gig Description</label>
                                    <textarea name='description' placeholder='Enter Gig Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label htmlFor="title">Gig Technologies</label>
                                    <input type="text" name='technologies' placeholder='Enter Gig Technologies' autoComplete='off'
                                        value={technologies}
                                        onChange={(e) => setTechnologies(e.target.value)}
                                    />
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </section>
                    :
                    <Loading />
            }
        </>
    )
}