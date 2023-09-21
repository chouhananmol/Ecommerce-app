import React from 'react';
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from '../../actions/cartAction';
import { Typography } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItems } = useSelector((state) => state.cart);

    const increaseQty = (id, quantity, stock) =>{
        const newQty = quantity + 1;
        if(stock <= quantity) return;
        dispatch(addToCart(id, newQty));
    };

    const decreaseQty = (id, quantity) =>{
        const newQty = quantity - 1;
        if(quantity <= 1) return;
        dispatch(addToCart(id, newQty));
    }

    const deleteCartItems = (id) =>{
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () =>{
        navigate("/login?redirect=shipping");
    }



  return (
    <>
        {cartItems.length === 0? (
            <div className="emptyCart">
                <RemoveShoppingCartIcon />
                <Typography>There are no products in your Cart</Typography>
                <Link to="/products">Go Back/View Products</Link>
            </div>
        ): (
            <>
            <div className="wrapper">
                <div className="cartPage">
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>
                    {cartItems && cartItems.map((item) => (
                        <div className="cartContainer" key={item.product}>
                            <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                            <div className="cartInput">
                                <button onClick={() => decreaseQty(item.product, item.quantity)}>-</button>
                                <input type="number" value={item.quantity} readOnly />
                                <button onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</button>
                            </div>
                            <p className="cartSubtotal">{`$${item.price * item.quantity}`}</p>
                        </div>
                    ))}
                    <div className="cartGrossProfit">
                        <div></div>
                        <div className="cartGrossProfitBox">
                            <p>Gross Total</p>
                            <p>{`$${cartItems.reduce((totalsum, item) => totalsum+ item.quantity * item.price, 0)}`}</p>
                        </div>
                        <div></div>
                        <div className="checkOutBtn">
                            <button onClick={checkoutHandler}>Check Out</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )}
    </>
  )
}

export default Cart;
