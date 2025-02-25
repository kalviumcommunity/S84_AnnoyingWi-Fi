const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.error("Failed to connect to Database:", error));

const wifiNameSchema = new mongoose.Schema({
  name: String,
  // Add other fields as necessary
});

const WifiName = mongoose.model("WifiName", wifiNameSchema);

// Create
router.post("/wifi-names", async (req, res) => {
  try {
    const wifiName = new WifiName(req.body);
    const result = await wifiName.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read
router.get("/wifi-names", async (req, res) => {
  try {
    const wifiNames = await WifiName.find();
    res.status(200).send(wifiNames);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
router.put("/wifi-names/:id", async (req, res) => {
  try {
    const result = await WifiName.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete
router.delete("/wifi-names/:id", async (req, res) => {
  try {
    const result = await WifiName.findByIdAndDelete(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
