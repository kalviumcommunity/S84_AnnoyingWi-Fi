const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require('cors');

require("dotenv").config();
const routes = require("./routes/routes");

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
