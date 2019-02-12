const express = require("express");
const morgan = require("morgan");
const path = require("path");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

function setupMiddleware() {
  //logging
  app.use(morgan("dev"));

  //parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //compression
  app.use(compression());

  //pointing at API routes(express)
  app.use("/api", require("./server/api"));

  // serving static files
  app.use(express.static(path.join(__dirname, ".", "public")));

  // serve index.html by default (SPA)
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, ".", "public/index.html"));
  });

  //error handling
  app.use(function(err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
}

function startServer() {
  setupMiddleware();

  const server = app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}

startServer();

// app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, "./public")));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api", require("./server/api"));

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

// app.use(function(err, req, res, next) {
//   console.error(err);
//   console.error(err.stack);
//   res.status(err.status || 500).send(err.message || "Internal server error.");
// });

// const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
// app.listen(port, function() {
//   console.log("Knock, knock");
//   console.log("Who's there?");
//   console.log(`Your server, listening on port ${port}`);
// });

module.exports = app;
