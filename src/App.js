import NavigationBar from './components/NavigationBar';
import Shopping from './screens/Shopping';
import Purchases from './screens/Purchases';
import Logout from './screens/Logout';
import './style.css';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './firebaseconfig';
import Login from './screens/Login';

function App() {
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthInitialized(true);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  console.log(user);

  return (
    <>
      {user ?
        <>
          <NavigationBar />
          <div className='screenContainer'>
            <Routes>
              <Route path='/shopping' element={<Shopping />} />
              <Route path='/purchases' element={<Purchases />} />
              <Route path='/logout' element={<Logout />} />
            </Routes>
          </div>
        </>
        :
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      }
    </>
  );
}

export default App;
