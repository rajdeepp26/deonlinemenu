import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Card, Container } from "@material-ui/core";
import Carditem from "./Carditem";

import styles from "./listitems.module.css";

const Listitems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const getItems = async () => {
    try {
      // proxy
      // "proxy": "http://localhost:5000"

      const response = await fetch("/menu", {
        method: "GET",
        headers: { "content-Type": "application/json" },
      });

      const jsonData = await response.json();

      // get the category name from menu items
      const tempCategories = [];
      jsonData.forEach((item) => {
        if (tempCategories.indexOf(item.item_category) === -1) {
          tempCategories.push(item.item_category);
        }
      });
      setCategories(tempCategories);
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container>
      {categories.map((category, index) => (
        <Grid
          container
          spacing={1}
          key={index}
          className={styles.categoryItemContainer}
        >
          <Grid
            item
            className={styles.categoryCard}
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <Card className={styles.categoryHeading}> {category} </Card>
          </Grid>
          {items.map(
            (item) =>
              item.item_category === category && (
                <Grid item key={item.item_id} xs={12} sm={10} md={6} lg={6}>
                  <Carditem details={item} />
                </Grid>
              )
          )}
        </Grid>
      ))}
    </Container>
  );
};

export default Listitems;
