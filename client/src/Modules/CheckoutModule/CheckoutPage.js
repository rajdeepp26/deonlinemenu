import React, { Fragment } from "react";
import styles from "./checkoutpage.module.css";

// Components
import Navbar from "../../components/Navbar/Navbar";
import Checkoutform from "../CheckoutModule/Checkoutform";

const CheckoutPage = () => {
  return (
    <Fragment>
      <Navbar currentPage="checkout" />
      <div className={styles.menu}>
        <p> Your Order Details </p>
      </div>
      <Checkoutform />
    </Fragment>
  );
};

export default CheckoutPage;
