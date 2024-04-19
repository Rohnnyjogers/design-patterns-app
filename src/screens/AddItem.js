import React, { useState } from 'react'
import { database } from '../firebaseconfig';
import { get, push, ref, update } from 'firebase/database';
import { ItemBuilder } from '../Patterns';

export default function AddItem() {
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateQuantity, setUpdateQuantity] = useState('');
    const [addTitle, setAddTitle] = useState('');
    const [addCategory, setAddCategory] = useState('');
    const [addManufacturer, setAddManufacturer] = useState('');
    const [addPrice, setAddPrice] = useState('');
    const [addQuantity, setAddQuantity] = useState('');

    const emptyFields = (title, category, manufacturer, price, quantity) => {
        return !title || !category || !manufacturer || !price || !quantity;
    }

    const nonZeroFields = (price, quantity) => {
        if(price <= 0){
            return true;
        }

        if(quantity <= 0){
            return true;
        }
    }

    const addItem = async() => { 
        let invalid = false;

        invalid = emptyFields(addTitle, addCategory, addManufacturer, addPrice, addQuantity);
        invalid = nonZeroFields(addPrice, addQuantity);

        if(!invalid){
            const builder = new ItemBuilder(addTitle);
            builder.setCategory(addCategory);
            builder.setManufacturer(addManufacturer);
            builder.setPrice(addPrice);
            builder.setQuantity(addQuantity);

            const itemsRef = ref(database, '/products');
            await push(itemsRef, builder.item);
            alert('Item added successfully.')
        }
        else{
            alert('Item field(s) empty or invalid, please try again.');
        }

    }

    const updateItem = async() => {
        if(updateQuantity <= 0){
            alert('Please in a value greater than 0 for quantity');
            return;
        }
        
        try{
            const itemsRef = ref(database, '/products');
            const itemsSnapshot = await get(itemsRef);
            const items = itemsSnapshot.val();

            let itemExists = false;
            let itemIdToUpdate = '';
            let itemTitle = ''

            Object.keys(items).forEach((itemId) => {
                if(items[itemId].itemTitle === updateTitle){
                    itemExists = true;
                    itemIdToUpdate = itemId;
                    itemTitle = items[itemId].itemTitle;
                }
            });

            if(itemExists){
                await update(ref(database, `/products/${itemIdToUpdate}`), {
                    quantity: updateQuantity
                });
                alert(`${itemTitle}'s quantity updated by ${updateQuantity}`);
            }
            else{
                alert(`'${itemTitle}' not found, pleasde try again`);
            }
        }
        catch(error){
            console.log('Error while checking database: ', error);
        }
    }
    
    return (
        <div style={{ alignItems: 'center' }}>
            <h2>Update Items</h2>
            <div className='searchDiv'>
                <input
                    placeholder='Enter title'
                    onChange={(e) => setUpdateTitle(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Enter new quantity'
                    onChange={(e) => setUpdateQuantity(e.target.value)}
                />
                <button onClick={updateItem}>Update</button>
            </div>
            <h2>Add Items</h2>
            <div className='searchDiv'>
                <input
                    placeholder='Add title'
                    onChange={(e) => setAddTitle(e.target.value)}
                />
                <input
                    placeholder='Enter category'
                    onChange={(e) => setAddCategory(e.target.value)}
                />
                <input
                    placeholder='Enter manufacturer'
                    onChange={(e) => setAddManufacturer(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Enter price'
                    onChange={(e) => setAddPrice(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Enter quantity'
                    onChange={(e) => setAddQuantity(e.target.value)}
                />
                <button onClick={addItem}>Add Item</button>
            </div>
        </div>
    )
}
