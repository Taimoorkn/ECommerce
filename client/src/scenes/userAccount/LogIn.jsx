import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { storeUser } from "./Protector";
import { logInSchema } from "../../components/userSchema";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../state";
import "../../styles/login.css";

const initialUser = {
  email: "",
  password: "",
};
const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginPath = useSelector((state) => state.cart.currentLoginPath);

  const logIn = async (values) => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (values.email && values.password) {
        const { data } = await axios.post(url, {
          identifier: values.email,
          password: values.password,
        });
        dispatch(setUserId(data.user.id));

        if (data.jwt) {
          storeUser(data);
          toast.success("Logged in successfully!", {
            hideProgressBar: true,
          });
          if (loginPath === "User") {
            navigate("/user");
          } else if (loginPath === "Checkout") {
            navigate("/checkout");
          } else if (loginPath === "LogIn") {
            navigate("/user");
          }
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };
  const {
    values,
    errors,
    touched, 
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialUser,
    validationSchema: logInSchema,
    onSubmit: (values, action) => {
      logIn(values);
      action.resetForm();
    },
  });
  return (
    <div className="login-box">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="user-box">
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          <label htmlFor="email">Email</label>
          {errors.email && touched.email && (
            <h6 className="error">{errors.email}</h6>
          )}
        </div>
        <div className="user-box">
          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          <label htmlFor="password">Password</label>
          {errors.password && touched.password && (
            <h6 className="error">{errors.password}</h6>
          )}
        </div>
        <button type="submit"> 
            <span></span>
            <span></span>
            <span></span>
            <span></span>Submit 
        </button>

        <button type="submit" onClick={() =>navigate("/signup")}> 
            <span></span>
            <span></span>
            <span></span>
            <span></span>Sign Up 
        </button> 
      </form>
    </div>
  );
};

export default LogIn;
