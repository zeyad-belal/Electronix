/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import OtherServices from "../components/OtherServices";
import NewArrivalsSlider from "../components/NewArrivalsSlider";
import Circles from "../components/Circles";
import DealsSlider from "../components/DealsSlider";
import axios from "axios";
import AdsSlider from "../components/AdsSlider";
import { useCookies } from "react-cookie";

// the global state
import { useGlobalContext } from "../context/ProductsContext";

export default function Home() {
  const [cookies, setCookies, removeCookie] = useCookies(["User"]);

  /* ///////////////////////////////////////////////////////
      the fetched products from the global state & loading
      variable that indicates whether the data has been 
      fetched already or still being fetched:

      this variable will be used as follow:
      {loading && <LoadingComponent />}
      {!loading && <ProductsComponent>}
      OR
      if (loading) return <LoadingComponent />
      return <ProductsComponent />
     ///////////////////////////////////////////////////////
   */

  //  THAT IS HOW TO ACCESS ANYTHING FROM THE GLOBAL STATE
  const { loading, products } = useGlobalContext();

  useEffect(() => {
    // async function getProducts(){
    // const response = await axios.get("${import.meta.env.VITE_API_URL}/products")
    // console.log(response.data)
    // setProducts(response.data)
    // }
    // getProducts()

    async function getUserData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
          {
            headers: { Authorization: cookies.UserToken }
          }
        );
        setCookies("User", response.data.user);
      } catch (error) {
        console.error(error);
      }
    }

    if (window.localStorage.getItem("logged")) {
      getUserData();
    }
  }, []);

  return (
    <>
      <AdsSlider />
      <OtherServices />
      <Circles />
      <NewArrivalsSlider />
      <Categories />
      <DealsSlider />
    </>
  );
}
