import React from "react";
import ReactDOM from "react-dom";
import { getUser } from "../auth";

const Home = () => {
    return (
      <>
        <header className="home">
          <h2><center>Welcome to Starvana!</center></h2>


         <div>
          <center>
            <div>
              <h5>Our one and only goal, is for you to be able to find the starship that compliments you and your needs.</h5>
              <h5>So you can sail to the stars!</h5>
            </div>
          </center>
        </div>


        <div>
          <center>
          With a varied inventory of new and previously owned ships, customer satisfaction is not simply our guarantee. It is our way of Life.
          </center>
        </div>
        </header>
      </>
    );
  };
  
  export default Home;