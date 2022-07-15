import { useNavigate } from 'react-router-dom';
import {useApi} from '../context/api'; 

export default function Gig({ props }) {
    const {url, gigs, setGigs} = useApi(); 
    const { id, title, description, budget, technologies } = props;
    const navigate = useNavigate();

    const handleDelete = async () => {
        await fetch(url + `gig-${id}`, {method: 'DELETE'});
        setGigs(gigs.filter(gig => gig.id !== id));  
    }

    const handleEdit = () => {
        navigate(`/edit-gig-${id}`);
    }
    return (
        <div className='gig'>
            <h3>{title}</h3>
            <p className="description">{description.substring(0, 100)}...</p>
            <p className='budget'>{budget}$</p>
            <div className="technologies">
                {technologies.map((tech, id) => <p key={id} className="tech">{tech.trim()}</p>)}
            </div>
            <div className="functionalities">
                <button onClick={handleDelete} className='delete-gig'>Delete</button>
                <button onClick={handleEdit} className='edit-gig'>Edit</button>
            </div>
        </div>
    )
}
