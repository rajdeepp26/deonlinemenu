import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

import { IoBagHandleOutline } from "react-icons/io5";
import { FiArrowLeft } from "react-icons/fi";

const Navbar = (props) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  let navbarClasses = ["navbarContainer"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  return (
    <div className={navbarClasses.join(" ")}>
      <div className="rest_name">
        {props.currentPage === "cart" ? (
          <div className="backArrowIcon">
            <Link to={{ pathname: "/menulist" }}>
              <FiArrowLeft />
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        {props.currentPage === "checkout" ? (
          <div className="backArrowIcon">
            <Link to={{ pathname: "/cart" }}>
              <FiArrowLeft />
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        <p> American Escape Cafe</p>
      </div>
      {props.currentPage === "menu" ? (
        <div className="cart">
          <Link to={{ pathname: "/cart" }}>
            {" "}
            <p>
              <IoBagHandleOutline className="cartIcon" />{" "}
            </p>{" "}
          </Link>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Navbar;
