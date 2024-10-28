const express = require("express");
const router = express.Router();

const employeesList = require("../data/employees");
const error = require("../utilities/error");

router.route("/").get((req, res) => {
  const links = [
    {
      href: "employees/:id",
      rel: ":id",
      type: "GET",
    },
  ];

  res.json({ employeesList, links });
});

router.route("/:id").get((req, res, next) => {
  const employee = employeesList.find((e) => e.id == req.params.id);

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

  if (employee) res.json({ employee, links });
  else next();
});

module.exports = router;
