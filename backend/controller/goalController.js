const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

//Descp: Get goals
//Route: GET /api/goals
//Access: PRIVATE
const getGoals = asyncHandler(async (rq, rs) => {
  const goals = await Goal.find();
  rs.status(200).json(goals);
});

//Descp: Set goals
//Route: POST /api/goals
//Access: PRIVATE
const setGoals = asyncHandler(async (rq, rs) => {
  if (!rq.body.text) {
    //if there is no text item in the body of the request
    rs.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: rq.body.text,
  });
  rs.status(200).json(goal);
});

//Descp: update goals
//Route: PUT /api/goals/:id
//Access: PRIVATE
const updateGoals = asyncHandler(async (rq, rs) => {
  const goal = await Goal.findById(rq.params.id);

  if (!goal) {
    rs.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(rq.params.id, rq.body, {
    new: true,
  });

  rs.status(200).json(updatedGoal);
});

//Descp: delete goals
//Route: DELETE /api/goals/:id
//Access: PRIVATE
const deleteGoals = asyncHandler(async (rq, rs) => {
  const goal = await Goal.findById(rq.params.id);

  if (!goal) {
    rs.status(400);
    throw new Error("Goal not found");
  }

  await goal.remove();

  //const deleteGoal = await Goal.findByIdAndDelete(rq.params.id)

  rs.status(200).json({ id: rq.params.id });
});

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
