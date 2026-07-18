import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { rebuildLeaderboard } from '../services/rebuildLeaderboard.js';
const leaderboardRouter = Router();
leaderboardRouter.get('/', async (_request, response) => {
    const entries = await LeaderboardEntry.find()
        .sort({ rank: 1 })
        .populate('userId', 'name email')
        .populate('teamId', 'name slug')
        .lean();
    response.json(entries);
});
leaderboardRouter.post('/rebuild', async (_request, response) => {
    const entries = await rebuildLeaderboard();
    response.json(entries);
});
export default leaderboardRouter;
