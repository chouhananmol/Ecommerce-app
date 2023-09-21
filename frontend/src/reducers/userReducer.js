import { createReducer } from "@reduxjs/toolkit";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
  // DELETE_USER_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/userConstants";

const initialState = {
  user: {},
  loading: false,
  isAuthenticated: false,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase([LOGIN_REQUEST, REGISTER_USER_REQUEST,LOAD_USER_REQUEST], (state, action) => ({
      loading: true,
      isAuthenticated: false,
    }))
    .addCase(LOGIN_SUCCESS,
      (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      })
    )
    .addCase(REGISTER_USER_SUCCESS,
      (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      })
    )
    .addCase(LOAD_USER_SUCCESS,
      (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      })
    )
    .addCase(LOAD_USER_FAIL, (state, action) => ({
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    }))
    .addCase(LOGIN_FAIL,
      (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      })
    )
    .addCase(REGISTER_USER_FAIL,
      (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      })
    )
    .addCase(LOGOUT_SUCCESS, (state, action) => ({
      loading: false,
      isAuthenticated: false,
      user: null,
    }))
    .addCase(LOGOUT_FAIL, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }))
    .addCase(CLEAR_ERRORS, (state, action) => ({
      ...state,
      error: null,
    }));
});

export const profileReducer = createReducer(
  {
    user: {},
    loading: false,
    isUpdated: false,
    isDeleted: false,
    message: null,
    error: null,
  },
  (builder) => {
    builder
      .addCase(UPDATE_PROFILE_REQUEST,
        (state, action) => ({
          ...state,
          loading: true,
        })
      )
      .addCase(UPDATE_PASSWORD_REQUEST,
        (state, action) => ({
          ...state,
          loading: true,
        })
      )
      .addCase(UPDATE_USER_REQUEST,
        (state, action) => ({
          ...state,
          loading: true,
        })
      )
      .addCase(DELETE_USER_REQUEST,
        (state, action) => ({
          ...state,
          loading: true,
        })
      )
      .addCase(UPDATE_PROFILE_SUCCESS,
        (state, action) => ({
          ...state,
          loading: false,
          isUpdated: action.payload,
        })
      )
      .addCase(UPDATE_PASSWORD_SUCCESS,
        (state, action) => ({
          ...state,
          loading: false,
          isUpdated: action.payload,
        })
      )
      .addCase(UPDATE_USER_SUCCESS,
        (state, action) => ({
          ...state,
          loading: false,
          isUpdated: action.payload,
        })
      )
      .addCase(UPDATE_PROFILE_RESET,
        (state, action) => ({
          ...state,
          isUpdated: false,
        })
      )
      .addCase( UPDATE_PASSWORD_RESET,
        (state, action) => ({
          ...state,
          isUpdated: false,
        })
      )
      .addCase(UPDATE_USER_RESET,
        (state, action) => ({
          ...state,
          isUpdated: false,
        })
      )
      .addCase(UPDATE_PROFILE_FAIL,
        (state, action) => ({
          ...state,
          loading: false,
          error: action.payload,
        })
      )
      .addCase(UPDATE_PASSWORD_FAIL,
        (state, action) => ({
          ...state,
          loading: false,
          error: action.payload,
        })
      )
      .addCase(UPDATE_USER_FAIL,
        (state, action) => ({
          ...state,
          loading: false,
          error: action.payload,
        })
      )
      .addCase(DELETE_USER_SUCCESS, (state, action) => ({
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      }))
      .addCase(DELETE_USER_RESET, (state, action) => ({
        ...state,
        isDeleted: false,
      }))
      .addCase(CLEAR_ERRORS, (state, action) => ({
        ...state,
        error: null,
      }));
  }
);

export const forgotPasswordReducer = createReducer(
  {
    loading: false,
    success: false,
    message: null,
    error: null,
  },
  (builder) => {
    builder
      .addCase(
        [FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST],
        (state, action) => ({
          ...state,
          error: null,
          loading: true,
        })
      )
      .addCase(FORGOT_PASSWORD_SUCCESS, (state, action) => ({
        ...state,
        loading: false,
        message: action.payload,
      }))
      .addCase(FORGOT_PASSWORD_FAIL,
        (state, action) => ({
          ...state,
          loading: false,
          error: action.payload,
        })
      )
      .addCase(RESET_PASSWORD_FAIL,
        (state, action) => ({
          ...state,
          loading: false,
          error: action.payload,
        })
      )
      .addCase(RESET_PASSWORD_SUCCESS, (state, action) => ({
        ...state,
        loading: false,
        success: action.payload,
      }))
      .addCase(CLEAR_ERRORS, (state, action) => ({
        ...state,
        error: null,
      }));
  }
);

export const allUsersReducer = createReducer(
  {
    users: [],
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(ALL_USERS_REQUEST, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(ALL_USERS_SUCCESS, (state, action) => ({
        ...state,
        loading: false,
        users: action.payload,
      }))
      .addCase(ALL_USERS_FAIL, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      .addCase(CLEAR_ERRORS, (state, action) => ({
        ...state,
        error: null,
      }));
  }
);

export const userDetailsReducer = createReducer(
  {
    user: {},
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(USER_DETAILS_REQUEST, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(USER_DETAILS_SUCCESS, (state, action) => ({
        ...state,
        loading: false,
        user: action.payload,
      }))
      .addCase(USER_DETAILS_FAIL, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      .addCase(CLEAR_ERRORS, (state, action) => ({
        ...state,
        error: null,
      }));
  }
);
