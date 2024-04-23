import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard'
import { child, get, onValue, ref, set, update } from 'firebase/database';
import { auth, database } from '../firebaseconfig';

// Subject class
class SearchSubject{
  constructor(){
    this.observers = [];
    this.searchParams = {
      title: '',
      category: '',
      manufacturer: ''
    }
  }

  addObserver(observer){
    this.observers.push(observer);
  }

  removeObserver(oberver){
    this.observers = this.observers.filter(ob => ob != oberver);
  }

  notifyObservers(){
    this.observers.forEach(observer => observer.update(this.searchParams));
  }

  isEqual(x,y){
    return JSON.stringify(x) === JSON.stringify(y);
  }

  setSearchParams(params){
    if(!this.isEqual(this.searchParams, params)){
      this.searchParams = params;
      this.notifyObservers();
    }
  }
}

const searchSubject = new SearchSubject();

export default function Shopping() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [details, setDetails] = useState({});
  const [admin, setAdmin] = useState(false); 

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const adminState = localStorage.getItem('admin');
    if(adminState != null){
      setAdmin(JSON.parse(adminState));
    }

    const productsRef = ref(database, '/products');

    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const itemsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setItems(itemsArray);
      }
      else {
        setItems([]);
      }
    })

    const detailsRef = ref(database, `/details/${userId}`);

    onValue(detailsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setDetails(data);
      }
      else {
        setDetails({})
      }
    })
  }, []);

  // Subscribing obeserver to subject 
  useEffect(() => {
    const observer = {
      update: searchParams => searchSubject.setSearchParams(searchParams)
    }

    searchSubject.addObserver(observer);
    return () => searchSubject.removeObserver(observer);
  }, []);

  const setSearchParams = (params) => {
    searchSubject.setSearchParams(params);
  }

  const addToCart = async (item, quantity) => {
    const dbRef = ref(database, `/products/${item.id}/quantity`);
    const quantitySnapshot = await get(dbRef);
    const availableQuantity = quantitySnapshot.val();
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (quantity > availableQuantity) {
      alert(`There are ${availableQuantity} ${item.title} left. Please adjust you order.`);
      return;
    }

    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += quantity;
      setCart(updatedCart);
    }
    else {
      const newCartItem = { ...item, quantity }
      setCart([...cart, newCartItem]);
    }
  }

  // Observer component
  const SearchResults = ({ items, searchParams }) => {
    console.log('items from SearchResults', items);
    const filterItems = items.filter(item => {
      const titleMatch = item.title === searchParams.title;
      // const categoryMatch = (item.category || '').toLowerCase() === (searchParams.category || '').toLowerCase();
      // const manufacturerMatch = item.manufacturer.toLowerCase().includes(searchParams.toLowerCase());
      return titleMatch;
    });
    console.log('filter items', filterItems);
    return(
      <>
        {filterItems.map(item => {
          <ItemCard
            key={item.id}
            item={item}
            onAddToCart={addToCart}
          />
        })}
      </>
    )
  }

  const handlePurchase = async () => {
    let validQuantities = true;

    if (Object.keys(details).length === 0) {
      alert('Please fill out Details section before making a purchase');
      setCart([]);
      return;
    }

    if (cart.length === 0) {
      alert('Purchase failed: Cart is empty');
      return;
    }

    cart.forEach(async (cartItem) => {
      const { id, quantity, itemTitle } = cartItem;

      const quantityRef = ref(database, `products/${id}/quantity`);
      const quantitySnapshot = await get(quantityRef);
      const availableQuantity = quantitySnapshot.val();

      if (quantity > availableQuantity) {
        alert(`Purchase failed: There are ${availableQuantity} ${itemTitle} available. Please adjust your order.`);
        validQuantities = false;
        return;
      }
    });

    if (validQuantities) {
      const purchasesRef = ref(database, `purchases/${userId}`);
      const purchasesSnapshot = await get(purchasesRef);
      const purchases = purchasesSnapshot.exists() ? purchasesSnapshot.val() : {};

      for (const cartItem of cart) {
        const { id, quantity, itemTitle } = cartItem;
        const currentItem = purchases[id];
        const itemRef = child(purchasesRef, id);

        if (currentItem) {
          const updateQuantitiy = currentItem.quantity + quantity
          update(itemRef, { quantity: updateQuantitiy });
        }
        else {
          const purchaseData = {
            itemTitle: itemTitle,
            quantity: quantity
          }
          await set(itemRef, purchaseData);
        }
      }

      const cartContents = cart.map(item => `${item.itemTitle} x ${item.quantity}`).join(',');
      alert(`Purchase successful: ${cartContents}`);
    }
    else{
      alert('!validQunatities');
    }
    setCart([]);
  }

  const simulatePurchase = () => {
    alert('Purchase simulated.');
  }

  return (
    <div style={{ alignItems: 'center' }}>
      <div className='searchDiv'>
        <input
          placeholder='Search by title'
          onChange={(e) => setSearchParams({...searchSubject.searchParams, title: e.target.value})}
        />
        <input
          placeholder='Search by category'
          onChange={(e) => setSearchParams({...searchSubject.searchParams, category: e.target.value})}
        />
        <input
          placeholder='Search by manufacturer'
          onChange={(e) => setSearchParams({...searchSubject.searchParams, manufacturer: e.target.value})}
        />
      </div>
      <div className='shoppingContainer'>
        <div>
          <h2>Shopping List</h2>
          <div className='shoppingList'>
           {/* <SearchResults items={items} searchParams={searchSubject.searchParams}/> */}
           {items.map((item) => {
            return(
              <ItemCard
                item={item}
                onAddToCart={addToCart}
              />
            )
           })}
          </div>
        </div>
        <div>
          <h2>Shopping Cart</h2>
          <div className='shoppingCart'>
            <div style={{ backgroundColor: 'azure' }}>
              {cart.map((cartItem) => {
                return (
                  <div key={cartItem.id}>
                    <p>{`${cartItem.quantity} x ${cartItem.itemTitle}  €${cartItem.price}`}</p>
                  </div>
                )
              })}
            </div>
            {Object.keys(cart).length > 0 &&
              <div>
                {admin ? 
                  <button onClick={simulatePurchase}>Simulate purchase</button>
                :
                  <button onClick={handlePurchase}>Purhase</button>
                }
                <button onClick={() => setCart([])}>Clear Cart</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
