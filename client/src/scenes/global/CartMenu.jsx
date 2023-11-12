import { Button, Divider, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../../styles/cartMenu.css";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    isCartOpen && (
      <div className="cart_menu_fullscreen_layer">
        <div className="cart">
          <div className="cart_header">
            <h2>SHOPPING CART ({cart.length})</h2>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon sx={{color: "#f8f8f2;"}} />
            </IconButton>
          </div>
          <div className="cart_list">
            {cart.map((item) => (
              <div key={`${item.attributes.name}-${item.id}`}>
                <div className="cart_item_box">
                  <div className="item_image">
                    {/* image */}
                    <img 
                    className="image"
                      alt={item?.name}
                      width="250"
                      height="150"
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
                    />
                  </div>

                  <div className="item_details">
                    <div className="item_name">
                      <p>{item.attributes.name}</p>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon sx={{color: "#f8f8f2;"}}/>
                      </IconButton>
                    </div>
                    <p>{item.attributes.longDescription}</p>

                    <div className="item_actions">
                      <div className="quantity_control">
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon sx={{color: "#f8f8f2;"}}/>
                        </IconButton>
                        <p>{item.count}</p>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <AddIcon sx={{color: "#f8f8f2;"}}/>
                        </IconButton>
                      </div>
                      <p className="item_price">
                        ${item.attributes.price * item.count}
                      </p>
                    </div>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
          </div>
          <div className="cart_actions">
            <div className="subtotal">
              <p>SUBTOTAL</p>
              <p>${totalPrice}</p>
            </div>
            <Button sx={{
                backgroundColor: "#08080b",
                color: "white",
                borderRadius: 5,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }} 
            >
              CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default CartMenu;
