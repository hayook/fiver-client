import '../css/auth.css'
import {GoogleLogin} from 'react-google-login'; 

function Login() {
  return (
        <form className='auth'>
          <label>Email</label>
          <input type='email' autoComplete='off' placeholder='Enter Email'/>
          <label>Password</label>
          <input type='password' autoComplete='off' placeholder='Enter Password'/>
          <button type="submit">Login</button>
          <GoogleLogin />
        </form>
  )
}

export default Login