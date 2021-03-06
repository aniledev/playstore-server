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
  // object destructing to access the req.query parameters and set defaults; the parameters are optional
  const { sort, genres = "" } = req.query;

  // if there is a sort value then it must be validated
  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      // if sort is not rating or app then return a status of 400
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  // if there is a genre, it must also be validated
  if (genres) {
    if (
      !["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(
        genres
      )
    ) {
      // if genres is not one of the 6, then return a status of 400
      return res
        .status(400)
        .send(
          "Genre must either be Action, Puzzle, Strategy, Casual, Arcade or Card"
        );
    }
  }

  // use the filter method to return an array of app titles that include the genre; lowercase the app list and the genre for convenience
  let results = playstore.filter((app) =>
    app.Genres.toLowerCase().includes(genres.toLowerCase())
  );

  // use a bubble sort after the books are filtered
  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

// listen for the app on the port 8000

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
