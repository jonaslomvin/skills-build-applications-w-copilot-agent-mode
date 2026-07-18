import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { rebuildLeaderboard } from '../services/rebuildLeaderboard.js';
const activitiesRouter = Router();
activitiesRouter.get('/', async (_request, response) => {
    const activities = await Activity.find()
        .sort({ completedAt: -1, createdAt: -1 })
        .limit(25)
        .populate('userId', 'name email')
        .populate('teamId', 'name slug')
        .lean();
    response.json(activities);
});
activitiesRouter.post('/', async (request, response) => {
    const activity = await Activity.create(request.body);
    await rebuildLeaderboard();
    response.status(201).json(activity);
});
export default activitiesRouter;
