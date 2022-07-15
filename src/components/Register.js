import React from 'react'

export default function Register() {
  return (
    <form className='auth'>
      <label>Username</label>
      <input type='text' autoComplete='off' placeholder='Enter Username' />
      <label>Email</label>
      <input type='email' autoComplete='off' placeholder='Enter Email' />
      <label>Password</label>
      <input type='password' autoComplete='off' placeholder='Enter Password' />
      <label>Confirm Password</label>
      <input type='password' autoComplete='off' placeholder='Enter Password To Confirm' />
      <button type="submit">Login</button>
    </form>
  )
}
