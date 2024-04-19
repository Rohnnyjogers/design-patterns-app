import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }
    
    const userSignUp = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Sign-up Successful!');
            navigate('/shopping');
        }
        catch(error){
            alert('Sign-up failed: ', error.message);
            console.log('Sign-up failed: ', error);
        }
    }

    const userSignIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            alert('Sign-in Successful!');
            navigate('/shopping');
            
        }
        catch(error){
            alert('Sign-in failed: ', error.message);
            console.log('Sign-in failed', error);
        }
    }

    const adminSignIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('admin', JSON.stringify(true));
            alert('Admin Sign-in Successful!');
            navigate('/shopping');
            
        }
        catch(error){
            alert(' Admin Sign-in failed: ', error.message);
            console.log('Sign-in failed', error);
        }
    }

    return (
    <div className='loginCard'>
        <h3>Welcome</h3>
        <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailInput}
        />
        <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordInput}
        />
        <div className='loginCardButtons'>
            <button onClick={userSignIn}>Sign-in</button>
            <button onClick={userSignUp}>Sign-up</button>
            <button onClick={adminSignIn}>Admin Sign-in</button>
        </div>
    </div>
  )
}
