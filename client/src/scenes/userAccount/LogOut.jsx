import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartEmpty } from "../../state";
const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(setCartEmpty());

  useEffect(() => {
    localStorage.setItem("user", "");
    navigate("/");
  }, [navigate]);

  return null;
};

export default LogOut;
