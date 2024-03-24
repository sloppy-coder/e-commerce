import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase.js";
import { Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
import OrderItems from "./OrderItems/OrderItems.js";
function Orders() {
  const [{ user , orderCart}, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    if (!Array.isArray(orderCart)) {
      setIsLoading(true); 
    }
  }, [orderCart]);

  if (isLoading) {
    return <LinearProgress />;
  }
  if (!user) {
    return (
      <div className="Orders">
        <h2>
          Please{" "}
          <Link to="/signin">
            <span style={{ textDecoration: "none" }}>Sign-in</span>
          </Link>{" "}
          to view your Orders.
        </h2>
      </div>
    );
  }
  const handleClear = () => {
     dispatch({
       type: "EMPTY_ORDER_CART",
     });
    const cartRef = doc(db, "userOrders", user?.uid);
    deleteDoc(cartRef)
      .then(() => {
        console.log("Empty success");
      })
      .catch((error) => {
        console.error("error in emptying basket", error);
      });
  };
  return (
    <div className="orders">
      <div className="leftContent">
        <h1 className="orderTitle">Your Orders</h1>
        <Button className="clearButton" onClick={handleClear}>
          Clear All
        </Button>
        {console.log(Array.isArray(orderCart))}
        <div className="cartItemscurr">
          {
            orderCart?.map((item) => (
              <OrderItems
                key={item.id}
                title={item.title}
                price={item.price}
                id={item.id}
                rating={item.rating}
                image={item.image}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Orders;