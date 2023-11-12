import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentLoginPath } from "../../state/index";

export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: data.user.id,
      jwt: data.jwt,
    })
  );
};

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || '""';
  return JSON.parse(stringifiedUser || {});
};

export const Protector = ({ Component }) => {
  const dispatch = useDispatch();
  dispatch(setCurrentLoginPath(Component.name));

  console.log("Protector1", { Component });
  console.log("Protector2", Component.name);
  const navigate = useNavigate();

  const { jwt } = userData();

  useEffect(() => {
    if (Component.name === "SignUp") {
      dispatch(setCurrentLoginPath(Component.name));
      navigate("/signup");
    } else if (!jwt) {
      navigate("/login");
    }
  }, [navigate, jwt]);

  return <Component />;
};
