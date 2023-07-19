/* eslint-disable no-unused-vars */

import React from "react"

const CartContext = React.createContext({
  items :[],
  totalAmount : 0 ,
  totalItemsNum:0,
  addItem : (item) => {},
  removeItem : (id) => {},
  clearCart : () => {},
  sendCartItems: (cart)=>{}
})

export default CartContext