const AWS = require("aws-sdk");
const config = require("../config/config");

var client = new AWS.SNS({
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  sessionToken: config.sessionToken,
});

const subscribe = (req, res) => {
  console.log("Inside subscribe method");
  let parameters = {
    Protocol: "EMAIL",
    TopicArn: config.TopicArn,
    Endpoint: req.body.user_email,
  };

  client.subscribe(parameters, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

const sendEmail = (req, res) => {
  let date = new Date().toString();
  let email_subject = "Order Status Changed : Order " + req.body.order_status;
  let email_body =
    "Hello " +
    req.body.user_name +
    ", \n Your order has been " +
    req.body.order_status +
    " by the admin on " +
    date;
  let parameters = {
    Message: email_body,
    Subject: email_subject,
    TopicArn: config.TopicArn,
  };

  client.publish(parameters, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

const controller = {
  subscribe,
  sendEmail,
};

module.exports = controller;
