import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OrderSummary from "./OrderSummary";
import { Grid, TextField } from "@mui/material";
import OrderInfo from "./OrderInfo";
import BuyerInfo from "./BuyerInfo";

const steps = ["Enter Order details", "Enter Buyer details", "Summary"];

export default function OrderStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [orderInfo, setOrderInfo] = React.useState(null);
  const [buyerInfo, setBuyerInfo] = React.useState(null);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOrderInfoCb = (data) => {
    setOrderInfo(data);
  };

  const handleBuyerInfoCb = (data) => {
    setBuyerInfo(data);
  };

  const RenderStepContent = ({ step }) => {
    if (step === 0) {
      return <OrderInfo handleOrderInfoCb={handleOrderInfoCb} />;
    } else if (step === 1) {
      return <BuyerInfo handleBuyerInfoCb={handleBuyerInfoCb} />;
    } else return <OrderSummary orderInfo={orderInfo} buyerInfo={buyerInfo} />;
  };

  return (
    <Box sx={{ width: "100%" }} mt={1}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <RenderStepContent step={activeStep} />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
