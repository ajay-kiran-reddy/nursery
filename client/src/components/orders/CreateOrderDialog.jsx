import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OrderStepper from "./stepper/OrderStepper";
import { useDispatch, useSelector } from "react-redux";
import { Order, orderSlice } from "./slices/slice";

export default function CreateOrderDialog({ open, handleDialog }) {
  const dispatch = useDispatch();
  const orderState = useSelector(Order);

  const handleCreateOrder = () => {
    const { orderInfo, buyerInfo } = orderState;

    const {
      quantity,
      plant,
      price,
      shippingPrice,
      paymentMethod,
      paymentDone,
      _id,
    } = orderInfo;

    const { name, address, city, country, phoneNumber, state, pinCode } =
      buyerInfo;
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
      _id,
    };

    const isEditMode = orderState.orderInfo?.isEdit;

    dispatch(
      isEditMode
        ? orderSlice.actions.updateOrder(requestBody)
        : orderSlice.actions.createOrder()
    );
    handleDialog(false);
  };

  const handleClose = () => {
    handleDialog(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"xl"}
        maxWidth={"xl"}
      >
        <DialogTitle>Create Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all the mandatory order details
          </DialogContentText>
          <OrderStepper />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateOrder}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
