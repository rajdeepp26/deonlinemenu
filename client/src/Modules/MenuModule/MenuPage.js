import React, { Fragment } from "react";
import styles from "./menupage.module.css";

// Components
import Navbar from "../../components/Navbar/Navbar";
import Listitems from "./Listitems";

const MenuPage = () => {
  return (
    <Fragment>
      <Navbar currentPage="menu" />
      <div className={styles.menu}>
        <p> Menu </p>
      </div>
      <Listitems />
      <div className={styles.footer}></div>
    </Fragment>
  );
};

export default MenuPage;
