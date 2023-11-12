import React, { useCallback, useEffect, useState } from "react";
import Tabs from "../../components/Tabs";
import Item from "../../components/Item";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setView } from "../../state";
import "../../styles/shoppingList.css";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import { Divider, IconButton } from "@mui/material";
const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [value, setValue] = useState("all");
  const view = useSelector((state) => state.cart.view);
  const search = useSelector((state) => state.cart.search);
  const [sortBy, setSortBy] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [filteredItems, setFilteredItems] = useState([]);
  const breakPoint = useMediaQuery("(min-width:300px)");

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }
  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMinPriceChange = (event) => {
    setMinPrice(parseFloat(event.target.value));
  };
  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseFloat(event.target.value));
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const customSort = useCallback(
    (a, b) => {
      const nameA = a.attributes.name.toLowerCase();
      const nameB = b.attributes.name.toLowerCase();
      if (
        nameA.startsWith(search.toLowerCase()) &&
        !nameB.startsWith(search.toLowerCase())
      ) {
        return -1;
      }
      if (
        !nameA.startsWith(search.toLowerCase()) &&
        nameB.startsWith(search.toLowerCase())
      ) {
        return 1;
      }
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    },
    [search]
  );

  useEffect(() => {
    let minPriceCopy = minPrice;
    let maxPriceCopy = maxPrice;

    if (isNaN(minPrice)) {
      minPriceCopy = 0;
    }
    if (isNaN(maxPrice)) {
      maxPriceCopy = 1000000;
    }
    if (isNaN(minPrice) && isNaN(maxPrice)) {
      minPriceCopy = 0;
      maxPriceCopy = 1000000;
    }
    let fil = [...items];
    if (sortBy === "default") {
      fil = items.filter((item) => {
        return (
          item.attributes.price >= minPriceCopy &&
          item.attributes.price <= maxPriceCopy &&
          (search === "" ||
            item.attributes.name.toLowerCase().includes(search.toLowerCase()))
        );
      });
      if (search !== "") {
        //something is being written in search bar
        fil.sort(customSort);
      }
    } else {
      fil = items.filter((item) => {
        return (
          item.attributes.price >= minPriceCopy &&
          item.attributes.price <= maxPriceCopy &&
          (search === "" ||
            item.attributes.name.toLowerCase().includes(search.toLowerCase()))
        );
      });
      if (sortBy === "ascending") {
        fil.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
      } else if (sortBy === "descending") {
        fil.sort((a, b) => b.attributes.name.localeCompare(a.attributes.name));
      } else if (sortBy === "highToLow") {
        fil.sort((a, b) => b.attributes.price - a.attributes.price);
      } else if (sortBy === "lowToHigh") {
        fil.sort((a, b) => a.attributes.price - b.attributes.price);
      }
    }
    setFilteredItems(fil);
  }, [minPrice, maxPrice, search, items, sortBy, customSort]);

  const topRatedItems = filteredItems.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = filteredItems.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = filteredItems.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  return (
    <div className="items_list_main_div">
      <h3 className="h3">
        Our Featured <b>Products</b>
      </h3>

      <div className="display_items_section">
        <div className="filter_plus_tabs">
          <Tabs
            value={value}
            onChange={(value) => setValue(value)}
            breakPoint={breakPoint}
          />
          <div className="filters">
            <div className="product_filters">
              <p className="sort_by_label">Sort by:</p>
              <select
                value={sortBy}
                onChange={handleSortChange}
                class="select_filter"
              >
                <option value="default">Default</option>
                <option value="ascending">Alphabetical (A-Z)</option>
                <option value="descending">Alphabetical (Z-A)</option>
                <option value="highToLow">Price (High to Low)</option>
                <option value="lowToHigh">Price (Low to High)</option>
              </select>
            </div>
            <div className="product_filters">
              <p className="price_range_label">Price Range:</p>
              <input
                className="input_filter"
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <input
                className="input_filter"
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
        </div>
        <div className="view_filters">
          <IconButton
            className={`icon ${view === "grid_view" ? "active" : ""}`}
            onClick={() => {
              dispatch(setView("grid_view"));
            }}
          >
            <GridViewRoundedIcon sx={{ fontSize: 32 }} />
          </IconButton>

          <IconButton
            className={`icon ${view === "list_view" ? "active" : ""}`}
            onClick={() => {
              dispatch(setView("list_view"));
            }}
          >
            <ViewListRoundedIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </div>

        <div
          className={`items_display_${
            view === "grid_view" ? "grid_view" : "list_view"
          }`}
        >
          {value === "all" &&
            filteredItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "newArrivals" &&
            newArrivalsItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "bestSellers" &&
            bestSellersItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {value === "topRated" &&
            topRatedItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <Divider
        sx={{  m: 10 }}
        orientation="horizontal"
      /> 
      <br />
    </div>
  );
};

export default ShoppingList;
