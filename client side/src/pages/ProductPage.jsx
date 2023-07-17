import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";

import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext"
import ProductImageCarousel from "../components/Product/ProductImageCarousel";
import ProductDetails from "../components/Product/ProductDetails";
import ProductPanels from "../components/Product/ProductPanels";
import ProductRoute from "../components/Product/ProductRoute";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const myCart = useContext(CartContext);
  const { id } = useParams();
  const userCTX = useContext(UserContext)
  
  const handleAddItemToCart = (product) => {
    if (window.localStorage.getItem("logged")) {
      myCart.addItem({
        key: product._id,
        id: product._id,
        name: product.name,
        image: product.images[0].url,
        amount: count,
        price: product.new_price ?? product.price,
      });
    } else {
    toast.info("Sign in first !", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    userCTX.toggleModal()
  }
}

  // handleCounterDecrement
  const handleCounterDecrement = () => {
    if (count > 0) {
      setCount((prevState) => prevState - 1);
    }
  };
  // handleCounterIncrement
  const handleCounterIncrement = () => {
    setCount((prevState) => prevState + 1);
  };

  // HERE INSTEAD OF FETCHING THE DATA, MAKE USE OF THE ONE IN THE GLOBAL CONTEXT
  // AND DON'T FORGET ABOUT THE LOADING FUNCTIONALITY! (-_-)
  useEffect(() => {
    async function getProduct() {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      // console.log(data);
      setProduct(data);
    }

    getProduct();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col gap-5 bg-gray-100 p-5">
          {product && (
            <>
              <div className="bg-white flex px-5">
                <ProductRoute product={product} />
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-5 bg-white p-10">
                <ProductImageCarousel productImages={product.images} />
                <ProductDetails
                  product={product}
                  count={count}
                  handleCounterDecrement={handleCounterDecrement}
                  handleCounterIncrement={handleCounterIncrement}
                  handleAddItemToCart={handleAddItemToCart}
                />
              </div>
              <div className="bg-white  px-5">
                <ProductPanels product={product} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
