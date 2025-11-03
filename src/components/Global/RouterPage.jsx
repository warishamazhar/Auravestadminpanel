import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLayout from "../../layout/LandingLayout";
import Header from "../UI/Header";
import { useDispatch, useSelector } from "react-redux";
import Home from "../../screens/landing/Home";
import Authenticated from "../Screen/Authenticated";
import Auth from "../Screen/Auth";
import { loadUserFromStorage } from "../../redux/slices/authSlice";

const RouterPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state?.toggleThemeSlice?.theme);

  // Apply Redux theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  const loggedUser = useSelector((state) => state?.isLoggedUser?.isLoggedIn);
  // const loggedUser = true

  return <Router>{loggedUser ? <Authenticated /> : <Auth />}</Router>;
};

export default RouterPage;
