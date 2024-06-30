const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
require("dotenv").config();
const app = express();
const dbURI = process.env.URI;
const port = process.env.PORT || 4001;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoute);

// Start the server
app.listen(port, async () => {
  await mongoose.connect(dbURI);
  console.log(`Server is listening on the port ${port}`);
});
