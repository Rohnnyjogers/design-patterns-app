import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebaseconfig';
import { onValue, push, ref, set } from 'firebase/database';

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const userId = auth.currentUser?.uid;
  const userEmail = auth.currentUser?.email

  useEffect(() => {
    const dbRef = ref(database, `/purchases/${userId}`);

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const purchasesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setPurchases(purchasesArray);
      }
      else {
        setPurchases([]);
      }
    })
  }, []);
  
  const openModal = (purchase) => {
    setSelectedPurchase(purchase);
    setModalOpen(true);
  }

  const closeModal = () => {
    setSelectedPurchase(null);
    setRating(0);
    setComment('');
    setModalOpen(false);
  }

  const submitReview = async() => {

    if(rating < 0 || rating > 5){
      alert('Review failed: Please enter a rating between 1-5 ');
      return;
    }

    const reviewData = {
      rating: rating,
      comment: comment,
      author: userEmail
    }

    const itemId = selectedPurchase.id;
    const reviewsRef = ref(database, `/products/${itemId}/reviews`);
    await push(reviewsRef, reviewData);

    closeModal();
  }
  return (
    <>
      {purchases.length === 0 ? (
        <div>
          <h3>No purchases made yet.</h3>
        </div>
      ) : (
        <>
          <h2>Purchases List</h2>
          {purchases.map((purchase) => {
            return(
              <div style={{backgroundColor: 'darkslategray', padding: 10, margin: 10, color: 'white'}}>
              <p>{purchase.itemTitle}</p>
              <button onClick={() => openModal(purchase)}>Rate and Review</button>
            </div>
            )
          })}
        </>
      )}

      {modalOpen && 
        <div>
          <h3>Rate and Review {selectedPurchase.itemTitle}</h3>
          <div>
            <label>Rating</label>
            <input 
              type='number'
              placeholder='1-5'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <label>Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={submitReview}>Submit</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      }
    </>
  )
}
