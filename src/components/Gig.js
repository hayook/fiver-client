import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/api';

export default function Gig({ props }) {
    const { api, gigs, setGigs, user } = useApi();
    const { id, title, description, budget, technologies, userId } = props;
    const navigate = useNavigate();
    const { token } = localStorage;

    const handleDelete = async () => {
        const response = await fetch(`${api}/gig-${id}`, {
            method: 'DELETE',
            headers: { 'authorization': `Bearer ${token}` }
        });
        if (response.status === 200) {
            setGigs(gigs.filter(gig => gig.id !== id));
        } else {
            console.log('You Dont have the access to remove this gig');
        }
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
                {technologies.length > 0 && technologies.map((tech, id) => <p key={id} className="tech">{tech.trim()}</p>)}
            </div>
            {
                (user && (user.id == userId))
                &&
                <div className="functionalities">
                    <button onClick={handleDelete} className='delete-gig'>Delete</button>
                    <button onClick={handleEdit} className='edit-gig'>Edit</button>
                </div>
            }
        </div>
    )
}
