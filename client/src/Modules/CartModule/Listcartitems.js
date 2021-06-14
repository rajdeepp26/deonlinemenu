import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import Eachcarditem from "../CartModule/Eachcarditem";

import styles from "./listcartitems.module.css";
import { ImArrowRight2 } from "react-icons/im";
import { Link } from "react-router-dom";
// BsArrowRight
const Listitems = () => {
  const [cartItems, setCartItems] = useState([]);
  const itemsPrice = cartItems.reduce(
    (a, c) => a + c.item_cost * c.quantity,
    0
  );
  const taxPrice = itemsPrice * 0.12;
  const totalPrice = itemsPrice + taxPrice;

  const getCartItems = () => {
    let retrievedCartData = [];
    retrievedCartData = localStorage.getItem("cartItem"); // receiving a string or null

    if (retrievedCartData !== null) {
      let cartItems = JSON.parse(retrievedCartData); // get it as js object []
      setCartItems(cartItems);
    }
  };

  // add items to cart/ local storage
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
        getCartItems();
      } else {
        localStorage.setItem(
          "cartItem",
          JSON.stringify([...previousCartItems, { ...product, quantity: 1 }])
        );
        getCartItems();
      }
    } else {
      localStorage.setItem(
        "cartItem",
        JSON.stringify([{ ...product, quantity: 1 }])
      );
      getCartItems();
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
      getCartItems();
    } else {
      for (let i = 0; i < previousCartItems.length; i++) {
        if (previousCartItems[i].item_id === product.item_id) {
          previousCartItems[i].quantity = previousCartItems[i].quantity - 1;
          break;
        }
      }
      localStorage.setItem("cartItem", JSON.stringify([...previousCartItems]));
      getCartItems();
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <Container spacing={1}>
      <div>
        {cartItems.length === 0 ? (
          <div className={styles.menu}>
            <p>Cart is Empty</p>
          </div>
        ) : (
          <div className={styles.menu}>
            <p> Items Added In Cart </p>
          </div>
        )}
      </div>

      <Grid
        container
        spacing={1}
        direction="column"
        justify="center"
        alignItems="center"
        className={styles.categoryItemContainer}
      >
        {cartItems.map((item) => (
          <Grid item key={item.item_id} className={styles.cardAlignment}>
            <Eachcarditem
              details={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </Grid>
        ))}

        {cartItems.length !== 0 && (
          <div className={styles.seperator}>
            <h6>
              <span> </span>
            </h6>
          </div>
        )}
        <Grid className={styles.cardAlignment}>
          {cartItems.length !== 0 && (
            <div className={styles.priceContainer}>
              <div className={styles.itemPriceContainer}>
                <div>Items Price</div>
                <div>₹{itemsPrice.toFixed(2)}</div>
              </div>
              <div className={styles.taxPriceContainer}>
                <div>GST</div>
                <div>+ ₹{taxPrice.toFixed(2)}</div>
              </div>
              <div className={styles.totalPriceContainer}>
                <div>Total Price</div>
                <div>₹{totalPrice.toFixed(2)}</div>
              </div>
            </div>
          )}
        </Grid>
        <Grid className={styles.cardAlignment}>
          {cartItems.length !== 0 && (
            <div className={styles.checkoutButtonContainer}>
              <Link
                to={{ pathname: "/checkout" }}
                style={{ textDecoration: "none" }}
                // className={styles.linkToCheckout}
              >
                <button className={styles.checkoutButton}>
                  <div>PROCEED TO CHECKOUT</div>
                  <div className={styles.arrowIcon}>
                    <ImArrowRight2 />
                  </div>
                </button>
              </Link>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Listitems;
