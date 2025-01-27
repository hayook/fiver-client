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
    const { api, user } = useApi();
    const {token} = localStorage; 
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
            fetch(api + `gig-${id}`)
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
    }, [id, api])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let gig = { title, budget, description, technologies };
        let method = 'POST';
        if (id) {
            gig = { ...gig, id };
            method = 'PUT';
        }
        const config = { gig, method }
        const response = await fetch(api, {
            method: config.method,
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(config.gig),
        });
        if(response.status === 200) {
            clearForm();
        } else {
            const data = await response.json()
            console.log(data.message)
        }
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
                                    <label htmlFor="title">Offer title</label>
                                    <input type="text" name='title' placeholder='Enter offer title' autoComplete='off'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label htmlFor="title">Offer budget ($)</label>
                                    <input type="number" name='budget' placeholder='Enter offer budget' autoComplete='off'
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                    />
                                    <label htmlFor="title">Offer description</label>
                                    <textarea name='description' placeholder='Enter offer description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label htmlFor="title">Offer technologies</label>
                                    <input type="text" name='technologies' placeholder='Enter offer technologies' autoComplete='off'
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
