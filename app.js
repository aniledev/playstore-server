// import express
const express = require("express");
// import morgan
const morgan = require("morgan");
// import the data file
const playstore = require("./apps-data");
// import the cors package; delete if not necessary
const cors = require("cors");
// import app that is a built in object of express so that we can use it
const app = express();

// use morgan and cors as middleware for the app object from express
app.use(morgan("dev"));
app.use(cors());

//create GET request using express app object, path and handler
app.get("/apps", (req, res) => {
  // object destructing to access the req.query parameters and set defaults
  const { sort, genres = "" } = req.query;
});

// listen for the app on the port 8000
