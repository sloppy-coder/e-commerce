import "./App.css";
import Header from "./components/Header/Header.js";
import React from "react";
import Home from "./components/Home/Home.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart.js";
import Signin from "./components/Signin/Signin.js";
import CreateAccount from "./components/Signin/CreateAccount";
import Payment from "./components/Payment/Payment";
import Orders from "./components/Orders/Orders";
import { useEffect } from "react";
import { auth } from "./firebase.js";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const promise = loadStripe(
  "pk_test_51NSFJjSIQYv1iGYrnW6cLx3WCDOhUGjLJ9RyCcs3aDFtcxfzggpYNyIeOgEyuICFTvoFrO6PeS9thCWV11u2Y8CQ00IiWgXnxN"
);
function App() {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
        const cartRef = doc(db, "userCart", user.uid);
        const cartDocSnap = await getDoc(cartRef);
        const cartData = cartDocSnap.data();
        const basket = cartData ? cartData.items : [];
        dispatch({ type: "SET_CART", basket });
        const orderRef = doc(db, "userOrders", user?.uid);
        const orderSnap = await getDoc(orderRef);
        const orderData = orderSnap.data();
        const myorder = orderData ? orderData.items : [];
        dispatch({
          type: "SET_ORDERS",
          item: myorder,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Fragment>
                <Header />
                <Home />
              </React.Fragment>
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <React.Fragment>
                <Header />
                <Cart />
              </React.Fragment>
            }
          />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/create-account" element={<CreateAccount />} />
          <Route
            exact
            path="/payment"
            element={
              <React.Fragment>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </React.Fragment>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <React.Fragment>
                <Header />
                <Orders />
              </React.Fragment>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
