import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux"; 
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../../styles/itemDetails.css";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  let [items, setItems] = useState([]);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ item: { ...item, count } }));
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    items = await fetch(
      `http://localhost:1337/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, []); 

  return (
    <div className="item_details_container">
      <div className="item_details_content">
        <div className="item_details_images">
          <img
            alt={item?.name}
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
          />
        </div>

        <div className="item_details_actions">
          <div className="item_details_info">
            <h3>{item?.attributes?.name}</h3>
            <p>${item?.attributes?.price}</p>
            <p>{item?.attributes?.longDescription}</p>
          </div>

          <div className="item_details_quantity">
            <div className="quantity_control">
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <p>{count}</p>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </div>
            <Button sx={{
                backgroundColor: "#08080b",
                color: "white",
                borderRadius: 5,
                width: "180px",
                padding: "20px 40px",
                m: "20px 0",
              }}
              className="add_to_cart_button"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </div>

          <div className="item_details_wishlist"> 
            <p>CATEGORIES: {item?.attributes?.category}</p>
          </div>
        </div>
      </div>
      <div className="item_details_information">
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
        <div className="information_content">
          {value === "description" && (
            <div>{item?.attributes?.longDescription}</div>
          )}
          {value === "reviews" && <div>reviews</div>}
        </div>
      </div> 
    </div>
  );
};

export default ItemDetails;
