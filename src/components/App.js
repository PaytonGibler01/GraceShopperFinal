import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// import { getProducts } from '../api/products';
import {NavBar, Header, Login, Products,Register,Users} from './'
const App = async () => {
  const [products, setProducts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect( async () => {
    // const data = await getProducts()
    // setProducts(data)
    // console.log(products,"useEffect getAllProducts")
  }, []);

  // const getDbProducts = async () => {
  //   const data = await getProducts();
  //   setProducts(data);
  //   console.log(products,"useEffect getAllProducts")
  // };

  // useEffect(() => {
  //   getDbProducts()
  //   // isUserLoggedIn();
  // }, []);
  return (
    
    <div className="App">
    <Router> 
        <Header/>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Switch>
                <Route path="/products">
                  <Products/>
                </Route>
                <Route path="/login">
                  <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route path="/register">
                  <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>
                <Route path="/users">
                  <Users isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                </Route>


          </Switch>
      </Router>
    </div>
  
  );
}

export default App;