import React from "react";
import { Grid, Container } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./checkoutform.module.css";

import TextField from "../../components/FormsUI/Textfield";
import Button from "../../components/FormsUI/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const INITIAL_FORM_STATE = {
  fullName: "",
  phoneNumber: "",
  tableNumber: "",
  specialInstruction: "",
};

const FORM_VALIDATION = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  phoneNumber: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
  tableNumber: Yup.string().required("Required"),
  specialInstruction: Yup.string(),
});

const Checkoutform = () => {
  //
  //
  const notify = () => {
    toast.success("Your order is received");
  };
  const addItemNotify = () => {
    toast.warning("Add items to your cart");
  };
  //
  const sendDataToTable = async (values) => {
    // send order details to Order table.

    try {
      let retrievedCartData = [];
      retrievedCartData = localStorage.getItem("cartItem"); // receiving a string or null

      if (retrievedCartData !== null) {
        let cartItems = retrievedCartData; // JSON.parse(retrievedCartData); // get it as js object []
        const totalPrice = 1200;
        const body = { cartItems, totalPrice, ...values };

        const response = await fetch("/order", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        localStorage.removeItem("cartItem");
        notify();
        setTimeout(() => {
          window.location.href = "/menulist";
        }, 2500);

        // window.location.reload();
      } else {
        addItemNotify();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12}>
        <Container>
          <div className={styles.formWrapper}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                sendDataToTable(values);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField name="fullName" label="Full Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="phoneNumber" label="Phone number" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="tableNumber" label="Table Number" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="specialInstruction"
                      label="Any Special Instruction/ Request"
                      multiline={true}
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button>Order Now!</Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Checkoutform;
