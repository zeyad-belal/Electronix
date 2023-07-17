/* eslint-disable no-unused-vars */

import React from "react"

const CartContext = React.createContext({
  items :[],
  totalAmount : 0 ,
  totalItemsNum:0,
  changed :false,
  addItem : (item) => {},
  removeItem : (id) => {},
  clearCart : () => {},
  sendCartItems: (cart)=>{},
  replaceCart: ()=>{}
})

export default CartContext