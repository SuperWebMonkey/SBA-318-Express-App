const express = require("express");
const router = express.Router();

const users = require("../data/users");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "users/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ users, links });
  })
  .post((req, res, next) => {
    try {
      if (req.body.name && req.body.review && req.body.reviewContent) {
        if (users.find((u) => u.name == req.body.name)) {
          next(error(409, "User already submitted a review."));
        }

        const user = {
          id: users[users.length - 1].id + 1,
          name: req.body.name,
          review: req.body.review,
          reviewContent: req.body.reviewContent,
        };

        users.push(user);
        console.log(
          `${JSON.stringify(user)} has been added to ${JSON.stringify(users)}`
        );
        res.json(users[users.length - 1]);
      }
    } catch (e) {
      console.log("Error:", e);
      console("Request body:", req.body);
      next(error(400, "Insufficient Data"));
    }
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (user) res.json({ user, links });
    else next();
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        return true;
      }
    });

    if (user) res.json(user);
    else next();

    const { name, review, reviewContent } = req.body;
    user.id = users.length + 1;

    if (name) user.name = name;
    if (typeof review === "number") user.review = review;
    if (reviewContent) user.reviewContent = reviewContent;
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

module.exports = router;
