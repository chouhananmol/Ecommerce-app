import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CLEAR_ERRORS,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
} from "../constants/orderConstants";

import { createReducer } from '@reduxjs/toolkit';

export const newOrderReducer = createReducer({}, (builder) => {
  builder
    .addCase(CREATE_ORDER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(CREATE_ORDER_SUCCESS, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    })
    .addCase(CREATE_ORDER_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});

export const myOrdersReducer = createReducer({ orders: [] }, (builder) => {
  builder
    .addCase(MY_ORDERS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(MY_ORDERS_SUCCESS, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(MY_ORDERS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});

export const orderDetailsReducer = createReducer({ order: {} }, (builder) => {
  builder
    .addCase(ORDER_DETAILS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ORDER_DETAILS_SUCCESS, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    })
    .addCase(ORDER_DETAILS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});

export const allOrdersReducer = createReducer({ orders: [] }, (builder) => {
  builder
    .addCase(ALL_ORDERS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ALL_ORDERS_SUCCESS, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(ALL_ORDERS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});

export const orderReducer = createReducer({}, (builder) => {
  builder
    .addCase(UPDATE_ORDER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(DELETE_ORDER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(UPDATE_ORDER_SUCCESS, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    })
    .addCase(DELETE_ORDER_SUCCESS, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    })
    .addCase(UPDATE_ORDER_RESET, (state) => {
      state.isUpdated = false;
    })
    .addCase(DELETE_ORDER_RESET, (state) => {
      state.isDeleted = false;
    })
    .addCase(UPDATE_ORDER_FAIL, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(DELETE_ORDER_FAIL, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
}); 