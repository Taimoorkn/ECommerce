import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PersonOutline } from "@mui/icons-material";
import { setIsCartOpen, setSearch } from "../../state";
import "../../styles/header.css";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.cart.userId); 

  return (
    <header className="header">
      {user ? (
        <div className="greetings">
          <p className="p">Greetings Agent 00{user}</p>
          <button className="logout_btn" onClick={() => navigate("/logout")}>
            LOGOUT
          </button>
        </div>
      ) : (
        <div className="account">
          <Link className="link" to="/login">

            Sign in / Guest
          </Link>
          <Link className="link" to="/signup">
            Create Account
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
