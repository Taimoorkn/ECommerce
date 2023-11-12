import { Button, Divider, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../../styles/userAccount.css";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state/index";
import { useNavigate } from "react-router-dom"; 
const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);
  return (
    <div className="user_cart_menu_fullscreen_layer">
      <div className="user_cart">
        <div className="user_cart_header">
          <h2>SHOPPING CART ({cart.length})</h2>
          <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="user_cart_list">
          {cart.map((item) => (
            <div key={`${item.attributes.name}-${item.id}`}>
              <div className="user_cart_item_box">
                <div className="user_item_image">
                  <img
                    alt={item?.name}
                    width="250"
                    height="150"
                    src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
                  />
                </div>

                <div className="user_item_details">
                  <div className="user_item_name">
                    <p>{item.attributes.name}</p>
                    <IconButton
                      onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <p className="user_description">
                    {item.attributes.longDescription}
                  </p>

                  <div className="user_item_actions">
                    <div className="user_quantity_control">
                      <IconButton
                        onClick={() => dispatch(decreaseCount({ id: item.id }))}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <p>{item.count}</p>
                      <IconButton
                        onClick={() => dispatch(increaseCount({ id: item.id }))}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                    <p className="user_item_price">
                      ${item.attributes.price * item.count}
                    </p>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </div>
        <div className="user_cart_actions">
          <div className="user_subtotal">
            <p>SUBTOTAL</p>
            <p>${totalPrice}</p>
          </div>
          <Button
            onClick={() => {
              navigate("/checkout"); 
            }}
            className="user_checkout_button"
          >
            CHECKOUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default User;
