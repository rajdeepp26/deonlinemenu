import { Card } from "@material-ui/core";
import React from "react";
import styles from "./eachcarditem.module.css";

const Eachcarditem = ({ details, addToCart, removeFromCart }) => {
  return (
    <div>
      <Card elevation={0}>
        <div className={styles.mainContainer}>
          <p className={styles.heading}>{details.item_name}</p>
          <div className={styles.buttonGroup}>
            <button
              className={styles.buttonAdd}
              onClick={() => addToCart(details)}
            >
              +
            </button>
            <button
              className={styles.buttonSubstract}
              onClick={() => removeFromCart(details)}
            >
              -
            </button>
          </div>
          <div className={styles.cost}>
            <div className={styles.itemCount}> {details.quantity}</div>x ₹
            {details.item_cost.toFixed(2)}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Eachcarditem;
