import { Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Order } from "../slices/slice";

export default function OrderSummary() {
  const orderState = useSelector(Order);
  const orderInfo = orderState.orderInfo || {};
  const buyerInfo = orderState.buyerInfo || {};

  return (
    <div style={{ marginTop: "1rem" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{ border: "1px dashed lightgrey", padding: "0.5rem" }}
        >
          <Typography variant="h6" color="primary">
            Order Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Plant</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {orderInfo?.plant}
              </Typography>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Price</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {orderInfo?.price} Rs/-
              </Typography>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Shipping charges</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {orderInfo?.shippingPrice} Rs/-
              </Typography>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Quantity</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {orderInfo.quantity}
              </Typography>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Payment Method</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {orderInfo.paymentMethod}
              </Typography>
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Total Amount</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {orderInfo.price * orderInfo.quantity + orderInfo.shippingPrice}{" "}
                Rs/-
              </Typography>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Payment Status</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {orderInfo.paymentDone ? "Paid" : "Not Paid"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            border: "1px dashed lightgrey",
            padding: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <Typography variant="h6" color="primary">
            Buyer Information
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Name</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {buyerInfo.name}
              </Typography>
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Phone Number</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {buyerInfo.phoneNumber}
              </Typography>
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Address</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {buyerInfo.address}
              </Typography>
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">City</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {buyerInfo.city}
              </Typography>
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">State</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {buyerInfo.state}
              </Typography>
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Country</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {buyerInfo.country}
              </Typography>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <Typography variant="subtitle1">Pin Code</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {buyerInfo.pinCode}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
