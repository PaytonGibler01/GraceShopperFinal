import React from "react";
import ReactDOM from "react-dom";
import { getUser } from "../auth";
import "./Home.css"

const Home = () => {
    return (
      <>
        <header className="home">
          <h2><center>Welcome to Starvana!</center></h2>
          <p></p>
          <p>
          <center>
            <h5>
              <p>Our one and only goal, is for you to be able to find the starship that compliments you and your needs.</p>
              <p>So you can sail to the stars!</p>
            </h5>
          </center>
        </p>
        <p>
          <center>
          With a varied inventory of new and previously owned ships, customer satisfaction is not simply our guarantee. It is our way of Life.
          </center>
        </p>
        </header>
      </>
    );
  };
  
  export default Home;