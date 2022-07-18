import { useState } from 'react'
import AccountCreated from './Account-Created';
import {useApi} from '../context/api'

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null);
  const {server} = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, email, password };
    const response = await fetch(server + '/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    });
    if(response.status === 200) {
      setIsSignUp(prev => !prev); 
      setError(null); 
    } else setError(await response.json()); 
  }

  return (
    <>
      {isSignUp ? (
        <AccountCreated />
      ) : (
        <form className='auth'>
          {error && <p className='validation-error'>{error.message}</p>}
          <label>Username</label>
          <input type='text' name="username" autoComplete='off' placeholder='Enter Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input type='email' name="email" autoComplete='off' placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input type='password' name="password" autoComplete='off' placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input type='password' name="confirmPassword" autoComplete='off' placeholder='Enter Password To Confirm'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
      )
      }
    </>
  )
}
