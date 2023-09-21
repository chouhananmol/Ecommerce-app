import React from 'react';
import { Typography, Stepper, StepLabel, Step } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./CheckoutSteps.css";

const CheckoutSteps = ({activeStep}) => {
    const steps =[
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Order Confirmation</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ]

    const stepStyles ={
        boxSizing: "border-box",
    };

  return (
    <>
    <div className="checkoutStepsHeading">
        <Stepper alternativeLabel activeStep={activeStep} sx={stepStyles}>
            {steps.map((item, index) => (
                <Step key={index}
                      active={activeStep ===index ? true: false}
                      completed={activeStep >= index? true: false}
                >
                    <StepLabel
                        sx={{
                            color: activeStep >=index ? "tomato":"rgba(0,0,0,0.649",
                        }}
                        icon={item.icon}
                    >
                        {item.label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
    </>
  )
}

export default CheckoutSteps;
