import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import cartService from "../cart_Service";

const initialState = {
  cartData: [],
  updateCart: () => {},
  emptyCart: () => {},
};

export const CartContext = createContext(initialState);

export const CartWrapper = ({ children }) => {
    const data = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(data || '{}');
    console.log("userInfo", userInfo.id);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    updateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.id]);

  const updateCart = (updatedCartList) => {
    if (updatedCartList) {
      setCartData(updatedCartList);
    } else if (userInfo.id) {
      cartService.getList(userInfo.id).then((res) => setCartData(res));
    }
  };
  const emptyCart = () => {
    setCartData([]);
  };
  let value = {
    cartData,
    updateCart,
    emptyCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};
