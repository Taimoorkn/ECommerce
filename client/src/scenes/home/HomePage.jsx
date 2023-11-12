import React from "react";
import ShoppingList from "../home/ShoppingList";
import "../../styles/homePage.css";
import Subscribe from "./Subscribe"; 
const HomePage = () => {
  return (
    <main>
      <ShoppingList />
      <Subscribe />
    </main>
  );
};

export default HomePage;
