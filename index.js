const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// modification for deloyment
const PORT = process.env.PORT || 5000;
const path = require("path");

// process.env.PORT
// process variables provided by heroku:
// process.env.NODE_ENV => Production or undefined

// middleware
app.use(cors());
app.use(express.json()); // to read data from client object

if (process.env.NODE_ENV === "production") {
  // serve static content
  // npm run build
  // our goal is to target index.html
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Routes: //

// get all menu items
app.get("/menu", async (req, res) => {
  try {
    const restId = "1e7918df-96e8-4ff5-acb1-e349ef95eca5";
    const allMenuItems = await pool.query(
      "SELECT * FROM menu where rest_id= $1",
      [restId]
    );

    res.json(allMenuItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Store the order details
app.post("/order", async (req, res) => {
  try {
    const restId = "1e7918df-96e8-4ff5-acb1-e349ef95eca5";
    const {
      fullName,
      phoneNumber,
      tableNumber,
      specialInstruction,
      cartItems,
      totalPrice,
    } = req.body;
    const newOrder = await pool.query(
      "INSERT INTO orderdetails (rest_id, customer_name, customer_phonenumber, order_table_number, order_special_instruction, Total_items_ordered, total_cost) VALUES($1, $2, $3, $4, $5, $6, $7)",
      [
        restId,
        fullName,
        phoneNumber,
        tableNumber,
        specialInstruction,
        cartItems,
        totalPrice,
      ]
    );
    res.json("Order received");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

// catch all
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});
