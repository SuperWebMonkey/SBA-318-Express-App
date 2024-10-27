/**
 *
 * Main program for the express project
 *
 */

const express = require("express");
const bodyParser = require("body-parser");
const mustache = require("mustache");
const path = require("path");

const users = require("./routes/users");
const posts = require("./routes/posts");

const error = require("./utilities/error");

const app = express();
const port = 3000;

// Setting up template engine iwth EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Use our Routes
app.use("/api/users", users);
app.use("/api/posts", posts);

// Error handling
app.get("/error", (req, res, next) => {
  const error = new Error("There is an error!");
  next(error); // Pass the error to the next middleware
});

// Adding some HATEOAS links.
app.get("/", (req, res) => {
  // res.json({
  //   links: [
  //     {
  //       href: "/api",
  //       rel: "api",
  //       type: "GET",
  //     },
  //   ],
  // });
  res.render("home");
});

// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
