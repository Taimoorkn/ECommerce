import { useSelector } from "react-redux";
import "../../styles/footer.css";

function Footer() {
  const loginPath = useSelector((state) => state.cart.currentLoginPath);
  console.log("current login path",loginPath)
  return ( 
    loginPath !== "SignUp" &&
    loginPath !== "Checkout" &&
    loginPath !== "LogIn" && (
      <div className="footer">
        <div className="inner_footer">
          <div className="description">
            <h3>ECOMMER</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </div>
          </div>
          <div className="about_us">
            <h3>About Us</h3>
            <p>Careers</p>
            <p>Our Stores</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div className="customer_care">
            <h3>Customer Care</h3>
            <p>Help Center</p>
            <p>Track Your Order</p>
            <p>Corporate & Bulk Purchasing</p>
            <p>Returns & Refunds</p>
          </div>
          <div className="contact_us">
            <h3>Contact Us</h3>
            <p>Lahore, Pakistan</p>
            <p>Email: taimoorkn2221@gmail.com</p>
            <p>(+92)111111111</p>
          </div>
        </div>
      </div>
    )
  );
}

export default Footer;
