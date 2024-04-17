import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig';
import { signOut } from 'firebase/auth';

export default function Logout() {
  const navigate = useNavigate();

  const logout = async() => {
    try{
      await signOut(auth);
      alert('You have logged out')
      navigate('/login');
    }
    catch(error){
      console.log('Error signing out: ', error);
    }
  }

  return (
    <div style={{alignItems: 'center'}}>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
