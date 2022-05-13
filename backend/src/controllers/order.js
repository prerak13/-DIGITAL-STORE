const mysql = require("mysql");

const secret = require("../config/secret");
let db;
secret.then((secretValues) => {
  // console.log(secretValues);
  db = mysql.createConnection(secretValues);
});

// This method adds the product into the orders list of a particular user.
const addOrder = (req, res, next) => {
  console.log("Inside addOrder method");
  console.log(req.body);
  // let userId = 1;

  try {
    if (req.body.product_id && req.body.user_email) {
      //   loggedInUser.getUser(req.headers.authorization, function (err, id) {
      //     userId = id;
      //   });
      let user_email = req.body.user_email;
      console.log(`The User Email ID is ${user_email}`);
      let date = new Date();

      let data = {
        user_email: user_email,
        product_id: req.body.product_id,
        date: date,
      };
      console.log(data.date);

      db.query("INSERT INTO order_items SET ?;", data, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        } else if (result.affectedRows == 1) {
          console.log("Order ID:", result.insertId);
          console.log("Order Added Successfully");
          return res.status(200).json({
            success: true,
            message: "Product ordered successfully",
            product_id: req.body.product_id,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Error in Adding order",
          });
        }
      });
    } else {
      return res.status(400).json({ success: false, message: "Bad Request" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// This method updates the order status of a particular order when admin approves/declines the order.
const updateOrder = (req, res, next) => {
  console.log("Inside updateOrder method");

  try {
    if (req.body.order_id && req.body.status) {
      const order_id = req.body.order_id;
      const status = req.body.status;

      db.query(
        "UPDATE order_items set status = ? WHERE id = ?;",
        [status, order_id],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Internal Server Error",
            });
          } else if (result.changedRows == 1) {
            console.log("Order Status Updated Successfully");
            //The next() will call the viewOrders method
            return next();
          } else {
            return res.status(400).json({
              success: false,
              message: "Error in Updating the Order Status",
            });
          }
        }
      );
    } else {
      return res.status(400).json({ success: false, message: "Bad Request" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//This method gets all the orders of a particular user.
const getUserOrders = (req, res) => {
  console.log("Inside getUserOrders method");
  // console.log(req);
  // let userId = 1;

  try {
    //   loggedInUser.getUser(req.headers.authorization, function (err, id) {
    //     userId = id;
    //   });
    let user_email = req.query.user_email;
    console.log(`The User Email ID is ${user_email}`);

    db.query(
      `SELECT DISTINCT o.id,  o.date, p.name, p.category, p.price, o.status FROM order_items o, product p WHERE o.product_id = p.id AND o.user_email = ?;`,
      [user_email],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        } else if (result.length > 0) {
          return res.status(200).json({ success: true, response: result });
        } else {
          return res.status(400).json({
            success: false,
            message: "No orders present for this user",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//This method gets all the orders of all the users for admin to either approve or decline the order.
const getAdminOrders = (req, res) => {
  console.log("Inside getAdminOrders method");

  db.query(
    `SELECT DISTINCT o.id, o.date, o.user_email, p.name, p.category, p.price FROM order_items o, product p WHERE o.product_id = p.id AND o.status = "pending";`,

    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      } else if (result.length > 0) {
        return res.status(200).json({ success: true, response: result });
      } else {
        return res.status(400).json({
          success: false,
          message: "No orders present",
        });
      }
    }
  );
};

const controller = {
  addOrder,
  updateOrder,
  getUserOrders,
  getAdminOrders,
};

module.exports = controller;
