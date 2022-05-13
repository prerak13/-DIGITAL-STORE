const AWS = require("aws-sdk");
const mysql = require("mysql");
const config = require("../config/config");
const secret = require("../config/secret");
let db;
secret.then((secretValues) => {
  console.log(secretValues);
  db = mysql.createConnection(secretValues);
});

const viewProducts = (req, res) => {
  console.log("Inside view products");
  db.query(`SELECT * FROM product;`, (err, result) => {
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
        message: "No products exist",
      });
    }
  });
};

const uploadProductImage = async (req, res) => {
  console.log("Inside Upload Product Image");
  console.log(req.file);
  console.log(req.body);
  const productId = req.body.productID;

  //I have referred the below code of configuring the AWS S3 from:
  //https://www.zeolearn.com/magazine/uploading-files-to-aws-s3-using-nodejs
  //I have modified the code by adding two more parameters into the configuration.
  const configS3 = new AWS.S3({
    secretAccessKey: config.secretAccessKey,
    accessKeyId: config.accessKeyId,
    region: config.region,
    sessionToken: config.sessionToken,
  });

  const arguments = {
    Bucket: config.Bucket,
    Key: "Product " + productId + "_" + req.file.originalname,
    Body: req.file.buffer,
    //   ACL: "public-read",
    ContentType: req.file.mimetype,
  };

  //I referred the below method of uploading a file into the S3 bucket from:
  //https://medium.com/@vishnuit18/uploading-files-to-aws-s3-bucket-using-nodejs-8c399eea2d19
  //and
  //https://aws.plainenglish.io/how-to-upload-photos-to-amazon-s3-bucket-using-node-js-b567188a662a
  //I have modified the code by adding the res object at the last which sends back a json response containing the location of the uploaded file.
  configS3.upload(arguments, (error, response) => {
    if (error) {
      console.log(error);
      res.status(500).send({ err: error });
    } else {
      console.log("File available at:");
      const fileURL = response.Location;
      console.log(fileURL);

      db.query(
        "UPDATE product set image_url = ? WHERE id = ?;",
        [fileURL, productId],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Internal Server Error",
            });
          } else if (result.changedRows == 1) {
            console.log("Product Image URL updated successfully");
            return res.status(200).json({
              success: true,
              message: "Product Image URL updated successfully",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "Error in Updating the Image URL",
            });
          }
        }
      );
    }
  });
};

const addProduct = (req, res, next) => {
  console.log("Inside addProduct");
  console.log(req.body);

  let data = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    image_url: "",
  };

  db.query("INSERT INTO product SET ?;", data, async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    } else if (result.affectedRows == 1) {
      console.log("Product ID:", result.insertId);
      //   return next();
      return res.status(200).json({
        success: true,
        message: "Product added successfully",
        product_id: result.insertId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Error in Adding product",
      });
    }
  });
};

const controller = {
  addProduct,
  uploadProductImage,
  viewProducts,
};

module.exports = controller;
