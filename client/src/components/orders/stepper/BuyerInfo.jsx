import { Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order, orderSlice } from "../slices/slice";

export default function BuyerInfo() {
  const dispatch = useDispatch();
  const orderState = useSelector(Order);
  const buyerInfo = orderState?.buyerInfo;

  const handleBuyerInfo = (e, field) => {
    const value = e.target.value;
    dispatch(
      orderSlice.actions.saveBuyerInfo({ ...buyerInfo, [field]: value })
    );
    dispatch(orderSlice.actions.updateActiveIndex(field));
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            autoFocus={orderState.activeIndex === "name"}
            label="Buyer Name"
            value={buyerInfo?.name}
            onChange={(e) => handleBuyerInfo(e, "name")}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            autoFocus={orderState.activeIndex === "phoneNumber"}
            label="Phone Number"
            style={{ width: "100%" }}
            type="number"
            value={buyerInfo?.phoneNumber}
            onChange={(e) => handleBuyerInfo(e, "phoneNumber")}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            autoFocus={orderState.activeIndex === "address"}
            onChange={(e) => handleBuyerInfo(e, "address")}
            label="Address"
            value={buyerInfo?.address}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            autoFocus={orderState.activeIndex === "city"}
            onChange={(e) => handleBuyerInfo(e, "city")}
            label="City Name"
            value={buyerInfo?.city}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            autoFocus={orderState.activeIndex === "state"}
            onChange={(e) => handleBuyerInfo(e, "state")}
            label="State Name"
            value={buyerInfo?.state}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            autoFocus={orderState.activeIndex === "country"}
            onChange={(e) => handleBuyerInfo(e, "country")}
            label="Country"
            value={buyerInfo?.country}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            autoFocus={orderState.activeIndex === "pinCode"}
            onChange={(e) => handleBuyerInfo(e, "pinCode")}
            label="Pin Code"
            type="number"
            value={buyerInfo?.pinCode}
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
