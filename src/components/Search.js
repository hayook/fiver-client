import '../css/search-form.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [searchValue, setSearchValue] = useState(''); // the state took the initial value when the component rendered for the first time only 
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue) {
            navigate(`/search?q=${searchValue}`);
        }
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                name="q"
                type="text"
                autoComplete='off'
                placeholder='Type to search'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )
}