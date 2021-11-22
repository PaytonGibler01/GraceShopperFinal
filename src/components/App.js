import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Header } from '.';
import { getAllProducts } from '../../db/products';
import {NavBar, Header, Login, Products,Register,Users} from './components'
const App = async () => {
  const [products, setProducts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const data = await getAllProducts()
    setProducts(data)
    console.log(data,"useEffect getAllProducts")
  });

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