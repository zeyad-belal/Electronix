/* eslint-disable no-unused-vars */
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Footer from "../src/components/Footer";
import Home from "./pages/Home.jsx";
import FreeShipping from "./pages/FreeShipping.jsx";
import TechServices from "./pages/TechServices.jsx";
import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound.jsx";
import Products from "./pages/Products.jsx";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About.jsx";
import Subnav from "./components/Subnav.jsx";
import { useGlobalContext } from "./context/ProductsContext.jsx";
import CartContext from "./context/CartContext.jsx";
import { useCookies } from 'react-cookie';
import axios from "axios";


function App() {
  const [searchText, setSearchText] = useState("");
  const [cookies, setCookie] = useCookies(['UserToken','User']);
  const { fetchProducts } = useGlobalContext();
  const myCart = useContext(CartContext)

  // FETCHING PRODUCTS 
  useEffect(() => {
      fetchProducts();
      window.localStorage.setItem('User',JSON.stringify(cookies.User))
      window.localStorage.setItem('UserToken',cookies.UserToken)
  }, [] );

  // UPDATING cart items in backend on change
  useEffect(() => {
    async function getAndSendData(){
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${cookies.User.id}`,
      { headers: { Authorization: cookies.UserToken } }
      );
      
      const cartData = await response.data.user.cart_items;
      const quantities = cartData.map((item) => item.quantity);
      const cartItems = cartData.map((item) => item.product);
      const myItems = cartItems.map((item, index) => ({
        id: item.id,
        name: item.name,
        image: item.images[0].url,
        amount: quantities[index],
        price: item.new_price
      }));
      
      myCart.sendCartItems(myCart,myItems, cookies.User.id, cookies.UserToken);
    }
    if(window.localStorage.getItem('logged')){
      getAndSendData()
    }
  }, [myCart.changed]);
  

  // getting cart items FROM backend AFTER refresh
  useEffect(() => {
    async function getCartData(){
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${cookies.User.id}`,
      { headers: { Authorization: cookies.UserToken } }
      );
      
      const cartData = await response.data.user.cart_items;
      const quantities = cartData.map((item) => item.quantity);
      const cartItems = cartData.map((item) => item.product);
      const myItems = cartItems.map((item, index) => ({
        id: item.id,
        name: item.name,
        image: item.images[0].url,
        amount: quantities[index],
        price: item.new_price
      }));

      const totalAmount = myItems.reduce((sum, item) => sum + item.amount * item.price,0);
      const totalItemsNum = myItems.reduce((sum, item) => sum + item.amount, 0);

      myCart.replaceCart(myItems , totalAmount, totalItemsNum);
    }

    if(window.localStorage.getItem('logged')){  
      getCartData()
    }
  }, []);
  

  return (
    <>
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <div className="sticky block top-0 z-50">
        <Subnav />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Techservices" element={<TechServices />} />
        <Route path="/Freeshipping" element={<FreeShipping />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
