import React, { useEffect, useState } from "react";

import Card from "@material-ui/core/Card";
import styles from "./carditem.module.css";

const Carditem = ({ details }) => {
  // Details == a single item on menu | a js object
  // addToCart == a function passed as prop
  // cartItems == a array of js object
  //---------

  const [quantity, setQuantity] = useState(0);

  const getProductQuantity = () => {
    let retrievedCartData = [];
    retrievedCartData = localStorage.getItem("cartItem"); // receiving a string or null
    if (retrievedCartData !== null) {
      let cartItems = JSON.parse(retrievedCartData); // get it as js object []
      const exist = cartItems.find((x) => x.item_id === details.item_id);
      if (exist) {
        setQuantity(exist.quantity);
      }
    }
  };

  const Buttongroup = () => {
    // display the quantity of product
    return (
      <div className={styles.buttonGroup}>
        <button
          className={styles.changeButtonPlus}
          onClick={() => addToCart(details)}
        >
          +
        </button>
        <div className={styles.itemQuantity}>{quantity}</div>
        <button
          className={styles.changeButtonSubstract}
          onClick={() => removeFromCart(details)}
        >
          -
        </button>
      </div>
    );
  };

  const addToCart = (product) => {
    let retrievedData = [];
    retrievedData = localStorage.getItem("cartItem"); // returns a string or null
    if (retrievedData !== null) {
      let previousCartItems = JSON.parse(retrievedData); // get it as js object []
      const exist = previousCartItems.find(
        (x) => x.item_id === product.item_id
      ); // return that object or undefined
      if (exist) {
        for (let i = 0; i < previousCartItems.length; i++) {
          if (previousCartItems[i].item_id === product.item_id) {
            previousCartItems[i].quantity = previousCartItems[i].quantity + 1;
            break;
          }
        }
        localStorage.setItem(
          "cartItem",
          JSON.stringify([...previousCartItems])
        );
        getProductQuantity();
      } else {
        localStorage.setItem(
          "cartItem",
          JSON.stringify([...previousCartItems, { ...product, quantity: 1 }])
        );
        getProductQuantity();
      }
    } else {
      localStorage.setItem(
        "cartItem",
        JSON.stringify([{ ...product, quantity: 1 }])
      );
      getProductQuantity();
    }
  };

  const removeFromCart = (product) => {
    let retrievedData = [];
    retrievedData = localStorage.getItem("cartItem"); // returns a string or null
    let previousCartItems = JSON.parse(retrievedData); // get it as js object [{}]
    const exist = previousCartItems.find((x) => x.item_id === product.item_id); // return that object {} or undefined
    if (exist.quantity === 1) {
      let currentCartItems = previousCartItems.filter(
        (x) => x.item_id !== product.item_id
      );
      localStorage.setItem("cartItem", JSON.stringify([...currentCartItems]));
      setQuantity(0);
      getProductQuantity();
    } else {
      for (let i = 0; i < previousCartItems.length; i++) {
        if (previousCartItems[i].item_id === product.item_id) {
          previousCartItems[i].quantity = previousCartItems[i].quantity - 1;
          break;
        }
      }
      localStorage.setItem("cartItem", JSON.stringify([...previousCartItems]));
      getProductQuantity();
    }
  };

  useEffect(() => {
    getProductQuantity();
  }, []);

  return (
    <div>
      <Card elevation={1}>
        <div className={styles.mainContainer}>
          <div className={styles.imageContainer}>
            <img src={details.item_photo} className={styles.image} alt="" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.headingWithSmallText}>
              <p className={styles.heading}>{details.item_name}</p>
              <p className={styles.smallText}>{details.item_small_text}</p>
            </div>
            <div className={styles.bottomGroup}>
              <p className={styles.cost}>₹{details.item_cost}</p>

              {quantity <= 0 ? (
                <button
                  className={styles.addButton}
                  onClick={() => addToCart(details)}
                >
                  ADD
                </button>
              ) : (
                <Buttongroup />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Carditem;
