import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import React, { useState } from 'react'

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        }
        catch(error){
            alert('Sign-in failed: ', error.message);
            console.log('Sign-in failed', error);
        }
    }
    const adminSignIn = async () => {}

    return (
    <div className='loginCard'>
        <h3>Sign-up</h3>
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
            <button>Admin Sign-in</button>
        </div>
    </div>
  )
}
