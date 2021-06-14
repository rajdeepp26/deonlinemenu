import React, { Fragment } from "react";

// import styles from "./cartpage.module.css";
// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Listcartitems from "../CartModule/Listcartitems";

const CartPage = (props) => {
  return (
    <Fragment>
      <Navbar currentPage="cart" />
      <Listcartitems />
    </Fragment>
  );
};

export default CartPage;
