import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: "contained",
    fullWidth: true,
    onClick: handleSubmit,
    color: "primary",
    style: {
      backgroundColor: "#2e7d32",
      //12824C
      color: "#FFFFFF",
      height: "3rem",
      fontWeight: 500,
      fontSize: "1rem",
    },
  };

  return (
    <Button {...configButton} className="orderNowButton">
      {children}
    </Button>
  );
};

export default ButtonWrapper;
