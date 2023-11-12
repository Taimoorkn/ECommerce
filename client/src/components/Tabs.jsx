import "../styles/tabs.css";

const Tabs = ({ value, onChange, breakPoint }) => {
  const handleTabClick = (value) => {
    onChange(value);
  };

  return (
    <div className="container"> 
        <input
          className="input"
          type="radio"
          id="tab1"
          name="tab"
          readOnly
          checked={value === "all"}
        />
        <label
          id="label"
          htmlFor="tab1"
          onClick={() => handleTabClick("all")}
          className={`tab ${value === "all" ? "active" : ""}`}
        >
          ALL
        </label>
        <input
          className="input"
          type="radio"
          id="tab2"
          name="tab"
          readOnly
          checked={value === "newArrivals"}
        />
        <label
          id="label"
          htmlFor="tab2"
          onClick={() => handleTabClick("newArrivals")}
          className={`tab ${value === "newArrivals" ? "active" : ""}`}
        >
          NEW ARRIVALS
        </label>
        <input
          className="input"
          type="radio"
          id="tab3"
          name="tab"
          readOnly
          checked={value === "bestSellers"}
        />
        <label
          id="label"
          htmlFor="tab3"
          onClick={() => handleTabClick("bestSellers")}
          className={`tab ${value === "bestSellers" ? "active" : ""}`}
        >
          BEST SELLERS
        </label>
        <input
          className="input"
          type="radio"
          id="tab4"
          name="tab"
          readOnly
          checked={value === "topRated"}
        />
        <label
          id="label"
          htmlFor="tab4"
          onClick={() => handleTabClick("topRated")}
          className={`tab ${value === "topRated" ? "active" : ""}`}
        >
          TOP RATED
        </label>
        <div className="line" style={{ width: breakPoint ? "25%" : "0" }}></div>
      </div>
     
  );
};

export default Tabs;
