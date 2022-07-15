import { Link } from 'react-router-dom';
import {useApi} from '../context/api'; 

export default function NavBar() {

    const {user} = useApi();

    return (
        <nav>
            <ul>
                <Link to="/all-gigs">All Gigs</Link>
                {user ? (
                    <>
                        <Link to="/add-gig">Add Gig</Link>
                        <Link to="/:userId/gigs">My Gigs</Link>
                        <Link to="/user-id">{user.username || 'Username'}</Link>
                        <button>Logout</button>
                    </>
                ) : (
                    <div className="auth">
                        <Link className="register" to="/register">Register</Link>
                        <Link to="/login" className='login'>Login</Link>
                    </div>
                )}
            </ul>
        </nav>
    )
}