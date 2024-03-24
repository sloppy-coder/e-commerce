import React, {  useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "../../StateProvider";
import CartItems from "../Cart/CartItems/CartItems";
import { Link, useNavigate } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import { getBasketTotal } from "../../reducer";
import accounting from "accounting";
import { Button } from "@mui/material";
import "firebase/firestore";
import { db } from "../../firebase";
import {getDoc ,doc ,setDoc, updateDoc} from "firebase/firestore";
import { auth } from "../../firebase";
import {LinearProgress} from "@mui/material";
function Payment() {
  const navigate = useNavigate();
  const [{ basket, user, orderCart},dispatch] = useStateValue();
  const formattedValue = accounting.formatMoney(getBasketTotal(basket), "₹", 2);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disable, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if(basket){
      console.log("basket",basket);
      dispatch({
        type: "ADD_TO_ORDERS",
        item: basket,
      });
      console.log("orderCart", orderCart);
    }
    if (user) {
      const cartRef = doc(db, "userOrders", user.uid);
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        const updatedCart = cartData.items
          ? [...basket, ...cartData.items]
          : basket;
        await updateDoc(cartRef, { items: updatedCart });
      } else {
        await setDoc(cartRef, { items: basket });
      }
    }
    navigate("/orders");
    setSuccess(true);
  };
  useEffect(() => {
    console.log("orderCart inside useEffect:", orderCart);
  }, [orderCart]);
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  const [emptyCart,setEmptyCart]= useState(true);
  useEffect(() => {
    setEmptyCart(basket.length === 0);
  }, [basket]);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);
  if (isLoading) {
    return <LinearProgress />;
  }
  if(emptyCart){
    return(
      <>
          <h1>Please Add to items your cart</h1>
      </>
    );
  }
  return (
    <div className="payment">
      <div className="paymentPage">
        <h1>
          Checkout (<Link to="/cart">{basket?.length} items</Link>)
        </h1>
        <div className="paymentSection">
          <div className="paymentTittle">
            <h3>Delivery Address</h3>
          </div>
          <div className="paymentBody">
            <p>{user?.displayName}</p>
            <p>Indian Institute of Technology, Varanasi</p>
            <p>Uttar Pradesh, India</p>
          </div>
        </div>

        <div className="paymentSection">
          {/* products */}
          <div className="paymentTittle">
            <h3>Review your Cart items and Delivery</h3>
          </div>
          <div className="paymentBody">
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
        <div className="paymentSection">
          <div className="paymentTittle">
            <h3>Payment Method</h3>
          </div>
          <div className="paymentBody paymentDetails">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="paymentTotal">
                <h3>Order Total: {formattedValue}</h3>
                <Button
                  type="submit"
                  disabled={processing || disable || success}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </Button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
