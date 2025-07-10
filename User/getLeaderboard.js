import { User } from "../Schema/User.js";

export const getLeaderboard = async (req, res) => {
  const filter = req.body?.filter;
  // LATER IMPLEMENT CHECKING IF FILTER IS VALID
  const leaderboard = await loadLB(filter);
  return res.json({
    leaderboard: leaderboard.map((users) => ({
      name: users.name,
      points: users.points,
      regNumber: users.regNumber,
      department: users.department,
    })),
  });
};

const loadLB = async (filter) => {
  if (filter) {
    const lb = await User.find({ department: filter }).sort({ points: -1 });
    return lb;
  } else {
    const lb = await User.find().sort({ points: -1 });
    return lb;
  }
};
