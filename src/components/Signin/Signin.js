import React from 'react';
import './Signin.css';
import amazonLogoSignin from './amazonLogoSignin.png';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useStateValue } from '../../StateProvider';
function Signin() {
  const [,dispatch]= useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: auth.currentUser,
        });
        navigate('/');
      })
      .catch((error) => {
        dispatch({
          type: "SET_USER",
          user: null,
        })
        alert(error.message);
      });
  };

  return (
    <div className='signin'>
      <Link to='/'>
        <img className='signinLogo' src={amazonLogoSignin} alt='LOGO' />
      </Link>
      <div className='signinContainer'>
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
          <h5>Password</h5>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant='contained' style={{ textTransform: 'none' }} type='submit' onClick={handleSubmit}>
            Sign In
          </Button>
        </form>
        <p>
          By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please see our Privacy Notice, our
          Cookies Notice, and our Interest-Based Ads Notice.
        </p>
        <Link to='/create-account'>
          <Button style={{ textTransform: 'none' }}>Create A new Account</Button>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
