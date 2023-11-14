import { InputBase, Divider, IconButton } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useState } from "react";
import "../../styles/subscribe.css";
const Subscribe = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="subscribe">
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <h3 className="h3">Subscribe To Our Newsletter</h3>
      <p>and receive $20 coupon for your first order when you checkout</p>
      <div className="email_field">
        <InputBase 
          sx={{ ml: 1, flex: 1 ,   color: "#f8f8f2"}}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <p className="btn_text">Subscribe</p>
      </div>
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

export default Subscribe;
