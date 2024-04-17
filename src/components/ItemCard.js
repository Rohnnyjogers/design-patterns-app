import React, { useState } from 'react'

export default function ItemCard({ item, onAddToCart }) {
    const { itemTitle, category, manufacturer, price } = item;
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = () => {
        if(quantity <= 0){
            alert('Enter a positive integer for quantity')
            return;
        }

        onAddToCart(item, quantity);
        setQuantity(0);
    }

    return (
        <div className='itemCard'>
            <div className='itemInfoTable'>
                <div className='itemInfo'>
                    <h4>Title:</h4>
                    <p>{itemTitle}</p>
                </div>
                <div className='itemInfo'>
                    <h4>Category:</h4>
                    <p>{category}</p>
                </div>
                <div className='itemInfo'>
                    <h4>Manufacturer:</h4>
                    <p>{manufacturer}</p>
                </div>
                <div className='itemInfo'>
                    <h4>Price:</h4>
                    <p>€{price}</p>
                </div>
                <input
                    type='number'
                    placeholder='Quantity'
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}/>
            </div>
            <div className='itemButtons'>
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button>Reviews</button>
            </div>
        </div>
    )
}
