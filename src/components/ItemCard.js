import React, { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database';
import { database } from '../firebaseconfig';

export default function ItemCard({ item, onAddToCart }) {
    const { id, itemTitle, category, manufacturer, price } = item;
    const [quantity, setQuantity] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [reviewItems, setReviewItems] = useState([]);

    useEffect(() => {
        const productsRef = ref(database, `/products/${id}/reviews`);
    
        onValue(productsRef, (snapshot) => {
          const data = snapshot.val();
    
          if (data) {
            const reviewsArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key]
            }));
            setReviewItems(reviewsArray);
          }
          else {
            setReviewItems([]);
          }
        })
    }, []);

    const handleAddToCart = () => {
        if(quantity <= 0){
            alert('Enter a positive integer for quantity')
            return;
        }

        onAddToCart(item, quantity);
        setQuantity(0);
    }

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }  
    console.log(reviewItems);
    return (
        <>
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
                <button onClick={openModal}>Reviews</button>
            </div>
        </div>

        {modalOpen &&
            <div>
            <h4>{`${itemTitle} Reviews`}</h4>
            {reviewItems.map((review) => {
                return(
                    <p>{`${review.author}: ${review.comment}. Rating: ${review.rating}/5`}</p>
                )
            })}
            <button onClick={closeModal}>Close</button>
        </div>
        }
        </>
    )
}
