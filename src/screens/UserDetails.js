import { useEffect, useState } from 'react';
import { database } from '../firebaseconfig';
import { ref, onValue } from 'firebase/database';
import React from 'react'

export default function UserDetails() {
    const [userPurchases, setUserPurchases] = useState([]);

    useEffect(() => {
        const dbRef = ref(database, `/purchases/`);

        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const userPurchasesArray = [];
                Object.entries(data).forEach(([userId, purchaseData]) => {
                    Object.entries(purchaseData).forEach(([purchaseId, purchase]) => {
                        const { itemTitle, quantity } = purchase;
                        userPurchasesArray.push({ userId, itemTitle, quantity, purchaseId });
                    });
                });
                setUserPurchases(userPurchasesArray);
            }
            else {

            }
        })
    }, []);

    return (
        <>
            {userPurchases.length === 0 ? (
                <div>
                    <h3>No purchases made yet.</h3>
                </div>
            ) : (
                <>
                    <h2>Purchases List</h2>
                    {userPurchases.map((purchase) => {
                        return (
                            <div style={{ backgroundColor: 'darkslategray', padding: 10, margin: 10, color: 'white' }}>
                                <h4>Purchase</h4>
                                <p><b>Purchase ID:</b>{purchase.id}</p>
                                <p><b>User ID:</b>{purchase.userId}</p>
                                <p><b>Title:</b>{purchase.itemTitle}</p>
                                <p><b>Quantity:</b>{purchase.quantity}</p>
                                <></>
                            </div>
                        )
                    })}
                </>
            )}
            
        </>
    )
}
