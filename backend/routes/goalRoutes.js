const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controller/goalController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoals); //this is done because both these methods use the same route
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;
