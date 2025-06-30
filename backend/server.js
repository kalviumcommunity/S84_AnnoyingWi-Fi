const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require('cors');
const cookieParser = require('cookie-parser');

require("dotenv").config();
const routes = require("./routes/routes");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
