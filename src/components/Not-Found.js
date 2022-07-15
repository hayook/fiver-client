import '../css/not-found.css'; 

import {Link} from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='not-found'>
            <h1>404</h1>
            <h1>Page Not Found</h1>
            <Link to="/">Back Home</Link>
        </div>
    )
}
