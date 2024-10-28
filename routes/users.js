/**
 *
 * User routes for customers who review the shop
 *
 */

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
        // res.json(users[users.length - 1]);
        res.render("contact", { title: "My Page" });
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

    if (user) {
      res.send({ user, links });
    } else {
      next();
    }
  })
  .patch((req, res, next) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    console.log(`Received PATCH request for ID: ${id}, New Name: ${name}`);

    if (!isNaN(id) && name) {
      const user = users.find((u, i) => {
        if (u.id == req.params.id) {
          return true;
        }
      });

      if (user) {
        user.name = name;
        console.log("New changes in this user:", JSON.stringify(user));
        res.json(user);
      }
    } else {
      res.status(400).send("Valid ID and name are required.");
    }
  })
  .delete((req, res, next) => {
    const id = parseInt(req.params.id);
    try {
      const user = users.find((u, i) => {
        if (u.id == id) {
          users.splice(i, 1);
          return true;
        }
      });

      if (user) {
        console.log(`What it looks like now: ${JSON.stringify(users)}`);
        res.json(user);
      } else {
        return res.status(404).send("Item not found.");
      }
    } catch (e) {
      console.log("Error:", e);
      console("Request body:", req.body.id);
      next(error(400, "User id not found"));
    }
  });

module.exports = router;
