import NavigationBar from './components/NavigationBar';
import Shopping from './screens/Shopping';
import Purchases from './screens/Purchases';
import Logout from './screens/Logout';
import Details from './screens/Details';
import UserDetails from './screens/UserDetails';
import './style.css';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth, database } from './firebaseconfig';
import Login from './screens/Login';
import { get, ref, set } from 'firebase/database';
import { ItemBuilder } from './Patterns';
import AddItem from './screens/AddItem';

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const buildItems = () => {
    const titles = ['Carrots', 'Apples', 'Celery', 'Oranges', 'Broccoli'];
    const categories = ['Vegetables', 'Fruit', 'Vegetables', 'Fruit', 'Vegetable'];
    const manufacturers = ['Del Monte', 'Fyffes', 'Del Monte', 'Fyffes', 'Del Monte'];
    const prices = [2, 1.5, 1, 1.5, 2, 2];
    let items = [];

    for (let i = 0; i < 5; i++) {
      const builder = new ItemBuilder(titles[i]);
      builder.setCategory(categories[i]);
      builder.setManufacturer(manufacturers[i]);
      builder.setPrice(prices[i]);
      builder.setQuantity(10);

      items.push(builder.item);
    }
    return items;
  }

  const checkDbForItems = async () => {
    const dbRef = ref(database, `/products`);

    try {
      const productsSnapshot = await get(dbRef);

      if (productsSnapshot.exists()) {
        return;
      }
      else {
        const items = buildItems();
        await set(dbRef, items);
      }
    } catch (error) {
      console.log('Error checking database', error);
    }
  }



  useEffect(() => {
    const adminState = localStorage.getItem('admin');
    if(adminState != null){
      setAdmin(JSON.parse(adminState));
    }

    checkDbForItems();

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      {user ?
        <>
          <NavigationBar />
          <div className='screenContainer'>
            <Routes>
              <Route path='/addItems' element={<AddItem/>}/>
              <Route path='/details' element={<Details/>}/>
              <Route path='/shopping' element={<Shopping/>}/>
              <Route path='/userDetails' element={<UserDetails/>}/>
              <Route path='/purchases' element={<Purchases/>}/>
              <Route path='/logout' element={<Logout/>}/>
            </Routes>
          </div>
        </>
        :
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      }
    </>
  );
}

export default App;
