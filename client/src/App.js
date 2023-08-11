import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import OrderLandingPage from "./components/orders/OrderLandingPage";
import CustomLoader from "./components/shared/CustomLoader";
import { useDispatch, useSelector } from "react-redux";
import { Order, orderSlice } from "./components/orders/slices/slice";
import { RESET_API_RESPONSE } from "./constants";
import { Alert, Snackbar } from "@mui/material";

function App() {
  const state = useSelector(Order);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(orderSlice.actions.updateApiResponse(RESET_API_RESPONSE));
  };

  return (
    <div className="App">
      <Snackbar
        open={state.apiResponse?.visible}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          severity={state.apiResponse?.severity}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {state.apiResponse?.message}
        </Alert>
      </Snackbar>
      <CustomLoader show={state.isLoading} />
      <Header />
      <div style={{ margin: "1rem" }}>
        <OrderLandingPage />
      </div>
    </div>
  );
}

export default App;
