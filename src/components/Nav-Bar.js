import { Link } from 'react-router-dom';
import {useApi} from '../context/api'; 

export default function NavBar() {
    const {user, setUser} = useApi()

    const handlelogout = () => {
        localStorage.removeItem('token'); 
        setUser(null)
    }

    return (
        <nav>
            <ul>
                <Link to="/all-gigs">All Gigs</Link>
                {user ? (
                    <>
                        <Link to="/add-gig">Add Gig</Link>
                        <Link to={`/user=${user.id}/gigs`}>My Gigs</Link>
                        <Link to={`/user=${user.id}/profile`}>{user.username}</Link>
                        <button className='logout' onClick={handlelogout}>Logout</button>
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