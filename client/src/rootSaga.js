import { all } from "redux-saga/effects";
import {
  approveOrder,
  createOrder,
  deleteOrder,
  fetchOrdersInfo,
  fetchPlantsInfo,
  forgetPassword,
  userSignIn,
  userSignUp,
} from "./components/orders/sagas/saga";
// userSignIn, userSignUp, forgetPassword,
function* RootSaga() {
  yield all([
    createOrder(),
    userSignIn(),
    userSignUp(),
    forgetPassword(),
    fetchPlantsInfo(),
    fetchOrdersInfo(),
    approveOrder(),
    deleteOrder(),
  ]);
}

export default RootSaga;
