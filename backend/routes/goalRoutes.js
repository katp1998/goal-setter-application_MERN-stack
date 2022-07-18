const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controller/goalController");

router.route("/").get(getGoals).post(setGoals); //this is done because both these methods use the same route
router.route("/:id").put(updateGoals).delete(deleteGoals);

module.exports = router;
