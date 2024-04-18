import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard'
import { child, get, onValue, ref, set, update } from 'firebase/database';
import { auth, database } from '../firebaseconfig';

export default function Shopping() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [details, setDetails] = useState({});

  const userId = auth.currentUser?.uid;

  useEffect(() => {
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

      if(data){
        setDetails(data);
      }
      else{
        setDetails({})
      }
    })
  }, []);

  console.log(items);

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

  const handlePurchase = async() => {
    let validQuantities = false;

    if(Object.keys(details).length === 0){
      alert('Please fill out Details section before making a purchase');
      setCart([]);
      return;
    }

    if(cart.length === 0){
      alert('Purchase failed: Cart is empty');
      return;
    }

    cart.forEach(async (cartItem) => {
      const {id, quantity, itemTitle} = cartItem;

      const quantityRef = ref(database, `products/${id}/quantity`);
      const quantitySnapshot = await get(quantityRef);
      const availableQuantity = quantitySnapshot.val();

      if(quantity > availableQuantity){
        alert(`Purchase failed: There are ${availableQuantity} ${itemTitle} available. Please adjust your order.`);
        validQuantities = false;
        return;
      }
    });

    if(validQuantities){
      const purchasesRef = ref(database, `purchases/${userId}`);
      const purchasesSnapshot = await get(purchasesRef);
      const purchases = purchasesSnapshot.exists() ? purchasesSnapshot.val() : {};
      
      for(const cartItem of cart){
        const { id, quantity, itemTitle } = cartItem;
        const currentItem = purchases[id];
        const itemRef = child(purchasesRef, id);

        if(currentItem){
          const updateQuantitiy = currentItem.quantity + quantity
          update(itemRef, {quantity: updateQuantitiy});
        }
        else{
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
    setCart([]);
  }

  return (
    <div className='shoppingContainer'>
      <div>
        <h2>Shopping List</h2>
        <div className='shoppingList'>
          {items.map((item) => {
            return (
              <ItemCard
                key={item.id}
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
          <div style={{backgroundColor: 'azure'}}>
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
              <button onClick={handlePurchase}>Purhase</button>
              <button onClick={() => setCart([])}>Clear Cart</button>
            </div>  
          }
        </div>
      </div>
    </div>
  )
}
