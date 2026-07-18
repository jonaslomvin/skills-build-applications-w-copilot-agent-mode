import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
export async function rebuildLeaderboard() {
    const rows = (await Activity.aggregate([
        {
            $group: {
                _id: {
                    userId: '$userId',
                    teamId: '$teamId',
                },
                points: {
                    $sum: '$caloriesBurned',
                },
                activityCount: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                points: -1,
                '_id.userId': 1,
            },
        },
    ]));
    await LeaderboardEntry.deleteMany({});
    if (rows.length === 0) {
        await Team.updateMany({}, { totalPoints: 0 });
        return [];
    }
    const entries = rows.map((row, index) => ({
        scope: row._id.teamId ? 'team' : 'global',
        userId: row._id.userId,
        teamId: row._id.teamId,
        points: row.points,
        activityCount: row.activityCount,
        rank: index + 1,
    }));
    await LeaderboardEntry.insertMany(entries);
    const teamTotals = rows.reduce((totals, row) => {
        if (!row._id.teamId) {
            return totals;
        }
        totals.set(row._id.teamId, (totals.get(row._id.teamId) || 0) + row.points);
        return totals;
    }, new Map());
    await Team.updateMany({}, { totalPoints: 0 });
    await Promise.all([...teamTotals.entries()].map(([teamId, totalPoints]) => Team.findByIdAndUpdate(teamId, { totalPoints })));
    return LeaderboardEntry.find().sort({ rank: 1 }).lean();
}
