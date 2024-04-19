import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig';
import { signOut } from 'firebase/auth';

export default function Logout() {
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminState = localStorage.getItem('admin');
    if (adminState != null) {
      setAdmin(JSON.parse(adminState));
    }
  }, []);

  const logout = async () => {
    try {
      if(admin){
        setAdmin(false);
        localStorage.removeItem('admin');
      }

      await signOut(auth);
      alert('You have logged out')
      navigate('/login');
    }
    catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <div style={{ alignItems: 'center' }}>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
