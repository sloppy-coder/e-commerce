import React from 'react';
import './CartItems.css';
import accounting from 'accounting';
import Button from '@mui/material/Button';
import { useStateValue } from '../../../StateProvider';
import { db } from '../../../firebase.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Mutex } from 'async-mutex';

function CartItems({ title, price, id, rating, image, hideButton }) {
  const [{ user }, dispatch] = useStateValue();
  const formattedValue = accounting.formatMoney(price, '₹', 0);
  const lock = new Mutex();

  const removeFromCart = () => {
    removeFromCartState();
    removeFromCartDB();
  };

  const removeFromCartState = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id: id,
    });
  };

  const removeFromCartDB = async () => {
    if (user) {
      const cartRef = doc(db, 'userCart', user.uid);
      const cartDocSnap = await getDoc(cartRef);
      const cartData = cartDocSnap.data();
      const dbBasket = cartData ? cartData.items : [];
      const index = dbBasket.findIndex((dbBasketItem) => dbBasketItem.id === id);

      if (index >= 0) {
        dbBasket.splice(index, 1);

        await lock.runExclusive(async () => {
          await updateDoc(cartRef, { items: dbBasket }).then(()=>{
            console.log("updateDoc Complete");
          });
          console.log('Updated');
        });
      }
    }
  };

  return (
    <div className='cartItems'>
      <img className='cartItemImage' src={image} alt='product' />
      <div className='cartItemInfo'>
        <p className='cartItemTitle'>{title}</p>
        <p className='checkoutProduct__price'>
          <strong>{formattedValue}</strong>
        </p>
        <div className='cartItemRating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <Button variant='contained' onClick={removeFromCart}>
            Remove from basket
          </Button>
        )}
      </div>
    </div>
  );
}

export default CartItems;
