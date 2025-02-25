const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db("annoying-wifi-names");
  })
  .catch((error) => {
    console.error("Failed to connect to Database:", error);
  });

// Create
router.post("/wifi-names", async (req, res) => {
  try {
    const result = await db.collection("wifi-names").insertOne(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read
router.get("/wifi-names", async (req, res) => {
  try {
    const wifiNames = await db.collection("wifi-names").find().toArray();
    res.status(200).send(wifiNames);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
router.put("/wifi-names/:id", async (req, res) => {
  try {
    const result = await db
      .collection("wifi-names")
      .updateOne(
        { _id: new MongoClient.ObjectID(req.params.id) },
        { $set: req.body }
      );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete
router.delete("/wifi-names/:id", async (req, res) => {
  try {
    const result = await db
      .collection("wifi-names")
      .deleteOne({ _id: new MongoClient.ObjectID(req.params.id) });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
