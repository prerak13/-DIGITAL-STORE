const express = require("express");
const bodyparser = require("body-parser");
const router = require("./src/routes/routes.js");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 8080;
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/", router);

app.listen(port, () => {
  console.log(`Application is listening on port ${port}`);
});
