//Descp: Get goals
//Route: GET /api/goals
//Access: PRIVATE
const getGoals = (rq, rs) => {
  rs.status(200).json({ message: "get goals" });
};

//Descp: Set goals
//Route: POST /api/goals
//Access: PRIVATE
const setGoals = (rq, rs) => {
  if (!rq.body.text) {
    //if there is no text item in the body of the request
    rs.status(400);
    throw new Error("Please add a text field");
  }
};

//Descp: update goals
//Route: PUT /api/goals/:id
//Access: PRIVATE
const updateGoals = (rq, rs) => {
  rs.status(200).json({ message: `update goals ${rq.params.id}` });
};

//Descp: delete goals
//Route: DELETE /api/goals/:id
//Access: PRIVATE
const deleteGoals = (rq, rs) => {
  rs.status(200).json({ message: `delete goals ${rq.params.id}` });
};

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
