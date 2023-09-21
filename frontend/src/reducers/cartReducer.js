import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO} from "../constants/cartConstants";

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cartItems :[],
    shippingInfo :{}
}

export const cartReducer = createReducer(initialState, (builder)=>{
    builder
    .addCase( ADD_TO_CART,(state, action)=>{
        const item = action.payload;
        const isItemExist = state.cartItems.find((i) => i.product === item.product);
        if(isItemExist){
            state.cartItems = state.cartItems.map((i)=>{
                if(i.product === item.product){
                    return item;
                }else{
                    return i;
                }
            })
        }else{
            state.cartItems.push(item);
        }
    })
    .addCase( REMOVE_FROM_CART,(state, action)=>{
        state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
    })
    .addCase(SAVE_SHIPPING_INFO,(state, action)=>{
       state.shippingInfo = action.payload;
    })
});