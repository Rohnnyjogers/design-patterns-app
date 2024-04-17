import React from 'react'
import ItemCard from '../components/ItemCard'
import { Iterator } from '../Patterns'
import Login from './Login';

const items = [{title: 'A', category: 'S',manufacturer: 'V', price: 10},{title: 'A', category: 'S',manufacturer: 'V', price: 10},{title: 'A', category: 'S',manufacturer: 'V', price: 10}]

const iter = new Iterator(items);

export default function Shopping() {
  return (
    <div className='shoppingContainer'>
      <Login/>
      <div>
        <h1>Shopping List</h1>
        <div className='shoppingList'>
          {iter.each(function(item){
            return(
              <ItemCard
                title={item.title}
                category={item.category}
                manufacturer={item.manufacturer}
                price={item.price}
              />
            )
          })}
          {/* {arr.map(() => {
            return(
              
            )
          })} */}
        </div>
      </div>
      
      <div className='shoppingCart'>
        <h1>Shopping Cart</h1>
      </div>
    </div>
  )
}
