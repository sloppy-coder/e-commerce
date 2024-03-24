import React, { useEffect, useState } from 'react';
import './Cart.css';
import amazonAd from './amazonAd.jpg';
import CartItems from './CartItems/CartItems.js';
import Subtotal from './Subtotal/Subtotal.js';
import { useStateValue } from '../../StateProvider';
import { auth } from '../../firebase.js';
import { Button, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { db } from '../../firebase.js';
import { doc, deleteDoc } from 'firebase/firestore';
function Cart() {
  const [{ basket, user },dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    auth.onAuthStateChanged(async (user)=>{
      if(user){
        setIsLoading(false);
      }
      else{
        setIsLoading(false);
      }
    })
  },[])
  if (isLoading) {
    return (
      <LinearProgress />
    );
  }

  if (!user) {
    return (
      <div className="cart">
        <h2>
          Please{" "}
          <Link to="/signin">
            <span style={{ textDecoration: "none" }}>Sign-in</span>
          </Link>{" "}
          to view your cart.
        </h2>
      </div>
    );
  }
  const handleClear =() =>{
    dispatch({
      type:  "EMPTY_BASKET",
    })
    const cartRef= doc(db,'userCart',user.uid);
    deleteDoc(cartRef)
      .then(()=> {
        console.log('Empty success');
      })
      .catch((error)=>{
        console.error("error in emptying basket", error);
      })
  };
  return (
    <div className="cart">
      <div className="leftContent">
        <img className="amazonAd" src={amazonAd} alt="advertisement" />
        <h2 className="cartTitle">Hello {user ? user.displayName : "guest"}</h2>
        <h2>Your shopping Basket</h2>
        <Button className="clearButton" onClick={handleClear}>
          Clear All
        </Button>

        <div className="cartItemscurr">
          {basket?.map((item) => (
            <CartItems
              key={item.id}
              title={item.title}
              price={item.price}
              id={item.id}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="rightContent">
        <Subtotal />
      </div>
    </div>
  );
}

export default Cart;
