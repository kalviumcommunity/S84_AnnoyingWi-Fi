const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;
let dbStatus = "Disconnected";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    dbStatus = "Connected";
    const db = client.db("annoying-wifi-names");
  })
  .catch((error) => {
    console.error("Failed to connect to Database:", error);
    dbStatus = "Failed to connect";
  });

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/", (req, res) => {
  res.send(`Database connection status: ${dbStatus}`);
});

app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
