import React from 'react';
import "./CartItemCard.css";
import { Link, useNavigate } from "react-router-dom";

const CartItemCard = ({item, deleteCartItems}) => {
    const navigate = useNavigate();
    const handleImageClick = () =>{
        navigate(`/product/${item.product}`);
    }

    return(
        <div className="CartItemCard">
            <img src={item.image} alt={item.name} onClick = {handleImageClick} style={{cursor:"alias"}}/>
            <div>
                <Link to ={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: $${item.price}`}</span>
                <p onClick={() => deleteCartItems(item.product)}>Delete</p>
            </div>
        </div>
    );
};

export default CartItemCard;