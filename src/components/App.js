import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getProducts, getReviews } from "../api/products";
import { getCart } from "../api/users";
import {
  NavBar,
  Header,
  Login,
  Products,
  SingleProductsPage,
  Register,
  Users,
  Profile,
  Home,
  Cart,
  Reviews
} from "./";
const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [allReviews, setAllReviews] = useState([])

  const fetchAllReviews = async () => {
    const data = await getReviews()
    console.log(data, "fetchAllReviews")
    setAllReviews(data)
  }

  const fetchAllProducts = async () => {
    const data = await getProducts();
    setProducts(data);
    console.log(products, "useEffect getAllProducts");
  };
  const fetchAllCartItems = async () => {
    const data = await getCart();
    setCartItems(data);
    console.log(cartItems, "useEffect getCart");
  };

  useEffect(() => {
    fetchAllCartItems();
    fetchAllProducts();
    fetchAllReviews()
  }, []);

  return (
    <div className="app-main-container">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/products">
          <Products products={products} />
        </Route>
        <Route path="/products/:productId">
          <SingleProductsPage products={products} allReviews={allReviews}/>
        </Route>
        <Route exact path="/login">
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/register">
          <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/profile">
          <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/my-cart">
          <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
