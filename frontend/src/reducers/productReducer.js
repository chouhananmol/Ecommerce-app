import { createReducer } from "@reduxjs/toolkit";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  ALL_REVIEWS_FAIL,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
} from "../constants/productConstants";

const initialState = {
  products: [],
  loading: false,
  error: null,
  productCount: 0,
  resPerPage: 0,
  filteredProductsCount: 0,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ALL_PRODUCT_REQUEST, (state, action) => {
      state.loading = true;
      state.products = [];
    })
    .addCase(ALL_PRODUCT_SUCCESS, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.resPerPage = action.payload.resPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    })
    .addCase(ALL_PRODUCT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(ADMIN_PRODUCT_REQUEST, (state, action) => {
      state.loading = true;
      state.products = [];
    })
    .addCase(ADMIN_PRODUCT_SUCCESS, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(ADMIN_PRODUCT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state, action) => {
      state.error = null;
    });
});

export const productDetailsReducer = createReducer(
  {
    product: {},
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(PRODUCT_DETAILS_REQUEST, (state, action) => {
        state.loading = true;
      })
      .addCase(PRODUCT_DETAILS_SUCCESS, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(PRODUCT_DETAILS_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CLEAR_ERRORS, (state, action) => {
        state.error = null;
      });
  }
);

export const newProductReducer = createReducer(
  {
    product: {},
    loading: false,
    success: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(NEW_PRODUCT_REQUEST, (state, action) => {
        state.loading = true;
      })
      .addCase(NEW_PRODUCT_SUCCESS, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(NEW_PRODUCT_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(NEW_PRODUCT_RESET, (state, action) => {
        state.success = false;
      })
      .addCase(CLEAR_ERRORS, (state, action) => {
        state.error = null;
      });
  }
);

export const itemReducer = createReducer(
  {
    products: [],
    loading: false,
    isDeleted: false,
    isUpdated: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(DELETE_PRODUCT_REQUEST, (state, action) => {
        state.loading = true;
      })
      .addCase(DELETE_PRODUCT_SUCCESS, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(UPDATE_PRODUCT_REQUEST, (state, action) => {
        state.loading = true;
      })
      .addCase(UPDATE_PRODUCT_SUCCESS, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(DELETE_PRODUCT_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UPDATE_PRODUCT_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DELETE_PRODUCT_RESET,
        (state, action) => {
          state.isDeleted = false;
        }
      )
      .addCase(UPDATE_PRODUCT_RESET,
        (state, action) => {
          state.isUpdated = false;
        }
      )
      .addCase(CLEAR_ERRORS, (state, action) => {
        state.error = null;
      });
  }
);

export const newReviewReducer = createReducer(
  {
    loading: false,
    success: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(NEW_REVIEW_REQUEST, (state, action) => {
        state.loading = true;
      })
      .addCase(NEW_REVIEW_SUCCESS, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(NEW_REVIEW_RESET, (state, action) => {
        state.success = false;
      })
      .addCase(NEW_REVIEW_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CLEAR_ERRORS, (state, action) => {
        state.error = null;
      });
  }
);

export const productReviewsReducer = createReducer(
  {
    reviews: [],
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(ALL_REVIEWS_REQUEST, (state, action) => {
        state.loading = true;
      })
      .addCase(ALL_REVIEWS_SUCCESS, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(ALL_REVIEWS_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CLEAR_ERRORS, (state, action) => {
        state.error = null;
      });
  }
);

export const deleteReviewReducer = createReducer(
  {
    loading: false,
    isDeleted: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(DELETE_REVIEW_REQUEST, (state, action) => {
        state.loading = true;
      })
      .addCase(DELETE_REVIEW_SUCCESS, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(DELETE_REVIEW_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DELETE_REVIEW_RESET, (state, action) => {
        state.isDeleted = false;
      })
      .addCase(CLEAR_ERRORS, (state, action) => {
        state.error = null;
      });
  }
);