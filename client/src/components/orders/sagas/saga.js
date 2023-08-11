import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  getFailureApiResponse,
  getSuccessApiResponse,
} from "../../../constants";
import {
  approveOrderApi,
  createOrderService,
  deleteOrderApi,
  fetchOrders,
  fetchPlants,
  handleForgetPassword,
  handleSignIn,
  handleSignUp,
} from "../services/service";
import { Order, orderSlice } from "../slices/slice";

function* actionCreateOrder() {
  try {
    const orderState = yield select(Order);
    const {
      quantity,
      plant,
      price,
      shippingPrice,
      paymentMethod,
      paymentDone,
    } = orderState?.orderInfo;
    const { name, address, city, country, phoneNumber, state, pinCode } =
      orderState?.buyerInfo;

    const amount = price * quantity;

    let requestBody = {
      items: [
        {
          quantity: quantity,
          plant: plant,
        },
      ],
      customerInfo: {
        name,
        address,
        city,
        postalCode: pinCode,
        country,
        phoneNumber,
        state,
      },
      plantsPrice: price,
      shippingPrice: shippingPrice,
      totalPrice: Number(amount) + Number(shippingPrice),
      paymentMethod: paymentMethod,
      paymentDone,
    };
    yield call(createOrderService, requestBody);
    const data = yield call(fetchOrders);
    yield put(orderSlice.actions.storeOrders(data));
    yield put(orderSlice.actions.resetOrderData());
    yield put(
      orderSlice.actions.updateApiResponse(getSuccessApiResponse(data))
    );
  } catch (e) {
    yield put(orderSlice.actions.updateApiResponse(getFailureApiResponse(e)));
    yield put(orderSlice.actions.updateLoadingState(false));
  }
}

function* actionSignIn() {
  try {
    const state = yield select(Order);
    const data = yield call(handleSignIn, state?.userLoginInfo);
    localStorage.setItem("userInfo", JSON.stringify(data));
    yield put(
      orderSlice.actions.updateApiResponse(getSuccessApiResponse(data))
    );
    window.location.reload();
  } catch (e) {
    yield put(orderSlice.actions.updateApiResponse(getFailureApiResponse(e)));
    yield put(orderSlice.actions.updateLoadingState(false));
  }
}

function* actionSignUp() {
  try {
    const state = yield select(Order);
    const data = yield call(handleSignUp, state?.userSignUpInfo);
    yield put(
      orderSlice.actions.updateApiResponse(getSuccessApiResponse(data))
    );
    yield put(orderSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(orderSlice.actions.updateApiResponse(getFailureApiResponse(e)));
    yield put(orderSlice.actions.updateLoadingState(false));
  }
}

function* actionForgetPassword() {
  try {
    const state = yield select(Order);
    const data = yield call(handleForgetPassword, state?.forgetPassWord);
    yield put(orderSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(orderSlice.actions.updateApiResponse(getFailureApiResponse(e)));
    yield put(orderSlice.actions.updateLoadingState(false));
  }
}

function* actionFetchPlants() {
  try {
    const data = yield call(fetchPlants);
    yield put(orderSlice.actions.storePlants(data));
    yield put(orderSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(orderSlice.actions.updateApiResponse(getFailureApiResponse(e)));
    yield put(orderSlice.actions.updateLoadingState(false));
  }
}

function* actionFetchOrders() {
  try {
    const data = yield call(fetchOrders);
    yield put(orderSlice.actions.storeOrders(data));
    yield put(orderSlice.actions.updateLoadingState(false));
  } catch (e) {
    yield put(orderSlice.actions.updateApiResponse(getFailureApiResponse(e)));
    yield put(orderSlice.actions.updateLoadingState(false));
  }
}

function* actionApproveOrder() {
  try {
    const state = yield select(Order);
    const data = yield call(approveOrderApi, state?.approveOrderInfo);
    const results = yield call(fetchOrders);
    const plants = yield call(fetchPlants);
    yield put(orderSlice.actions.storePlants(plants));
    yield put(orderSlice.actions.storeOrders(results));
    yield put(
      orderSlice.actions.updateApiResponse(getSuccessApiResponse(data))
    );
    yield put(orderSlice.actions.updateLoadingState(false));
    yield put(orderSlice.actions.resetOrderData());
  } catch (e) {
    yield put(orderSlice.actions.updateApiResponse(getFailureApiResponse(e)));
    yield put(orderSlice.actions.updateLoadingState(false));
  }
}

function* actionDeleteOrder() {
  try {
    const state = yield select(Order);
    const data = yield call(deleteOrderApi, state?.deleteOrder);
    const results = yield call(fetchOrders);
    yield put(orderSlice.actions.storeOrders(results));
    yield put(
      orderSlice.actions.updateApiResponse(getSuccessApiResponse(data))
    );
    yield put(orderSlice.actions.updateLoadingState(false));
    yield put(orderSlice.actions.resetOrderData());
  } catch (e) {
    yield put(orderSlice.actions.updateApiResponse(getFailureApiResponse(e)));
    yield put(orderSlice.actions.updateLoadingState(false));
  }
}

function* userSignIn() {
  yield takeLatest(orderSlice.actions.storeLoginInfo, actionSignIn);
}

function* userSignUp() {
  yield takeLatest(orderSlice.actions.storeSignUpInfo, actionSignUp);
}

function* forgetPassword() {
  yield takeLatest(
    orderSlice.actions.storeForgotPasswordInfo,
    actionForgetPassword
  );
}

function* createOrder() {
  yield takeLatest(orderSlice.actions.createOrder, actionCreateOrder);
}

function* fetchPlantsInfo() {
  yield takeLatest(orderSlice.actions.getPlants, actionFetchPlants);
}

function* fetchOrdersInfo() {
  yield takeLatest(orderSlice.actions.getOrders, actionFetchOrders);
}

function* approveOrder() {
  yield takeLatest(orderSlice.actions.updateOrder, actionApproveOrder);
}

function* deleteOrder() {
  yield takeLatest(orderSlice.actions.storeDeleteOrder, actionDeleteOrder);
}

export {
  userSignIn,
  userSignUp,
  forgetPassword,
  createOrder,
  fetchPlantsInfo,
  fetchOrdersInfo,
  approveOrder,
  deleteOrder,
};
