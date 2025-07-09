import { User } from "../Schema/User";

export const getLeaderboard = async (req, res) => {
    const filter = req.body?.filter
    // LATER IMPLEMENT CHECKING IF FILTER IS VALID

    if(filter){
        const leaderboard = await User.find({department: filter}).sort({points: -1})
        return res.json({leaderboard})
    }
    else{
        const leaderboard = await User.find({}).sort({points: -1})
        return res.json({leaderboard})
    }

}