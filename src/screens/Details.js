import { ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebaseconfig';

const validateVisa = (cardNumber) => {
  const cardNumberStr = String(cardNumber);
  return cardNumberStr.startsWith('4') && cardNumberStr.length === 5;
}
const validateMastercard = (cardNumber) => {
  const cardNumberStr = String(cardNumber);
  return cardNumberStr.startsWith('5') && cardNumberStr.length === 5;
}

const validateCardNumber = (cardNumber) => {
  const cardNumberStr = String(cardNumber);
  return cardNumberStr.startsWith('5') || cardNumberStr.startsWith('4');
}

const validateExpiry = (expiryMonth) => {
  return expiryMonth > 3;
}

const validateFields = (address, cardNumber, expiryMonth, expiryYear, cardType) => {
  return !address || !cardNumber || !expiryMonth || !expiryYear || !cardType;
}

export default function Details() {

  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState(null);
  const [expiryMonth, setExpiryMonth] = useState(null);
  const [expiryYear, setExpiryYear] = useState(null);
  const [cardType, setCardType] = useState('');

  const handleSubmit = () => {
    let isValid = true;
    
    isValid = validateFields(address,cardNumber,expiryMonth,expiryYear,cardType);
    isValid = validateCardNumber(cardNumber);
    isValid = validateExpiry(expiryMonth);

    if(cardType === 'Visa'){
      isValid = validateVisa(cardNumber);
    }
    else if(cardType === 'Mastercard'){
      isValid = validateMastercard(cardNumber);
    }

    if(isValid){
      console.log('Details are valid');
    }
    else{
      alert('Details submission failed: Please check your details and try again.');
    }
  }

  const handleClear = () => {
    setAddress('');
    setCardNumber(null);
    setExpiryMonth(null);
    setExpiryYear(null);
    setCardType('');
  }

  const months = [1,2,3,4,5,6,7,8,9,10,11,12];
  const years = [2024, 2025, 2026];
  const cardTypes = ['Visa', 'Mastercard'];

  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <h2>Details</h2>
      <h4>Shipping Address</h4>
      <textarea
        placeholder='Enter full address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <h4>Card Details</h4>
      <input
        type='number'
        placeholder='Card Number'
        value={cardNumber === null ? '' : cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <select value={expiryMonth === null ? '' : expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)}>
        <option value={''}>Select expiry month</option>
        {months.map((month) => {
          return(
            <option key={month} value={month}>{month}</option>
          )
        })}
      </select>
      <select value={expiryYear === null ? '': expiryYear} onChange={(e) => setExpiryYear(e.target.value)}>
        <option value={''}>Select expiry year</option>
        {years.map((year) => {
          return(
            <option key={year} value={year}>{year}</option>
          )
        })}
      </select>
      <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
        <option value={''}>Card type</option>
        {cardTypes.map((type) => {
          return(
            <option key={type} value={type}>{type}</option>
          )
        })}
      </select>
      {/* Input for card number */}
      {/* Add dropdowns here: */}
      {/* A dropdown for expiry month ( contains numbers 1 -12) */}
      {/* A dropdown for expiry year ( conatins numbers 2024, 2025, and 2026) */}
      {/* As dropdown for card type (contains strings 'Visa' and 'Mastercard') */}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleClear}>Clear Fields</button>
    </div>
  )
}
