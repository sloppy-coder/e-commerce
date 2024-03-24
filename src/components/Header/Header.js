import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import amazonLogo from './amazonLogo.png';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { auth } from '../../firebase.js';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
function Header() {
  const [{ basket, user },dispatch] = useStateValue();
  const [isLoading, setIsLoading]= useState(true);
  const handleSignin = () => {
    if (user) {
        auth.signOut();
        dispatch({
        type: "EMPTY_BASKET",
      });
    }
  };
  useEffect(()=>{
    auth.onAuthStateChanged(async (user)=>{
      if(user){
        setIsLoading(false);
      }
      else{
        setIsLoading(false);
      }
    })
  },[basket])
  return (
    <div className="header">
      <Link to="/">
        <img className="mainLogo" src={amazonLogo} alt="Amazon Logo" />
      </Link>
      <div className="searchBar">
        <input type="text" className="searchInput" />
        <SearchIcon className="searchIcon" />
      </div>
      <div className="navBar">
        <div className="optionHeader">
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <div className="optionHeader">
              <span className="optionOne">
                Hello {user ? user.displayName : "Guest"}
              </span>
              <Link to={!user && "/signin"}>
                <span onClick={handleSignin} className="optionTwo">
                  {user ? "Sign Out" : "Sign in"}
                </span>
              </Link>
            </div>
          )}
        </div>
        <Link to="/orders">
          <div className="optionHeader">
            <span className="optionOne">Returns</span>
            <span className="optionTwo">& Orders</span>
          </div>
        </Link>

        <div className="optionHeader">
          <span className="optionOne">Your</span>
          <span className="optionTwo">prime</span>
        </div>
        <Link to="/cart">
          {basket?.length ? ( // Check if basket is defined and has a length greater than 0
            <div className="optionBasket">
              <ShoppingBasketIcon className="basketIcon" />
              <span className="count">{basket.length}</span>
            </div>
          ) : (
            <div className="optionBasket">
              <ShoppingBasketIcon className="basketIcon" />
              <span className="count">0</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Header;
