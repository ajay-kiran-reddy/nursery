import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  orderInfo: {},
  buyerInfo: {},
  summary: {},
  userLoginInfo: {},
  userSignUpInfo: {},
  forgotPasswordInfo: {},
  plants: [],
  ordersList: [],
  approveOrderInfo: {},
  editOrder: {},
  deleteOrder: null,
  apiResponse: {
    message: "",
    severity: "",
    visible: false,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    saveOrderInfo: (state, action) => {
      state.orderInfo = action.payload;
    },
    saveBuyerInfo: (state, action) => {
      state.buyerInfo = action.payload;
    },
    createOrder: (state) => {
      state.isLoading = true;
    },
    storeLoginInfo: (state, action) => {
      state.isLoading = true;
      state.userLoginInfo = action.payload;
    },
    storeSignUpInfo: (state, action) => {
      state.isLoading = true;
      state.userSignUpInfo = action.payload;
    },
    storeForgotPasswordInfo: (state, action) => {
      state.isLoading = true;
      state.forgotPasswordInfo = action.payload;
    },
    getPlants: (state) => {
      state.isLoading = true;
    },
    storePlants: (state, action) => {
      state.plants = action.payload;
      state.isLoading = false;
    },
    getOrders: (state) => {
      state.isLoading = true;
    },
    storeOrders: (state, action) => {
      state.ordersList = action.payload;
      state.isLoading = false;
    },
    updateOrder: (state, action) => {
      state.isLoading = true;
      state.approveOrderInfo = action.payload;
    },
    storeDeleteOrder: (state, action) => {
      state.isLoading = true;
      state.deleteOrder = action.payload;
    },
    updateApiResponse: (state, action) => {
      state.apiResponse = action.payload;
    },
    resetOrderData: (state, action) => {
      state.orderInfo = {};
      state.buyerInfo = {};
      state.summary = {};
      state.userLoginInfo = {};
      state.approveOrderInfo = {};
      state.editOrder = {};
      state.deleteOrder = null;
    },
  },
});

const Order = (state) => state.order;

export { orderSlice, Order };
