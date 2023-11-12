import axios from "axios";
import React from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { signUpSchema } from "../../components/userSchema";
import { setCurrentLoginPath } from "../../state";
import { useDispatch, useSelector } from "react-redux";
const initialUser = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const loginPath = useSelector((state) => state.cart.currentLoginPath);
  console.log("current login pathSIGNU:",loginPath)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(() => setCurrentLoginPath("SignIn"));
  const signUp = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      if (
        values.username &&
        values.email &&
        values.password &&
        values.confirmPassword
      ) {
        const res = await axios.post(url, values);
        if (!!res) {
          toast.success("Registered successfully!", {
            hideProgressBar: true,
          });
          navigate("/login");
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
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      signUp();
      action.resetForm();
    },
  });
  return (
    <div className="login-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="user-box">
          <input
            id="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username ? "input-error" : ""}
          />
          <label htmlFor="username">Username</label>
          {errors.username && touched.username && (
            <h6 className="error">{errors.username}</h6>
          )}
        </div>
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
        <div className="user-box">
          <input
            id="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          {errors.confirmPassword && touched.confirmPassword && (
            <h6 className="error">{errors.confirmPassword}</h6>
          )}
        </div>

        <button type="submit"> 
            <span></span>
            <span></span>
            <span></span>
            <span></span>Submit 
        </button>

        <button type="submit" onClick={() =>navigate("/login")}> 
            <span></span>
            <span></span>
            <span></span>
            <span></span>Log In 
        </button>
      </form>
    </div>
  );
};

export default SignUp;
