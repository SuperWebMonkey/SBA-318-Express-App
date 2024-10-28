/**
 *
 * Main program for the express project
 *
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");

const userRoute = require("./routes/users"); // route to users
const postRoute = require("./routes/posts"); // route to posts
const employeeRoute = require("./routes/employees"); // route to employees

const userList = require("./data/users");
console.log(userList);

const error = require("./utilities/error");

const app = express();
const port = 3000;

// Setting up template engine iwth EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// Parsing Middleware
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging Middlewaare
// app.use((req, res, next) => {
//   const time = new Date();

//   console.log(
//     `-----
// ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
//   );
//   if (Object.keys(req.body).length > 0) {
//     console.log("Containing the data:");
//     console.log(`${JSON.stringify(req.body)}`);
//   }
//   next();
// });

// Use our Routes
app.use("/users", userRoute);
app.use("/food", postRoute);
app.use("/employees", employeeRoute);

// Error handling
app.get("/error", (req, res, next) => {
  const error = new Error("There is an error!");
  next(error); // Pass the error to the next middleware
});

// Main routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/about", (req, res) => {
  res.render("about", { userList });
});

app.get("/admin", (req, res) => {
  res.render("admin", { userList });
});

// does not work
app.get("/search", (req, res) => {
  const { review } = req.query;
  console.log("review query:", review, "\n");

  // Filter products based on query parameters
  let filterList = userList;
  console.log("list:", filterList, "\n");

  if (review) {
    const reviewNum = parseInt(review);
    filterList = filterList.filter((user) => user.review >= reviewNum);
  }

  console.log("filtered list:", filterList, "\n");

  res.render("about", { userList: filterList });
});

// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
