import { postData, fetchData, updateData, deleteData } from "../../../api/api";

const handleSignUp = (data) => {
  return postData("/user/signup", data);
};

const handleSignIn = (data) => {
  return postData("/user/signIn", data);
};
const handleForgetPassword = (data) => {
  return postData("/user/forgotPassword", data);
};

const createOrderService = (data) => {
  return postData("/orders", data);
};

const fetchPlants = () => {
  return fetchData("/plants");
};

const fetchOrders = () => {
  return fetchData("/orders");
};

const approveOrderApi = (data) => {
  return updateData(`/orders/${data._id}`, data);
};

const deleteOrderApi = (data) => {
  return deleteData(`/orders/${data._id}`, data);
};

export {
  createOrderService,
  handleSignUp,
  handleSignIn,
  handleForgetPassword,
  fetchPlants,
  fetchOrders,
  approveOrderApi,
  deleteOrderApi,
};
