const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const routes = require("./routes/routes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
