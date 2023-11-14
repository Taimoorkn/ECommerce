import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import "../styles/item.css";

const Item = ({ item }) => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = 1;
  const [isHovered, setIsHovered] = useState(false);
  const view = useSelector((state) => state.cart.view);
  const handleAddToCart = () => {
    dispatch(addToCart({ item: { ...item, count } }));
  };
  const { category, price, name, image } = item.attributes;
  const { url } = image.data.attributes.formats.thumbnail || {};
  return (
    <div className="items">
      <div
        className={`item_${view === "list_view" ? "list_view" : "grid_view"}`}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <div className="image_container">
          <img
            className="item_image"
            alt={item.name}
            src={`http://localhost:1337${url}`}
            onClick={() => navigate(`/item/${item.id}`)}
          />
        </div>
        {isHovered && (
          <div className="buttons_overlay">
            <IconButton onClick={handleAddToCart} className="add_to_cart">
              <AddShoppingCartIcon className="btn" />
              <p>Add to Cart</p>
            </IconButton>
          </div>
        )}
        <div
          className="item_details"
          onClick={() => navigate(`/item/${item.id}`)}
        >
          <p className="category">{category}</p>
          <p className="item_name">{name}</p>
          <p className="item_price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
