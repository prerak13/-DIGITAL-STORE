const express = require("express");
const controller = require("../controllers/controller.js");
const productController = require("../controllers/product.js");
const orderController = require("../controllers/order");
const notificationController = require("../controllers/notification");
const router = express.Router();

const multer = require("multer");

//I referred the following code of using multer from:
//https://aws.plainenglish.io/how-to-upload-photos-to-amazon-s3-bucket-using-node-js-b567188a662a
const storeImage = multer.memoryStorage({
  destination: (req, file, callbackFunction) => {
    callbackFunction(null, "");
  },
});

const uploadImage = multer({ storage: storeImage });

router.get("/test", controller.testGet);
router.get("/product/view", productController.viewProducts);
router.post("/product/add", productController.addProduct);
router.post("/order/add", orderController.addOrder);
router.get("/admin/viewOrder", orderController.getAdminOrders);
router.get("/user/viewOrder", orderController.getUserOrders);
router.post(
  "/order/update",
  orderController.updateOrder,
  orderController.getAdminOrders
);

router.post(
  "/product/upload",
  uploadImage.single("image"),
  productController.uploadProductImage
);

router.post("/subscribeNotification", notificationController.subscribe);
router.post("/sendEmail", notificationController.sendEmail);

module.exports = router;
