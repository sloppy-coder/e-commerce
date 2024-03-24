import React, { useState, useEffect } from "react";
import "./Subtotal.css";
import accounting from "accounting";
import Button from "@mui/material/Button";
import { useStateValue } from "../../../StateProvider.js";
import { getBasketTotal } from "../../../reducer";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import {Snackbar} from "@mui/material";
function Subtotal() {
  const [{ basket }] = useStateValue();
  const formattedValue = accounting.formatMoney(getBasketTotal(basket), "₹", 2);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const handleClick = () => {
    if (basket?.length) {
      navigate("/payment");
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };
  const handleClose = () => {
    setShowAlert(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);
  return (
    <div className="subtotal">
      <p>
        Subtotal ({basket?.length} items): <strong>{formattedValue}</strong>
      </p>
      <small className="subtotalGift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <Button variant="contained" onClick={handleClick}>
        Proceed to checkout page
      </Button>
      {showAlert && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please Add items to your cart!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Subtotal;
