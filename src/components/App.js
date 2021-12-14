import { create } from "combined-stream";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getProducts, getReviews } from "../api/products";
import { getCartRoute, getUsers } from "../api/users";
import {
  NavBar,
  Header,
  Login,
  Products,
  SingleProductsPage,
  Register,
  Profile,
  Home,
  Cart,
  Admin,
  FooterPage,
} from "./";
const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [isSeller, setIsSeller] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);


  const fetchAllReviews = async () => {
    const data = await getReviews();
    // console.log(data, "fetchAllReviews");
    setAllReviews(data);
  };

  const fetchAllProducts = async () => {
    const data = await getProducts();
    setProducts(data);
    // console.log(products, "useEffect getAllProducts");
  };
  const fetchAllCartItems = async () => {
    const data = await getCartRoute();
    setCartItems(data);
    // console.log(data, "useEffect getCart");
  };
  const fetchAllUsers = async () => {
    const data = await getUsers();
    setAllUsers(data);
    // console.log(allUsers, "useEffect allUser");
  };
  useEffect(() => {
    fetchAllCartItems();
    fetchAllProducts();
    fetchAllReviews();
    fetchAllUsers();
  }, [isAdmin]);

  return (
    <div className="app-main-container">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin}/>
      <FooterPage />
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
          <SingleProductsPage
            products={products}
            allReviews={allReviews}
            isSeller={isSeller}
            setIsSeller={setIsSeller}
            allUsers={allUsers}
          />
        </Route>
        <Route exact path="/login">
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} allUsers={allUsers} setIsAdmin={setIsAdmin} />
        </Route>
        <Route exact path="/register">
          <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/profile">
          <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} allUsers={allUsers} products={products}/>
        </Route>
        <Route path="/my-cart">
          <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </Route>
        <Route exact path="/admin">

          <Admin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} products={products} allUsers={allUsers} />

        </Route>
      </Switch>
    </div>
  );
};

export default App;
