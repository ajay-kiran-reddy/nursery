import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Order, orderSlice } from "../slices/slice";

export default function OrderInfo() {
  const dispatch = useDispatch();
  const orderState = useSelector(Order);
  const orderInfo = orderState?.orderInfo;
  const [activeField, setActiveField] = useState("");

  const handleOrderInfo = (e, field) => {
    const value = e.target.value;
    dispatch(
      orderSlice.actions.saveOrderInfo({ ...orderInfo, [field]: value })
    );
    console.log(field, "[FIELD]");
    dispatch(orderSlice.actions.updateActiveIndex(field));
  };

  const handleDateChange = (date) => {
    dispatch(
      orderSlice.actions.saveOrderInfo({
        ...orderInfo,
        orderedDate: new Date(date),
      })
    );
  };

  return (
    <div>
      <Grid container spacing={3} style={{ marginTop: "0.2rem" }}>
        <Grid item xs={6} md={4} lg={3}>
          <FormControl required sx={{ minWidth: "100%", paddingTop: "8px" }}>
            <InputLabel id="demo-select-small-label">Plant</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={orderInfo?.plant}
              label="Plant"
              onChange={(e) => handleOrderInfo(e, "plant")}
            >
              {orderState?.plants?.map((plant) => {
                return (
                  <MenuItem id={plant._id} value={plant._id}>
                    {plant.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            key="plant_price"
            required
            autoFocus={orderState.activeIndex === "price"}
            omMouseEnter={() => setActiveField("price")}
            label="Price"
            value={orderInfo?.price}
            type="number"
            style={{ width: "100%", paddingTop: "8px" }}
            onChange={(e) => handleOrderInfo(e, "price")}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            required
            autoFocus={orderState.activeIndex === "shippingPrice"}
            label="Shipping Price"
            type="number"
            value={orderInfo?.shippingPrice}
            style={{ width: "100%", paddingTop: "8px" }}
            onChange={(e) => handleOrderInfo(e, "shippingPrice")}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <TextField
            required
            autoFocus={orderState.activeIndex === "quantity"}
            label="Quantity"
            type="number"
            value={orderInfo?.quantity}
            style={{ width: "100%", paddingTop: "8px" }}
            onChange={(e) => handleOrderInfo(e, "quantity")}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <LocalizationProvider required dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className="datePicker"
                label="Order Date"
                defaultValue={dayjs(new Date())}
                onChange={handleDateChange}
                value={dayjs(orderInfo?.orderedDate)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <FormControl required sx={{ minWidth: "100%", paddingTop: "8px" }}>
            <InputLabel id="demo-select-small-label">Payment Method</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={orderInfo?.paymentMethod}
              label="Plant"
              onChange={(e) => handleOrderInfo(e, "paymentMethod")}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value={"COD"}>Cash on delivery</MenuItem>
              <MenuItem value={"ONLINE"}>Online</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <FormControl required sx={{ minWidth: "100%", paddingTop: "8px" }}>
            <InputLabel id="demo-select-small-label">Payment Done</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={orderInfo?.paymentDone}
              label="Plant"
              onChange={(e) => handleOrderInfo(e, "paymentDone")}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
