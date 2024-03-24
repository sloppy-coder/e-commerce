import React from 'react';
import './CreateAccount.css';
import amazonLogoSignin from './amazonLogoSignin.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@mui/material';
import { auth, createUserWithEmailAndPassword } from '../../firebase.js';
import { updateProfile } from 'firebase/auth';

function CreateAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const createNewAccount = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          return updateProfile(user, {
            displayName: `${firstName} ${lastName}`
          });
        }
      })
      .then(() => {
        navigate('/signin');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className='createAccount'>
      <Link to='/'>
        <img className='signinLogo' src={amazonLogoSignin} alt='LOGO' />
      </Link>
      <div className='signinContainer'>
        <Link to='/signin' className='signInLink'>
          <span>Sign-in</span>
        </Link>
        <form>
          <h5>First Name</h5>
          <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <h5>Last Name</h5>
          <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
          <h5>Password</h5>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </form>
        <p>
          By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.
        </p>
        <Button type='submit' style={{ textTransform: 'none' }} onClick={createNewAccount}>
          Create A new Account
        </Button>
      </div>
    </div>
  );
}

export default CreateAccount;
