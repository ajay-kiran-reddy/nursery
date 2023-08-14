import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CustomCard from "../shared/CustomCard";
import { Button, Chip, Tooltip } from "@mui/material";
import CreateOrderDialog from "./CreateOrderDialog";
import { useDispatch, useSelector } from "react-redux";
import { Order, orderSlice } from "./slices/slice";
import { formatDate } from "../../utils/globalUtils";
import DeleteIcon from "@mui/icons-material/Delete";
import StockChart from "./StockChart";
import BarChartIcon from "@mui/icons-material/BarChart";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleEditOrder = (data) => {
    props.handleDialog(true);
    console.log(data, "[DATA]");
    dispatch(
      orderSlice.actions.saveOrderInfo({
        plant: data?.items[0].plant._id,
        price: data?.plantsPrice,
        quantity: data?.items[0].quantity,
        shippingPrice: data?.shippingPrice,
        orderedDate: data?.updatedAt,
        paymentMethod: data?.paymentMethod,
        paymentDone: data?.paymentDone,
        isEdit: true,
        _id: data._id,
      })
    );
    dispatch(
      orderSlice.actions.saveBuyerInfo({
        ...data?.customerInfo,
        pinCode: data?.customerInfo?.postalCode,
      })
    );
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row" aria-label="a dense table">
          {row?.items[0]?.plant?.name}
        </TableCell>
        <TableCell align="left">{row?.plantsPrice}Rs/-</TableCell>
        <TableCell align="left">{row?.items[0]?.plant?.quantity}</TableCell>
        <TableCell align="left">{row?.items[0]?.quantity}</TableCell>
        <TableCell align="left">{row.shippingPrice} Rs/-</TableCell>
        <TableCell align="left">{row.totalPrice} Rs/-</TableCell>
        <TableCell align="left">
          <Chip
            size="small"
            label={row.status}
            color={row.status === "APPROVED" ? "primary" : "secondary"}
          />
        </TableCell>

        <TableCell align="right">
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => handleEditOrder(row)}
          >
            Edit
          </Button>
          {row.status === "APPROVED" ? (
            <Button
              size="small"
              color="secondary"
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={() =>
                dispatch(
                  orderSlice.actions.updateOrder({
                    ...row,
                    status: "DENIED",
                  })
                )
              }
            >
              Deny
            </Button>
          ) : (
            <Button
              size="small"
              color="primary"
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={() =>
                dispatch(
                  orderSlice.actions.updateOrder({ ...row, status: "APPROVED" })
                )
              }
            >
              Approve
            </Button>
          )}

          <Tooltip title="Delete">
            <IconButton
              style={{ marginLeft: "1rem" }}
              onClick={() => dispatch(orderSlice.actions.storeDeleteOrder(row))}
            >
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          </Tooltip>
        </TableCell>

        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                style={{ fontWeight: "bold" }}
                gutterBottom
                component="div"
              >
                Buyer Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Buyer</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="left">Ordered at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[row?.customerInfo]?.map((customer) => (
                    <TableRow key={customer.date}>
                      <TableCell component="th" scope="row">
                        {customer.name}
                      </TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell align="left">{customer.city}</TableCell>
                      <TableCell align="left">{customer.phoneNumber}</TableCell>
                      <TableCell align="left">
                        {formatDate(row.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function OrderLandingPage() {
  const orderState = useSelector(Order);
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();
  const [showChart, setShowChart] = React.useState(true);

  const handleDialog = (value) => {
    setOpenDialog(value);
  };

  React.useEffect(() => {
    dispatch(orderSlice.actions.getOrders());
    dispatch(orderSlice.actions.getPlants());
  }, []);

  return (
    <div>
      <CreateOrderDialog open={openDialog} handleDialog={handleDialog} />
      <CustomCard
        content={
          <TableContainer component={Paper} elevation={0}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Plant Name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Stock Available</TableCell>
                  <TableCell align="left">Purchased Quantity</TableCell>
                  <TableCell align="left">Shipping charges</TableCell>
                  <TableCell align="left">Total Amount</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderState?.ordersList.map((row) => (
                  <Row key={row._id} row={row} handleDialog={handleDialog} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
        title="Orders"
        titleAction={
          <>
            <Button
              style={{ marginRight: "10px" }}
              color="secondary"
              variant="outlined"
              startIcon={<BarChartIcon />}
              onClick={() => setShowChart(!showChart)}
            >
              {!showChart ? "Show Chart" : "Hide Chart"}
            </Button>
            <Button onClick={() => handleDialog(true)} variant="contained">
              Add New Order
            </Button>
          </>
        }
      />
      <div style={{ marginTop: "2rem" }}>
        {showChart && <StockChart data={orderState?.plants} />}
      </div>
    </div>
  );
}
