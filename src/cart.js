import React, { useEffect, useState } from "react";
import productStyle from "./books_style";
import { Typography, Button, Link } from "@material-ui/core";
import cartService from "./cart_Service";
import orderService from "./order_Service";
import { useCartContext } from "./context/cartContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import './App.css'

const Cart = () => {
    const data = localStorage.getItem('userInfo');
  const userInfo = JSON.parse(data || '{}');
    const cartContext = useCartContext();
    const navigate = useNavigate();
  
    const [cartList, setCartList] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
  
    const classes = productStyle();
  
    const getTotalPrice = (itemList) => {
      let totalPrice = 0;
      itemList.forEach((item) => {
        const itemPrice = item.quantity * parseInt(item.book.price);
        totalPrice = totalPrice + itemPrice;
      });
      setTotalPrice(totalPrice);
    };
  
    useEffect(() => {
        console.log("userInfo cat", userInfo.id);
      setCartList(cartContext.cartData);
      setItemsInCart(cartContext.cartData.length);
      getTotalPrice(cartContext.cartData);
    }, [cartContext.cartData]);
  
    const removeItem = async (id) => {
      try {
        const res = await cartService.removeItem(id);
        if (res) {
          cartContext.updateCart();
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
  
    const updateQuantity = async (cartItem, inc) => {
      const currentCount = cartItem.quantity;
      const quantity = inc ? currentCount + 1 : currentCount - 1;
      if (quantity === 0) {
        toast.error("Item quantity should not be zero");
        return;
      }
  
      try {
        const res = await cartService.updateItem({
          id: cartItem.id,
          userId: cartItem.userId,
          bookId: cartItem.book.id,
          quantity,
        });
        if (res) {
          const updatedCartList = cartList.map((item) =>
            item.id === cartItem.id ? { ...item, quantity } : item
          );
          cartContext.updateCart(updatedCartList);
          const updatedPrice =
            totalPrice +
            (inc
              ? parseInt(cartItem.book.price)
              : -parseInt(cartItem.book.price));
          setTotalPrice(updatedPrice);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
  
    const placeOrder = async () => {
      if (userInfo.id) {
        const userCart = await cartService.getList(userInfo.id);
        if (userCart.length) {
          try {
            let cartIds = userCart.map((element) => element.id);
            const newOrder = {
              userId: userInfo.id,
              cartIds,
            };
            const res = await orderService.placeOrder(newOrder);
            if (res) {
              cartContext.updateCart();
              navigate("/");
              toast.success("Order placed successfully");
            }
          } catch (error) {
            toast.error(`Order cannot be placed ${error}`);
          }
        } else {
          toast.error("Your cart is empty");
        }
      }
    };
  
    return (
      <div className="div_bg">
        <div className="div_center">
        <ToastContainer />
        <div className="container">
          <center><Typography variant="h1">Cart page</Typography></center>
          <div className="cart-heading-block">
            <Typography variant="h2">
             <center>My Shopping Bag ({itemsInCart} Items)</center>
            </Typography>
            <div className="total-price">Total price: {totalPrice}</div>
          </div>
          <div className="inner-wrappe">
            <div className="product-list-inner-wrapper">
            {cartList.map((cartItem) => {
              return (
                <div className="product-list" key={cartItem.id}>
                  <center>
                  <div className="cart-item-img">
                    <Link>
                      <img src={cartItem.book.base64image} alt="dummy-pic" />
                    </Link>
                  </div>
                  <div className="cart-item-content"><br/>
                    <div className="cart-item-top-content">
                      <div className="cart-item-left">
                        <p className="brand">{cartItem.book.name}</p>
                        <Link>Cart item name</Link>
                      </div>
                      <div className="price-block"><br/>
                        <span className="current-price">
                          MRP &#8377; {cartItem.book.price}
                        </span>
                      </div>
                    </div>
                    <div className="cart-item-bottom-content">
                      <div className="qty-group">
                        <Button
                          className="btn pink-btn"
                          onClick={() => updateQuantity(cartItem, true)}
                        >
                          <div className="sign">+</div>
                        </Button>
                        <span className="number-count">{cartItem.quantity}</span>
                        <Button
                          className="btn pink-btn"
                          onClick={() => updateQuantity(cartItem, false)}
                        >
                           <div className="sign">-</div>
                        </Button>
                      </div>
                      <Link  className="remove" onClick={() => removeItem(cartItem.id)}>Remove</Link>
                    </div>
                  </div>
                  </center>
                </div>
              );
            })}
            </div>
          </div>
          <div className="btn_final">
            <Button className="btn_order" onClick={placeOrder}>
              Place order
            </Button>
          </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default Cart;
  