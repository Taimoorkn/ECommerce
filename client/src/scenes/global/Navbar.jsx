import { useDispatch, useSelector } from "react-redux";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { PersonOutline, MenuOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { setIsCartOpen, setSearch } from "../../state";
import "../../styles/navbar.css";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const search = useSelector((state) => state.cart.search);
  const icon_color = "#ddd";
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <Link to="/" className="logo_link">
          <h2 className="store_title">ShoeWear OS</h2>
        </Link>
      </div>
      <div className="navbar_icons">
        <div className="search_filter">
          <div className="search">
            <input
              type="search"
              placeholder="Search . . ."
              value={search}
              onChange={(e) => {
                dispatch(setSearch(e.target.value));
              }}
            />
          </div>
        </div>
        <IconButton onClick={() => navigate(`/user`)} sx={{ color: icon_color }}>
          <PersonOutline sx={{ fontSize: 30 }} />
        </IconButton>
        <IconButton
          onClick={() => dispatch(setIsCartOpen({}))}
          sx={{ color: icon_color }}
        >
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                right: -3,
                top: 13,
                border: `1px solid black`,
                padding: "0 4px",
              },
            }}
            className="badge"
            badgeContent={cart.length}
            color="primary"
            invisible={cart.length === 0}
          >
            <ShoppingCartIcon sx={{ fontSize: 24 }} />
          </Badge>
        </IconButton>
        <IconButton sx={{ color: icon_color }}>
          <MenuOutlined sx={{ fontSize: 25 }} />
        </IconButton>
      </div>
    </div>
  );
}

export default Navbar;
