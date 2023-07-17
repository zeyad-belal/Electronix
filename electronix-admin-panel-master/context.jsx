import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import { toast } from "react-toastify";

// Define the initial state
const initialState = {
  profilePopup: false,
  loggedInUser: {},
  toBeDeletedItem: "",
  module: "",
  confirmDeletion: false,
  loading: true,
  loggedIn: false,
  products: [],
  categories: [],
  brands: [],
  users: [],
};

// Create the context
export const AppContext = createContext();

// Create the context provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   Fetch data from APIs using axios
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    await axios
      .get("http://localhost:8000/products")
      .then((res) => {
        dispatch({ type: "SET_PRODUCTS", payload: res.data });
      })
      .catch((err) => console.log(err.message));
    await axios
      .get("http://localhost:8000/categories")
      .then((res) => {
        dispatch({ type: "SET_CATEGORIES", payload: res.data });
      })
      .catch((err) => console.log(err.message));
    await axios
      .get("http://localhost:8000/brands")
      .then((res) => {
        dispatch({ type: "SET_BRANDS", payload: res.data });
      })
      .catch((err) => console.log(err.message));
    await axios
      .get("http://localhost:8000/users", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        dispatch({ type: "SET_USERS", payload: res.data });
      })
      .catch((err) => console.log(err.message));
    dispatch({ type: "DISPLAY_DATA" });
  };

  // handle deleting item
  const deleteItem = (id, module) => {
    dispatch({ type: "DELETE_ITEM", payload: { id: id, module: module } });
  };

  // cancel deletion
  const cancelDeletion = () => {
    dispatch({ type: "CANCEL_DELETION" });
  };

  // confirm deletion
  const deletionConfirm = (id, module) => {
    switch (module) {
      case "category":
        axios.delete(`http://localhost:8000/categories/${id}`);
        dispatch({ type: "DELETE_CATEGORY", payload: id });
        toast.success("Category deleted successfully!");
        break;
      case "user":
        axios.delete(`http://localhost:8000/users/${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        dispatch({ type: "DELETE_USER", payload: id });
        toast.success("User deleted successfully!");
        break;
      case "product":
        axios.delete(`http://localhost:8000/products/${id}`);
        dispatch({ type: "DELETE_PRODUCT", payload: id });
        toast.success("Product deleted successfully!");
        break;
      case "brand":
        axios.delete(`http://localhost:8000/brands/${id}`);
        dispatch({ type: "DELETE_BRAND", payload: id });
        toast.success("Brand deleted successfully!");
        break;
      default:
        break;
    }
  };

  // Update Category
  const updateCategory = (category) => {
    dispatch({ type: "UPDATE_CATEGORY", payload: category });
  };

  // Create category
  const createCategory = (category) => {
    dispatch({ type: "CREATE_CATEGORY", payload: category });
  };

  // update User
  const updateUser = (user) => {
    dispatch({ type: "UPDATE_USER", payload: user });
  };

  // add user
  const addUser = (user) => {
    dispatch({ type: "ADD_USER", payload: user });
  };

  // update product
  const updateProduct = (product) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: product });
  };

  // add product
  const addProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  // update brand
  const updateBrand = (brand) => {
    dispatch({ type: "UPDATE_BRAND", payload: brand });
  };

  // login
  const login = (loggedInUser) => {
    dispatch({ type: "LOGIN", payload: loggedInUser });
  };

  // toggle profile pop up
  const toggleProfilePopup = () => {
    dispatch({ type: "PROFILE_POPUP" });
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  // create brand
  const createBrand = (brand) => {
    dispatch({ type: "ADD_BRAND", payload: brand });
  };

  // get logged-in user data
  const getLoggedInUser = async () => {
    const response = await axios.post(
      "http://localhost:8000/users/dashboard/verify-user",
      {},
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    dispatch({
      type: "LOAD_LOGGED_IN_USER",
      payload: response.data.loggedInUser,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchData,
        deleteItem,
        cancelDeletion,
        deletionConfirm,
        updateCategory,
        createCategory,
        updateUser,
        addUser,
        getLoggedInUser,
        updateProduct,
        addProduct,
        createBrand,
        updateBrand,
        login,
        toggleProfilePopup,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
