import React from 'react';
import { useState } from 'react';
import './Product.css';
import LoadingButton from '@mui/material/Button';
import { useStateValue } from '../../../StateProvider';
import accounting from 'accounting';
import { db } from "../../../firebase.js";
import { doc, getDoc,updateDoc, setDoc} from "firebase/firestore";
function Product({ title, price, id, rating, image }) {
  const [{user}, dispatch] =useStateValue();
  const [loading, setLoading]= useState(false);
  const addToCart = async () => {
  setLoading(true);
  const newProduct = {
    id: id,
    title: title,
    image: image,
    price: price,
    rating: rating,
  };
  dispatch({
    type: "ADD_TO_CART",
    item: newProduct,
  });
  if (user) {
    const cartRef = doc(db, "userCart", user.uid);
    const cartDoc = await getDoc(cartRef);
    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const updatedCart = cartData.items ? [...cartData.items, newProduct] : [newProduct];
      await updateDoc(cartRef, { items: updatedCart });
    } else {
      await setDoc(cartRef, { items: [newProduct] });
    }
  }
  
  setLoading(false);
};


  const formattedValue = accounting.formatMoney(price, '₹', 0);
  return (
    <div className='Product'>
      <div className='productInfo'>
        <p className='heading'>{title}</p>
        <p className='productPrice'>
          <small>₹</small>
          <strong>{formattedValue}</strong>
        </p>
        <div className='productRating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>
      <LoadingButton loading= {loading} variant="contained"
      onClick={addToCart}>Add to cart</LoadingButton>
      <img className='prodImage' src={image} alt='product' />
    </div>
  );
}

export default Product;
