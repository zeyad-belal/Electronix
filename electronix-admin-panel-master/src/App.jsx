import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import viteLogo from "/vite.svg";
import "./App.css";

import SideNav from "./components/sidenav/Sidenav";
import Navbar from "./components/nav/Navbar";
import MainContainer from "./components/main/MainContainer";
import ShowUsers from "./components/users/ShowUsers";
import ShowProducts from "./components/products/ShowProducts";
import ShowCategories from "./components/categories/ShowCategories";
import CategoryForm from "./components/categories/CategoryForm";
import UpdateCategory from "./components/categories/UpdateCategory";
import AddUser from "./components/users/AddUser";
import AddProduct from "./components/products/AddProduct";
import UpdateUser from "./components/users/UpdateUser";
import UpdateProduct from "./components/products/UpdateProduct";
import ShowBrands from "./components/brands/ShowBrands";
import Login from "./components/login/Login";
import PopUp from "./components/profile/PopUp";
import AddBrand from "./components/brands/AddBrand";
import UpdateBrand from "./components/brands/UpdateBrand";
import Error from "./components/error-page/Error";

import { useGlobalContext } from "../context";

function App() {
  const { loggedIn, fetchData, login, profilePopup, getLoggedInUser } =
    useGlobalContext();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const navHandler = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", () => setIsNavOpen(false));

    return () => {
      window.removeEventListener("resize", navHandler);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      login();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchData();
      getLoggedInUser();
    }
  }, [loggedIn]);

  useEffect(() => {}, []);

  if (!loggedIn && !localStorage.getItem("token")) {
    return <Login />;
  }

  return (
    <>
      <div className="flex">
        <SideNav isNavOpen={isNavOpen} />
        <div
          className={`main ${
            isNavOpen
              ? "w-[60%] md:w-[80%] ml-[40%] md:ml-[20%]"
              : "w-[88%] md:w-[93.7%] ml-[12%] md:ml-[6.3%]"
          }`}
        >
          <Navbar isNavOpen={isNavOpen} navHandler={navHandler} />
          {profilePopup && <PopUp />}
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/users" element={<ShowUsers />} />
            <Route path="/products" element={<ShowProducts />} />
            <Route path="/categories" element={<ShowCategories />} />
            <Route path="/brands" element={<ShowBrands />} />
            <Route path="/add-category" element={<CategoryForm />} />
            <Route path="/edit-category/:id" element={<UpdateCategory />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<UpdateUser />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<UpdateProduct />} />
            <Route path="/add-brand" element={<AddBrand />} />
            <Route path="/edit-brand/:id" element={<UpdateBrand />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
