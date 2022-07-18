import '../css/auth.css'

import { useState } from 'react';
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {server} = useApi()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = { email, password };
    const response = await fetch(server + '/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await response.json()
    if (response.status === 403) {
      setPassword('');
      setError(data)
    } else {
      const token = data; 
      localStorage.setItem('token', token);
      navigate('/');
    }
  }

  return (
    <form className='auth'>
      {error && <p className='validation-error'>{error.message}</p>}
      <label>Email</label>
      <input type='email' autoComplete='off' placeholder='Enter Email' value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input type='password' autoComplete='off' placeholder='Enter Password' value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>Login</button>
    </form>
  )
}

export default Login