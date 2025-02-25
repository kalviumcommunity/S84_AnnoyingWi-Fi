const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const routes = require("./routes/routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
