import '../css/not-found.css'; 
import {Link} from 'react-router-dom';

export default function NoResults() {
    return (
        <div className='not-found'>
            <h1 className="no-results">No Resullts</h1>
            <Link to="/">Back Home</Link>
        </div>
    )
}
