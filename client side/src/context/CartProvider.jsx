/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useReducer } from "react";

import CartContext from "./CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";
//--------------------------------Reducer-------------------------------------------


const defaultCartState = {
  items:  [],
  totalAmount:  0,
  totalItemsNum:  0,
  changed: false
};



function CartReducer(state, action) {
  if (action.type === "ADD") {
      const updatedTotalAmount =
        state.totalAmount + action.item.amount * action.item.price;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      let updatedTotalItemsNum;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      updatedTotalItemsNum = updatedItems.reduce((total, item) => {
        return total + item.amount;
      }, 0);

      
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalItemsNum: updatedTotalItemsNum,
        changed: true
      };
    }
  

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    let updatedTotalItemsNum;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    updatedTotalItemsNum = updatedItems.reduce((total, item) => {
      return total + item.amount;
    }, 0);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalItemsNum: updatedTotalItemsNum,
      changed: true
    };
  }

  if (action.type === "CLEAR") {
    return {
      items: [],
      totalAmount: 0,
      totalItemsNum: 0,
      changed: true
    };
  }

  if (action.type === "REPLACE") {
    return {
      items: action.items,
      totalAmount: action.totalAmount,
      totalItemsNum: action.totalItemsNum,
      changed: false
    };
  }

  return defaultCartState;
}

//--------------------------------Provider-------------------------------------------

function CartProvider(props) {

  const [cartState, cartDispatch] = useReducer(CartReducer, defaultCartState);

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    totalItemsNum: cartState.totalItemsNum,
    changed: cartState.changed,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
    sendCartItems: sendCartItems,
    replaceCart :replaceCart
  };

  function addItemHandler(item) {
    cartDispatch({ type: "ADD", item: item });
  }

  function removeItemHandler(id) {
    cartDispatch({ type: "REMOVE", id: id });
  }

  function clearCartHandler() {
    cartDispatch({ type: "CLEAR" });
  }

  // ---------------------sync cart with backend methods------------------------------------

  async function sendCartItems(cart, currentCartItems, userID,userToken) {
    const sendRequest = async () => {
      // Merge the current and new cart items
      const mergedCartItems = mergeCartItems(currentCartItems, cart.items);

      // Update the cart items in the backend
      const reqData = {
        cart_items: mergedCartItems.map((item) => ({
          product: item.id,
          quantity: item.amount
        }))
      };
      console.log(reqData)
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userID}`,
        reqData,
        { headers: { Authorization: userToken } }
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  }

  function mergeCartItems(currentCartItems, newCartItems) {
    // If currentCartItems is undefined, set it to an empty array
    currentCartItems = currentCartItems || [];

    // Create a map of the current cart items for easy lookup
    const currentCartItemsMap = new Map();
    currentCartItems.forEach((item) => {
      currentCartItemsMap.set(item.id, item);
    });

    // Merge the current and new cart items
    const mergedCartItems = [...currentCartItems];
    newCartItems.forEach((newItem) => {
      const currentItem = currentCartItemsMap.get(newItem.id);
      if (currentItem) {
        // If the item already exists in the cart, update its amount
        currentItem.amount += newItem.amount;
      } else {
        // If the item is new, add it to the cart
        mergedCartItems.push(newItem);
      }
    });

    return mergedCartItems;
  }

//---------------------


function replaceCart(myItems,totalAmount,totalItemsNum) {
  cartDispatch({
    type: "REPLACE",
    items: myItems || [],
    totalAmount: totalAmount || 0 ,
    totalItemsNum: totalItemsNum || 0,
    changed: false
  });
  
}


  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
