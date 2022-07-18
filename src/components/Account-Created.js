import {Link} from 'react-router-dom' 

export default function AccountCreated() {
    return (
        <div className='account-created'>
            <h4>Account Created Successfuly</h4>
            <Link to='/login'>Login</Link>
        </div>
    )
}